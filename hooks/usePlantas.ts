// hooks/usePlantas.ts
import { useState, useEffect } from 'react';
import { 
  ref, 
  push, 
  update, 
  remove, 
  onValue, 
  off,
  query,
  orderByChild,
  equalTo
} from 'firebase/database';
import { database } from '@/firebase/firebase';
import { useAuth } from '@/context/AuthContext';

export interface Planta {
  id: string;
  nome: string;
  especie?: string;
  descricao?: string;
  imagemUrl?: string;
  dataPlantio: string; // Realtime Database trabalha melhor com strings
  ultimaRega: string;
  proximaRega: string;
  intervaloRega: number; // em dias
  usuarioId: string;
  createdAt: string;
  updatedAt: string;
}

export const usePlantas = () => {
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Buscar plantas em tempo real
  useEffect(() => {
    if (!user) {
      setPlantas([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Referência para as plantas do usuário atual
    const plantasRef = ref(database, 'plantas');
    
    // Filtrar por usuarioId - No Realtime Database precisamos fazer o filtro no cliente
    const unsubscribe = onValue(
      plantasRef,
      (snapshot) => {
        const plantasData: Planta[] = [];
        const data = snapshot.val();
        
        if (data) {
          Object.keys(data).forEach((key) => {
            const planta = data[key];
            // Filtrar apenas as plantas do usuário atual
            if (planta.usuarioId === user.uid) {
              plantasData.push({
                id: key,
                nome: planta.nome,
                especie: planta.especie,
                descricao: planta.descricao,
                imagemUrl: planta.imagemUrl,
                dataPlantio: planta.dataPlantio,
                ultimaRega: planta.ultimaRega,
                proximaRega: planta.proximaRega,
                intervaloRega: planta.intervaloRega || 7,
                usuarioId: planta.usuarioId,
                createdAt: planta.createdAt,
                updatedAt: planta.updatedAt,
              });
            }
          });
          
          // Ordenar por data de criação (mais recentes primeiro)
          plantasData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        setPlantas(plantasData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Erro ao buscar plantas:', err);
        setError('Erro ao carregar plantas');
        setLoading(false);
      }
    );

    return () => {
      off(plantasRef, 'value', unsubscribe);
    };
  }, [user]);

  // Adicionar nova planta
  const adicionarPlanta = async (plantaData: Omit<Planta, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (!user) throw new Error('Usuário não autenticado');

      const novaPlanta = {
        ...plantaData,
        usuarioId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const plantasRef = ref(database, 'plantas');
      const novaPlantaRef = push(plantasRef);
      await update(novaPlantaRef, novaPlanta);
      
      return { success: true, id: novaPlantaRef.key };
    } catch (err: any) {
      console.error('Erro ao adicionar planta:', err);
      return { success: false, error: err.message };
    }
  };

  // Atualizar planta
  const atualizarPlanta = async (id: string, plantaData: Partial<Planta>) => {
    try {
      const plantaRef = ref(database, `plantas/${id}`);
      await update(plantaRef, {
        ...plantaData,
        updatedAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (err: any) {
      console.error('Erro ao atualizar planta:', err);
      return { success: false, error: err.message };
    }
  };

  // Excluir planta
  const excluirPlanta = async (id: string) => {
    try {
      const plantaRef = ref(database, `plantas/${id}`);
      await remove(plantaRef);
      return { success: true };
    } catch (err: any) {
      console.error('Erro ao excluir planta:', err);
      return { success: false, error: err.message };
    }
  };

  // Marcar como regada
  const marcarComoRegada = async (id: string) => {
    try {
      const plantaRef = ref(database, `plantas/${id}`);
      const agora = new Date().toISOString();
      const proximaRega = new Date();
      proximaRega.setDate(proximaRega.getDate() + 7); // Próxima rega em 7 dias

      await update(plantaRef, {
        ultimaRega: agora,
        proximaRega: proximaRega.toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (err: any) {
      console.error('Erro ao marcar como regada:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    plantas,
    loading,
    error,
    adicionarPlanta,
    atualizarPlanta,
    excluirPlanta,
    marcarComoRegada,
  };
};
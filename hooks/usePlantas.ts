// hooks/usePlantas.ts
import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '@/firebase/firebase';
import { useAuth } from '@/context/AuthContext';

export interface Planta {
  id: string;
  nome: string;
  especie?: string;
  descricao?: string;
  imagemUrl?: string;
  dataPlantio: string;
  ultimaRega: string;
  proximaRega: string;
  intervaloRega: number;
  usuarioId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlantaCatalogo {
  id: string;
  nome: string;
  especie: string;
  descricao: string;
  requisitos: {
    umidadeSolo: string;
    umidadeAr: string;
    temperaturaIdeal: string;
    nivelLuz: string;
  };
  cicloVida: {
    tempoGerminacao: string;
    tempoColheita: string;
    estacaoIdeal: string;
  };
  caracteristicas: {
    tipo: string;
    alturaMaxima: string;
    espacamento: string;
  };
  cuidados: {
    rega: string;
    adubacao: string;
    poda: string;
  };
  tipo: string;
  dataCriacao: string;
}

export const usePlantas = () => {
  const [plantasCatalogo, setPlantasCatalogo] = useState<PlantaCatalogo[]>([]);
  const [plantasUsuario, setPlantasUsuario] = useState<Planta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar catálogo de plantas
  useEffect(() => {
    const catalogoRef = ref(database, 'catalogo_plantas');
    
    const unsubscribeCatalogo = onValue(
      catalogoRef,
      (snapshot) => {
        const data = snapshot.val();
        const plantas: PlantaCatalogo[] = [];
        
        if (data) {
          Object.keys(data).forEach((key) => {
            plantas.push({
              id: key,
              ...data[key]
            });
          });
        }
        
        setPlantasCatalogo(plantas);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Erro ao buscar catálogo:', err);
        setError('Erro ao carregar catálogo de plantas');
        setLoading(false);
      }
    );

    return () => {
      off(catalogoRef, 'value', unsubscribeCatalogo);
    };
  }, []);

  // Buscar plantas do usuário (se tiver autenticação)
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      setPlantasUsuario([]);
      return;
    }

    const plantasUsuarioRef = ref(database, 'plantas_usuario');
    
    const unsubscribeUsuario = onValue(
      plantasUsuarioRef,
      (snapshot) => {
        const data = snapshot.val();
        const plantas: Planta[] = [];
        
        if (data) {
          Object.keys(data).forEach((key) => {
            const planta = data[key];
            // Filtrar apenas plantas do usuário atual
            if (planta.usuarioId === user.uid) {
              plantas.push({
                id: key,
                ...planta
              });
            }
          });
        }
        
        setPlantasUsuario(plantas);
      },
      (err) => {
        console.error('Erro ao buscar plantas do usuário:', err);
      }
    );

    return () => {
      off(plantasUsuarioRef, 'value', unsubscribeUsuario);
    };
  }, [user]);

  return {
    plantasCatalogo,
    plantasUsuario,
    loading,
    error
  };
};
// hooks/useFirebaseDatabase.ts
import { useState } from 'react';
import { database } from '@/firebase/firebase';
import { ref, set, push } from 'firebase/database';

interface Usuario {
  nome: string;
  email: string;
  configuracoes: {
    notificacoes: boolean;
    idioma: string;
  };
}

interface PlantaCatalogo {
  nome: string;
  especie: string;
  descricao: string;
  requisitos: {
    umidadeSolo: string;
    umidadeAr: string;
    temperaturaIdeal: string;
    nivelLuz: string;
  };
}

interface Estufa {
  nome: string;
  descricao: string;
  configuracao: {
    temperaturaIdeal: number;
    umidadeIdeal: number;
    luminosidadeIdeal: string;
  };
  sensores: {
    temperatura: number;
    umidade: number;
    luminosidade: number;
  };
  status: string;
}

interface Resultado {
  success: boolean;
  detalhes?: {
    usuarios: string;
    plantas: string;
    estufas: string;
    plantasUsuario: string;
  };
  error?: string;
}

export const useFirebaseDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dados dos Usuários
  const usuariosData: Usuario[] = [
    {
      nome: "João Silva",
      email: "joao.silva@email.com",
      configuracoes: {
        notificacoes: true,
        idioma: "pt-BR"
      }
    },
    {
      nome: "Maria Santos", 
      email: "maria.santos@email.com",
      configuracoes: {
        notificacoes: true,
        idioma: "pt-BR"
      }
    },
    {
      nome: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      configuracoes: {
        notificacoes: false,
        idioma: "pt-BR"
      }
    }
  ];

  // Dados do Catálogo de Plantas
  const plantasData: PlantaCatalogo[] = [
    {
      nome: "Alface",
      especie: "Lactuca sativa",
      descricao: "Planta de folhas verdes, ideal para saladas",
      requisitos: {
        umidadeSolo: "úmido, sem encharcar",
        umidadeAr: "moderada (50–70%)",
        temperaturaIdeal: "15–22°C",
        nivelLuz: "alta (luz indireta)"
      }
    },
    {
      nome: "Rúcula",
      especie: "Eruca sativa",
      descricao: "Folhas picantes para saladas",
      requisitos: {
        umidadeSolo: "úmido", 
        umidadeAr: "moderada",
        temperaturaIdeal: "16–24°C",
        nivelLuz: "alta"
      }
    },
    {
      nome: "Tomate-cereja",
      especie: "Solanum lycopersicum", 
      descricao: "Pequeno, doce e produtivo",
      requisitos: {
        umidadeSolo: "úmido constante",
        umidadeAr: "moderada a alta",
        temperaturaIdeal: "18–28°C",
        nivelLuz: "muito alta"
      }
    }
  ];

  // Dados das Estufas
  const estufasData: Estufa[] = [
    {
      nome: "Estufa Principal",
      descricao: "Minha primeira estufa indoor",
      configuracao: {
        temperaturaIdeal: 22,
        umidadeIdeal: 60,
        luminosidadeIdeal: "alta"
      },
      sensores: {
        temperatura: 23.5,
        umidade: 65,
        luminosidade: 750
      },
      status: "ativa"
    },
    {
      nome: "Estufa de Temperos", 
      descricao: "Estufa para ervas aromáticas",
      configuracao: {
        temperaturaIdeal: 24,
        umidadeIdeal: 55, 
        luminosidadeIdeal: "alta"
      },
      sensores: {
        temperatura: 25.2,
        umidade: 58,
        luminosidade: 820
      },
      status: "ativa"
    }
  ];

  const popularBanco = async (): Promise<Resultado> => {
    setLoading(true);
    setError(null);

    try {
      console.log('🏗️ Iniciando população do banco...');

      // 1. Popular Usuários
      console.log('👥 Adicionando usuários...');
      const usuariosIds: string[] = [];
      for (const usuario of usuariosData) {
        const usuarioRef = push(ref(database, 'usuarios'));
        await set(usuarioRef, {
          ...usuario,
          id: usuarioRef.key,
          dataCriacao: new Date().toISOString()
        });
        usuariosIds.push(usuarioRef.key!);
      }

      // 2. Popular Catálogo de Plantas
      console.log('🌱 Adicionando plantas ao catálogo...');
      const plantasIds: string[] = [];
      for (const planta of plantasData) {
        const plantaRef = push(ref(database, 'catalogo_plantas'));
        await set(plantaRef, {
          ...planta,
          id: plantaRef.key,
          tipo: "catalogo",
          dataCriacao: new Date().toISOString()
        });
        plantasIds.push(plantaRef.key!);
      }

      // 3. Popular Estufas
      console.log('🏠 Adicionando estufas...');
      const estufasIds: string[] = [];
      for (let i = 0; i < estufasData.length; i++) {
        const estufa = estufasData[i];
        const estufaRef = push(ref(database, 'estufas'));
        await set(estufaRef, {
          ...estufa,
          id: estufaRef.key,
          usuarioId: usuariosIds[i % usuariosIds.length],
          dataCriacao: new Date().toISOString()
        });
        estufasIds.push(estufaRef.key!);
      }

      // 4. Criar algumas plantas do usuário
      console.log('🪴 Criando plantas do usuário...');
      if (usuariosIds.length > 0 && estufasIds.length > 0 && plantasIds.length > 0) {
        const plantaUsuarioRef = push(ref(database, 'plantas_usuario'));
        await set(plantaUsuarioRef, {
          usuarioId: usuariosIds[0],
          estufaId: estufasIds[0],
          catalogoId: plantasIds[0],
          nomePersonalizado: "Minha Alface",
          dataPlantio: new Date().toISOString(),
          rega: {
            ultimaRega: new Date().toISOString(),
            proximaRega: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            intervaloDias: 2
          },
          saude: {
            status: "saudavel",
            faseCrescimento: "vegetativo"
          },
          dataCriacao: new Date().toISOString()
        });
      }

      console.log('✅ Banco populado com sucesso!');
      return {
        success: true,
        detalhes: {
          usuarios: `${usuariosIds.length} usuários adicionados`,
          plantas: `${plantasIds.length} plantas no catálogo`,
          estufas: `${estufasIds.length} estufas adicionadas`,
          plantasUsuario: "1 planta do usuário criada"
        }
      };

    } catch (error: any) {
      console.error('❌ Erro ao popular banco:', error);
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setLoading(false);
    }
  };

  const limparBanco = async (): Promise<Resultado> => {
    setLoading(true);
    setError(null);

    try {
      console.log('🧹 Limpando banco...');
      
      // Limpar todas as tabelas
      const paths = ['usuarios', 'catalogo_plantas', 'estufas', 'plantas_usuario'];
      
      for (const path of paths) {
        await set(ref(database, path), null);
        console.log(`✅ ${path} limpo`);
      }

      console.log('✅ Banco limpo com sucesso!');
      return { success: true };

    } catch (error: any) {
      console.error('❌ Erro ao limpar banco:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    popularBanco,
    limparBanco,
    loading,
    error
  };
};
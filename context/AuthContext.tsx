import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Usuario = {
  id: string;
  email: string;
  nome: string;
  senha: string; // 🔹 agora o tipo aceita senha
};

type AuthContextType = {
  usuario: Usuario | null;
  login: (user: Usuario) => Promise<void>;
  logout: () => Promise<void>;
  atualizarUsuario: (dados: Partial<Usuario>) => Promise<void>; // 🔹 para edição de perfil
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // carregar usuário salvo ao iniciar
  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const userData = await AsyncStorage.getItem('@usuario');
        if (userData) {
          setUsuario(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Erro ao carregar usuário', error);
      } finally {
        setLoading(false);
      }
    };
    carregarUsuario();
  }, []);

  // login
  const login = async (user: Usuario) => {
    try {
      setUsuario(user);
      await AsyncStorage.setItem('@usuario', JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
    }
  };

  // logout
  const logout = async () => {
    try {
      setUsuario(null);
      await AsyncStorage.removeItem('@usuario');
    } catch (error) {
      console.error('Erro ao remover usuário', error);
    }
  };

  // atualizar perfil
  const atualizarUsuario = async (dados: Partial<Usuario>) => {
    if (!usuario) return;
    const atualizado = { ...usuario, ...dados };
    setUsuario(atualizado);
    await AsyncStorage.setItem('@usuario', JSON.stringify(atualizado));
  };

  if (loading) {
    return null; // pode trocar por uma tela de splash/loading
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider');
  return context;
};
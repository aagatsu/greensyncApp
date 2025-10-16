// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { COLORS, DARK_COLORS } from '@/constants/Cores';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof COLORS;
  themePreference: 'light' | 'dark' | 'system';
  setThemePreference: (preference: 'light' | 'dark' | 'system') => void;
  isThemeLoaded: boolean; // NOVO: para controlar o carregamento
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [themePreference, setThemePreference] = useState<'light' | 'dark' | 'system'>('system');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false); // NOVO ESTADO
  const systemColorScheme = useColorScheme();

  // Chave para AsyncStorage
  const THEME_STORAGE_KEY = '@greensync_theme_preference';

  // Carregar preferência salva
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Atualizar isDark baseado na preferência e no sistema
  useEffect(() => {
    let newIsDark = false;
    
    switch (themePreference) {
      case 'light':
        newIsDark = false;
        break;
      case 'dark':
        newIsDark = true;
        break;
      case 'system':
        newIsDark = systemColorScheme === 'dark';
        break;
      default:
        newIsDark = false;
    }
    
    setIsDark(newIsDark);
  }, [themePreference, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setThemePreference(savedTheme as 'light' | 'dark' | 'system');
      }
      setIsThemeLoaded(true); // MARCA COMO CARREGADO
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
      setIsThemeLoaded(true); // MESMO COM ERRO, MARCA COMO CARREGADO
    }
  };

  const saveThemePreference = async (preference: 'light' | 'dark' | 'system') => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  const toggleTheme = () => {
    const newPreference = themePreference === 'dark' ? 'light' : 'dark';
    setThemePreference(newPreference);
    saveThemePreference(newPreference);
  };

  const handleSetThemePreference = (preference: 'light' | 'dark' | 'system') => {
    setThemePreference(preference);
    saveThemePreference(preference);
  };

  const colors = isDark ? DARK_COLORS : COLORS;

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      toggleTheme, 
      colors,
      themePreference,
      setThemePreference: handleSetThemePreference,
      isThemeLoaded // INCLUI NO CONTEXTO
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
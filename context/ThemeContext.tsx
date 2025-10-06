// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { COLORS } from '@/constants/Cores';

// Definir as cores para tema escuro
export const DARK_COLORS = {
  // Cores primárias (mantêm as mesmas)
  primary: '#277C5C',
  primaryDark: '#1E5F47',
  primaryLight: '#34A853',
  
  // Cores secundárias (mantêm as mesmas)
  secondary: '#D4A93A',
  secondaryDark: '#B38F2A',
  secondaryLight: '#FFD700',
  
  // Cores de fundo (invertidas)
  background: '#121212',
  surface: '#1E1E1E',
  paper: '#2D2D2D',
  
  // Cores de texto (invertidas)
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textDisabled: '#666666',
  textInverse: '#000000',
  
  // Cores de estado (mantêm as mesmas)
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Cores de borda
  border: '#333333',
  borderLight: '#444444',
  borderDark: '#222222',
  
  // Cores específicas do GreenSync (ajustadas)
  greenLight: '#1A3326',
  greenMuted: '#2D4A3A',
  goldLight: '#332E1A',
  
  // Cores neutras
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#1A1A1A',
  gray100: '#2D2D2D',
  gray200: '#3D3D3D',
  gray300: '#4D4D4D',
  gray400: '#666666',
  gray500: '#808080',
  gray600: '#999999',
  gray700: '#B3B3B3',
  gray800: '#CCCCCC',
  gray900: '#E6E6E6',
};

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof COLORS;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Carregar preferência salva
  useEffect(() => {
    // Aqui você pode carregar de AsyncStorage ou outro local
    const savedTheme = false; // Default para claro
    setIsDark(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    // Salvar preferência (AsyncStorage, etc.)
    // AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const colors = isDark ? DARK_COLORS : COLORS;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
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
// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="screens/EditarPerfil" />
          <Stack.Screen name="screens/Configuracoes" />
          <Stack.Screen name="screens/Suporte" />
          <Stack.Screen name="screens/DetalhesEstufa" />
          <Stack.Screen name="screens/DetalhesPlanta" />
          <Stack.Screen name="screens/AdicionarEstufa" />
          <Stack.Screen name="screens/AdicionarPlanta" />
          <Stack.Screen name="TelaLogin" />
          <Stack.Screen name="Cadastro" />
          <Stack.Screen name="index" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
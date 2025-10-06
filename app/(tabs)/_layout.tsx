// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT

export default function TabLayout() {
  const { colors } = useTheme(); // NOVO HOOK

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.borderLight,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDisabled,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      
      {/* Nova tela principal - Home */}
      <Tabs.Screen
        name="TelaPrincipal"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="home" 
              size={24} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Plantas"
        options={{
          title: 'Plantas',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="seedling" 
              size={24} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Estufas"
        options={{
          title: 'Estufas',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="warehouse" 
              size={24} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="info-circle" 
              size={24} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="user" 
              size={24} 
              color={color} 
              solid={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
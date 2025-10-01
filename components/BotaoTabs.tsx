import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

// Importar as telas
import TelaPlantas from "@/app/(tabs)/Plantas";
import TelaEstufas from "@/app/(tabs)/Estufas";
import TelaPerfil from "@/app/(tabs)/Perfil";
import TelaSobre from "@/app/(tabs)/Sobre";
import { COLORS } from "@/constants/Cores";
import { TYPOGRAPHY } from "@/constants/Fontes";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.greenLight,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textDisabled,
        tabBarLabelStyle: {
          fontSize: TYPOGRAPHY.fontSize.sm,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          marginTop: 4,
        },
      }}
    >
      
      <Tab.Screen
        name="Plantas"
        component={TelaPlantas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="seedling" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Estufas"
        component={TelaEstufas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="warehouse" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={TelaPerfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Sobre"
        component={TelaSobre}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="info-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function TelaPrincipal() {
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.box, { backgroundColor: colors.surface }]}>
        {/* Logo */}
        <Text style={[styles.logo, { color: colors.primary }]}>GreenSync</Text>

        {/* Subtítulo */}
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Estufa Automática</Text>

        {/* Linha 1 - Plantas e Estufas */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.gray50 }]} 
            onPress={() => router.push('/(tabs)/Plantas')}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.greenLight }]}>
              <FontAwesome5 name="seedling" size={28} color={colors.primary} />
            </View>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Plantas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.gray50 }]} 
            onPress={() => router.push('/(tabs)/Estufas')}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.greenLight }]}>
              <FontAwesome5 name="warehouse" size={28} color={colors.primary} />
            </View>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Estufas</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 2 - Perfil e Sobre */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.gray50 }]} 
            onPress={() => router.push('/(tabs)/Perfil')}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.greenLight }]}>
              <FontAwesome5 name="user" size={28} color={colors.primary} />
            </View>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.gray50 }]} 
            onPress={() => router.push('/(tabs)/Sobre')}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.greenLight }]}>
              <FontAwesome5 name="question" size={28} color={colors.primary} />
            </View>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Sobre</Text>
          </TouchableOpacity>
        </View>

        {/* Botões adicionais */}
        <View style={styles.additionalButtons}>
          <TouchableOpacity 
            style={[styles.textButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/screens/ControleAmbiente')}
          >
            <Text style={[styles.textButtonText, { color: colors.white }]}>Controle de Ambiente</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.textButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/screens/Dashboard')}
          >
            <Text style={[styles.textButtonText, { color: colors.white }]}>Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  box: {
    borderRadius: 12,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  logo: {
    fontSize: TYPOGRAPHY.fontSize['5xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    marginBottom: 40,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  iconButton: {
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    width: "45%",
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    borderRadius: 20,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textAlign: "center",
  },
  additionalButtons: {
    width: "100%",
    marginTop: 10,
  },
  textButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
});
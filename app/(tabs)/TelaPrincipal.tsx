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
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function TelaPrincipal() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.box}>
        {/* Logo */}
        <Text style={styles.logo}>GreenSync</Text>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>Estufa Automática</Text>

        {/* Linha 1 - Plantas e Estufas */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => router.push('/(tabs)/Plantas')}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="seedling" size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.label}>Plantas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => router.push('/(tabs)/Estufas')}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="warehouse" size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.label}>Estufas</Text>
          </TouchableOpacity>
        </View>

        {/* Linha 2 - Perfil e Sobre */}
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => router.push('/(tabs)/Perfil')}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="user" size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.label}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => router.push('/(tabs)/Sobre')}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="question" size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.label}>Sobre</Text>
          </TouchableOpacity>
        </View>

        {/* Botões adicionais */}
        <View style={styles.additionalButtons}>
          <TouchableOpacity 
            style={styles.textButton}
            onPress={() => router.push('/screens/ControleAmbiente')}
          >
            <Text style={styles.textButtonText}>Controle de Ambiente</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.textButton}
            onPress={() => router.push('/(tabs)/TelaPrincipal')}
          >
            <Text style={styles.textButtonText}>Dashboard</Text>
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
    backgroundColor: COLORS.background,
    padding: 16,
  },
  box: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 24,
    elevation: 4,
    shadowColor: COLORS.black,
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
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
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
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    width: "45%",
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    backgroundColor: COLORS.greenLight,
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
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  additionalButtons: {
    width: "100%",
    marginTop: 10,
  },
  textButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textButtonText: {
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
});
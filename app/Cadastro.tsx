import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const router = useRouter();

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarFormulario = () => {
    return nome.trim().length > 2 && 
           validarEmail(email) && 
           senha.length >= 6 && 
           senha === confirmarSenha;
  };

  const handleCadastro = () => {
    if (!validarFormulario()) {
      Alert.alert("Atenção", "Preencha todos os campos corretamente");
      return;
    }
    router.push('/(tabs)/TelaPrincipal')
  };

  const handleVoltarLogin = () => {
    router.push('/TelaLogin');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.box}>
          <Text style={styles.title}>GreenSync</Text>
          <Text style={styles.subtitle}>Criar nova conta</Text>
          
          {/* Campo Nome */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Completo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              placeholderTextColor={COLORS.textDisabled}
              autoCapitalize="words"
              autoCorrect={false}
              value={nome}
              onChangeText={setNome}
              maxLength={50}
            />
            {nome.length > 0 && (
              <Text style={styles.charCount}>{nome.length}/50</Text>
            )}
          </View>
          
          {/* Campo Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail *</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor={COLORS.textDisabled}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          {/* Campo Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha *</Text>
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor={COLORS.textDisabled}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              maxLength={20}
            />
            {senha.length > 0 && (
              <Text style={styles.charCount}>{senha.length}/20</Text>
            )}
          </View>
          
          {/* Campo Confirmar Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmar Senha *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a senha novamente"
              placeholderTextColor={COLORS.textDisabled}
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              maxLength={20}
            />
          </View>

          {/* Indicadores visuais de validação */}
          <View style={styles.indicadores}>
            <Text style={styles.indicadorTitulo}>Validação dos campos:</Text>
            <Text style={nome.length > 2 ? styles.indicadorOk : styles.indicadorNok}>
              {nome.length > 2 ? "✓ Nome válido (3+ caracteres)" : "✗ Nome muito curto"}
            </Text>
            <Text style={validarEmail(email) ? styles.indicadorOk : styles.indicadorNok}>
              {validarEmail(email) ? "✓ E-mail válido" : "✗ E-mail inválido"}
            </Text>
            <Text style={senha.length >= 6 ? styles.indicadorOk : styles.indicadorNok}>
              {senha.length >= 6 ? "✓ Senha forte (6+ caracteres)" : "✗ Senha fraca"}
            </Text>
            <Text style={senha === confirmarSenha && senha.length > 0 ? styles.indicadorOk : styles.indicadorNok}>
              {senha === confirmarSenha && senha.length > 0 ? "✓ Senhas coincidem" : "✗ Senhas diferentes"}
            </Text>
          </View>
          
          {/* Botão Cadastrar */}
          <TouchableOpacity 
            style={styles.botaoCadastrar} 
            onPress={handleCadastro}
          >
            <FontAwesome5 name="user-plus" size={16} color={COLORS.white} />
            <Text style={styles.textoBotao}>Criar Conta</Text>
          </TouchableOpacity>
          
          {/* Botão Voltar */}
          <TouchableOpacity 
            style={styles.botaoVoltar} 
            onPress={handleVoltarLogin}
          >
            <FontAwesome5 name="arrow-left" size={14} color={COLORS.primary} />
            <Text style={styles.textoVoltar}>Voltar para o Login</Text>
          </TouchableOpacity>

          {/* Texto de campos obrigatórios */}
          <Text style={styles.requiredText}>* Campos obrigatórios</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  box: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 32,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['5xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.gray50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textPrimary,
  },
  charCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textDisabled,
    textAlign: "right",
    marginTop: 4,
  },
  indicadores: {
    backgroundColor: COLORS.gray50,
    padding: 16,
    borderRadius: 8,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  indicadorTitulo: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 10,
    color: COLORS.textSecondary,
  },
  indicadorOk: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.success,
    marginBottom: 6,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  indicadorNok: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.error,
    marginBottom: 6,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  botaoCadastrar: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botaoDesabilitado: {
    backgroundColor: COLORS.gray400,
  },
  textoBotao: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 8,
  },
  textoVoltar: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  requiredText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textDisabled,
    textAlign: "center",
    marginTop: 10,
  },
});
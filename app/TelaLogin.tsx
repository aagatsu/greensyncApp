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
  ActivityIndicator
} from "react-native";
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

type Props = {
  onLoginSuccess?: () => void;
};

export default function TelaLogin({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Atenção", "Digite um e-mail válido");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setCarregando(true);

    // Simulação de processo de login
    setTimeout(() => {
      Alert.alert("Bem-vindo!", "Login realizado com sucesso!");
      setCarregando(false);
      onLoginSuccess?.();
      router.push('/(tabs)/TelaPrincipal');
    }, 1500);
  };

  const handleCadastro = () => {
    router.push('/Cadastro');
  };

  const handleAcessoSemLogin = () => {
    router.push('/(tabs)/TelaPrincipal');
  };

  const podeFazerLogin = email.trim().length > 0 && senha.trim().length >= 6 && validarEmail(email);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.box}>
        <Text style={styles.title}>GreenSync</Text>
        <Text style={styles.subtitle}>Faça login em sua conta</Text>
        
        {/* Campo Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor={COLORS.textDisabled}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            editable={!carregando}
          />
        </View>
        
        {/* Campo Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={COLORS.textDisabled}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            editable={!carregando}
          />
        </View>

        {/* Indicadores de validação */}
        <View style={styles.indicadores}>
          <Text style={styles.indicadorTitulo}>Validação:</Text>
          <Text style={validarEmail(email) ? styles.indicadorOk : styles.indicadorNok}>
            {validarEmail(email) ? "✓ E-mail válido" : "✗ E-mail inválido"}
          </Text>
          <Text style={senha.length >= 6 ? styles.indicadorOk : styles.indicadorNok}>
            {senha.length >= 6 ? "✓ Senha OK (6+ caracteres)" : "✗ Senha muito curta"}
          </Text>
        </View>
        
        {/* Botão Login */}
        <TouchableOpacity 
          style={[
            styles.botaoLogin, 
            (!podeFazerLogin || carregando) && styles.botaoDesabilitado
          ]} 
          onPress={handleLogin}
          disabled={!podeFazerLogin || carregando}
        >
          {carregando ? (
            <ActivityIndicator color={COLORS.textInverse} size="small" />
          ) : (
            <>
              <FontAwesome5 name="sign-in-alt" size={16} color={COLORS.textInverse} />
              <Text style={styles.textoBotao}>Entrar</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.separador}>
          <View style={styles.linha} />
          <Text style={styles.textoSeparador}>ou</Text>
          <View style={styles.linha} />
        </View>
        
        {/* Botão Cadastro */}
        <TouchableOpacity 
          style={styles.botaoCadastro}
          onPress={handleCadastro}
          disabled={carregando}
        >
          <FontAwesome5 name="user-plus" size={16} color={COLORS.textInverse} />
          <Text style={styles.textoCadastro}>Criar Nova Conta</Text>
        </TouchableOpacity>
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
  indicadores: {
    backgroundColor: COLORS.gray50,
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.success,
  },
  indicadorTitulo: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 6,
    color: COLORS.textSecondary,
  },
  indicadorOk: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.success,
    marginBottom: 3,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  indicadorNok: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.error,
    marginBottom: 3,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  botaoLogin: {
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
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
  separador: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  textoSeparador: {
    marginHorizontal: 15,
    color: COLORS.textDisabled,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  botaoCadastro: {
    backgroundColor: COLORS.primaryLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textoCadastro: {
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
  acessoRapido: {
    padding: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  acessoRapidoText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textDecorationLine: "underline",
  },
  esqueciSenha: {
    padding: 8,
    alignItems: "center",
  },
  esqueciSenhaText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    textDecorationLine: "underline",
  },
});
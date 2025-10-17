// TelaLogin.tsx (atualizado)
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
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes';

type Props = {
  onLoginSuccess?: () => void;
};

export default function TelaLogin({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();
  const { login } = useAuth(); // NOVO HOOK

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
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

    // Login com Firebase
    const result = await login(email, senha);
    setCarregando(false);

    if (result.success) {
      Alert.alert("Bem-vindo!", "Login realizado com sucesso!");
      onLoginSuccess?.();
      router.push('/(tabs)/TelaPrincipal');
    } else {
      Alert.alert("Erro no login", result.error || "Erro desconhecido");
    }
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
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.box, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.primary }]}>GreenSync</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Faça login em sua conta</Text>
        
        {/* Campo Email */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>E-mail</Text>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: colors.gray50,
                borderColor: colors.border,
                color: colors.textPrimary
              }
            ]}
            placeholder="seu@email.com"
            placeholderTextColor={colors.textDisabled}
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
          <Text style={[styles.label, { color: colors.textPrimary }]}>Senha</Text>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: colors.gray50,
                borderColor: colors.border,
                color: colors.textPrimary
              }
            ]}
            placeholder="Digite sua senha"
            placeholderTextColor={colors.textDisabled}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            editable={!carregando}
          />
        </View>

        {/* Indicadores de validação */}
        <View style={[
          styles.indicadores, 
          { 
            backgroundColor: colors.gray50,
            borderLeftColor: colors.success
          }
        ]}>
          <Text style={[styles.indicadorTitulo, { color: colors.textSecondary }]}>
            Validação:
          </Text>
          <Text style={[
            validarEmail(email) ? styles.indicadorOk : styles.indicadorNok,
            { color: validarEmail(email) ? colors.success : colors.error }
          ]}>
            {validarEmail(email) ? "✓ E-mail válido" : "✗ E-mail inválido"}
          </Text>
          <Text style={[
            senha.length >= 6 ? styles.indicadorOk : styles.indicadorNok,
            { color: senha.length >= 6 ? colors.success : colors.error }
          ]}>
            {senha.length >= 6 ? "✓ Senha OK (6+ caracteres)" : "✗ Senha muito curta"}
          </Text>
        </View>
        
        {/* Botão Login */}
        <TouchableOpacity 
          style={[
            styles.botaoLogin, 
            { backgroundColor: colors.primary },
            (!podeFazerLogin || carregando) && [
              styles.botaoDesabilitado, 
              { backgroundColor: colors.gray400 }
            ]
          ]} 
          onPress={handleLogin}
          disabled={!podeFazerLogin || carregando}
        >
          {carregando ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <>
              <FontAwesome5 name="sign-in-alt" size={16} color={colors.white} />
              <Text style={[styles.textoBotao, { color: colors.white }]}>Entrar</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.separador}>
          <View style={[styles.linha, { backgroundColor: colors.border }]} />
          <Text style={[styles.textoSeparador, { color: colors.textDisabled }]}>ou</Text>
          <View style={[styles.linha, { backgroundColor: colors.border }]} />
        </View>
        
        {/* Botão Cadastro */}
        <TouchableOpacity 
          style={[styles.botaoCadastro, { backgroundColor: colors.primaryLight }]}
          onPress={handleCadastro}
          disabled={carregando}
        >
          <FontAwesome5 name="user-plus" size={16} color={colors.white} />
          <Text style={[styles.textoCadastro, { color: colors.white }]}>Criar Nova Conta</Text>
        </TouchableOpacity>

        {/* Esqueci Senha */}
        <TouchableOpacity 
          style={styles.esqueciSenha}
          onPress={() => {
            if (email && validarEmail(email)) {
              // Implementar redefinição de senha
              Alert.alert("Recuperar Senha", `Enviar email de recuperação para ${email}?`);
            } else {
              Alert.alert("Atenção", "Digite um email válido primeiro");
            }
          }}
          disabled={carregando}
        >
          <Text style={[styles.esqueciSenhaText, { color: colors.textSecondary }]}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Mantenha os mesmos estilos...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  box: {
    borderRadius: 12,
    padding: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['5xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  indicadores: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    borderLeftWidth: 3,
  },
  indicadorTitulo: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 6,
  },
  indicadorOk: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginBottom: 3,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  indicadorNok: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginBottom: 3,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  botaoLogin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botaoDesabilitado: {
    // Cor definida inline
  },
  textoBotao: {
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
  },
  textoSeparador: {
    marginHorizontal: 15,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  botaoCadastro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textoCadastro: {
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
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textDecorationLine: "underline",
  },
  esqueciSenha: {
    padding: 8,
    alignItems: "center",
  },
  esqueciSenhaText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    textDecorationLine: "underline",
  },
});
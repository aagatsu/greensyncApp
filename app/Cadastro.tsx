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
  ScrollView,
  ActivityIndicator // ADICIONE ESTA IMPORT
} from "react-native";
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false); // NOVO ESTADO
  const router = useRouter();
  const { colors } = useTheme();
  const { signup } = useAuth(); // NOVO HOOK

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

const handleCadastro = async () => {
  if (!validarFormulario()) {
    Alert.alert("Atenção", "Preencha todos os campos corretamente");
    return;
  }

  setCarregando(true);

  // Cadastro com Firebase
  const result = await signup(email, senha, nome);
  setCarregando(false);

  if (result.success) {
    // Redireciona automaticamente para login
    router.push('/TelaLogin')
    Alert.alert("Sucewsso!", "Conta criada com sucesso!", [
      {
        text: "OK",
        onPress: () => {
          // Limpa os campos
          setNome("");
          setEmail("");
          setSenha("");
          setConfirmarSenha("");
          // Redireciona para login
          router.push('/TelaLogin');
        }
      }
    ]);
  } else {
    Alert.alert("Erro no cadastro", result.error || "Erro desconhecido");
  }
};

  const handleVoltarLogin = () => {
    router.push('/TelaLogin');
  };

  const podeCadastrar = validarFormulario() && !carregando;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.box, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.primary }]}>GreenSync</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Criar nova conta</Text>
          
          {/* Campo Nome */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Nome Completo *</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.gray50,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }
              ]}
              placeholder="Digite seu nome completo"
              placeholderTextColor={colors.textDisabled}
              autoCapitalize="words"
              autoCorrect={false}
              value={nome}
              onChangeText={setNome}
              maxLength={50}
              editable={!carregando} // ADICIONADO
            />
            {nome.length > 0 && (
              <Text style={[styles.charCount, { color: colors.textDisabled }]}>
                {nome.length}/50
              </Text>
            )}
          </View>
          
          {/* Campo Email */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>E-mail *</Text>
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
              editable={!carregando} // ADICIONADO
            />
          </View>
          
          {/* Campo Senha */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Senha *</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.gray50,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }
              ]}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor={colors.textDisabled}
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
              maxLength={20}
              editable={!carregando} // ADICIONADO
            />
            {senha.length > 0 && (
              <Text style={[styles.charCount, { color: colors.textDisabled }]}>
                {senha.length}/20
              </Text>
            )}
          </View>
          
          {/* Campo Confirmar Senha */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Confirmar Senha *</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.gray50,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }
              ]}
              placeholder="Digite a senha novamente"
              placeholderTextColor={colors.textDisabled}
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              maxLength={20}
              editable={!carregando} // ADICIONADO
            />
          </View>

          {/* Indicadores visuais de validação */}
          <View style={[
            styles.indicadores, 
            { 
              backgroundColor: colors.gray50,
              borderLeftColor: colors.success
            }
          ]}>
            <Text style={[styles.indicadorTitulo, { color: colors.textSecondary }]}>
              Validação dos campos:
            </Text>
            <Text style={[
              nome.length > 2 ? styles.indicadorOk : styles.indicadorNok,
              { color: nome.length > 2 ? colors.success : colors.error }
            ]}>
              {nome.length > 2 ? "✓ Nome válido (3+ caracteres)" : "✗ Nome muito curto"}
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
              {senha.length >= 6 ? "✓ Senha forte (6+ caracteres)" : "✗ Senha fraca"}
            </Text>
            <Text style={[
              senha === confirmarSenha && senha.length > 0 ? styles.indicadorOk : styles.indicadorNok,
              { color: senha === confirmarSenha && senha.length > 0 ? colors.success : colors.error }
            ]}>
              {senha === confirmarSenha && senha.length > 0 ? "✓ Senhas coincidem" : "✗ Senhas diferentes"}
            </Text>
          </View>
          
          {/* Botão Cadastrar - ATUALIZADO */}
          <TouchableOpacity 
            style={[
              styles.botaoCadastrar, 
              { backgroundColor: colors.primary },
              !podeCadastrar && [
                styles.botaoDesabilitado, 
                { backgroundColor: colors.gray400 }
              ]
            ]} 
            onPress={handleCadastro}
            disabled={!podeCadastrar}
          >
            {carregando ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <>
                <FontAwesome5 name="user-plus" size={16} color={colors.white} />
                <Text style={[styles.textoBotao, { color: colors.white }]}>Criar Conta</Text>
              </>
            )}
          </TouchableOpacity>
          
          {/* Botão Voltar - ATUALIZADO */}
          <TouchableOpacity 
            style={[
              styles.botaoVoltar, 
              { 
                borderColor: colors.primary,
                backgroundColor: colors.surface
              }
            ]} 
            onPress={handleVoltarLogin}
            disabled={carregando} // ADICIONADO
          >
            <FontAwesome5 name="arrow-left" size={14} color={colors.primary} />
            <Text style={[styles.textoVoltar, { color: colors.primary }]}>Voltar para o Login</Text>
          </TouchableOpacity>

          {/* Texto de campos obrigatórios */}
          <Text style={[styles.requiredText, { color: colors.textDisabled }]}>
            * Campos obrigatórios
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Mantenha os mesmos estilos, apenas atualize o botaoDesabilitado:
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  charCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: "right",
    marginTop: 4,
  },
  indicadores: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 25,
    borderLeftWidth: 4,
  },
  indicadorTitulo: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 10,
  },
  indicadorOk: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: 6,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  indicadorNok: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: 6,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  botaoCadastrar: {
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
    opacity: 0.6, // ADICIONADO
  },
  textoBotao: {
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
    marginBottom: 8,
  },
  textoVoltar: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  requiredText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: "center",
    marginTop: 10,
  },
});
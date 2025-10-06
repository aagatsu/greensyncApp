import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from "react-native";
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function EditarPerfil() {
  const router = useRouter();
  const { usuario, logout } = useAuth();
  const { colors } = useTheme(); // NOVO HOOK

  const [nome, setNome] = useState(usuario?.nome || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [bio, setBio] = useState("Entusiasta da agricultura urbana e cultivo de plantas medicinais.");
  const [imagemPerfil, setImagemPerfil] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  const validarFormulario = () => {
    return nome.trim().length > 0 && 
           email.trim().length > 0 &&
           validarEmail(email);
  };

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const escolherImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso às fotos para alterar a imagem de perfil.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagemPerfil(resultado.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para tirar uma foto.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagemPerfil(resultado.assets[0].uri);
    }
  };

  const removerImagem = () => {
    setImagemPerfil(null);
  };

  const handleSalvar = async () => {
    if (!validarFormulario()) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios corretamente");
      return;
    }

    setSalvando(true);

    try {
      // Simulação de salvamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const dadosAtualizados = {
        nome,
        email,
        bio,
        imagemPerfil
      };

      console.log('Perfil atualizado:', dadosAtualizados);

      Alert.alert(
        "Sucesso!", 
        "Perfil atualizado com sucesso!",
        [
          { 
            text: "OK", 
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const handleCancelar = () => {
    router.push('/Perfil');
  };

  const handleVoltar = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.box, { backgroundColor: colors.surface }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={[styles.backButton, { borderColor: colors.border }]} 
              onPress={handleVoltar}
            >
              <FontAwesome5 name="arrow-left" size={20} color={colors.primary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.primary }]}>Editar Perfil</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Foto de Perfil */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Foto de Perfil</Text>
            
            <View style={styles.fotoContainer}>
              {imagemPerfil ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: imagemPerfil }} style={styles.fotoPerfil} />
                  <View style={styles.fotoActions}>
                    <TouchableOpacity 
                      style={[styles.fotoActionButton, { backgroundColor: colors.success }]}
                      onPress={escolherImagem}
                    >
                      <FontAwesome5 name="sync" size={14} color={colors.white} />
                      <Text style={[styles.fotoActionText, { color: colors.white }]}>Trocar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.fotoActionButton, styles.removeButton, { backgroundColor: colors.error }]}
                      onPress={removerImagem}
                    >
                      <FontAwesome5 name="trash" size={14} color={colors.white} />
                      <Text style={[styles.fotoActionText, { color: colors.white }]}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.fotoPlaceholder}>
                  <FontAwesome5 name="user" size={40} color={colors.textDisabled} />
                  <View style={styles.fotoOptions}>
                    <TouchableOpacity 
                      style={[styles.fotoOptionButton, { backgroundColor: colors.gray50 }]}
                      onPress={escolherImagem}
                    >
                      <FontAwesome5 name="image" size={16} color={colors.success} />
                      <Text style={[styles.fotoOptionText, { color: colors.textPrimary }]}>Galeria</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.fotoOptionButton, { backgroundColor: colors.gray50 }]}
                      onPress={tirarFoto}
                    >
                      <FontAwesome5 name="camera" size={16} color={colors.info} />
                      <Text style={[styles.fotoOptionText, { color: colors.textPrimary }]}>Câmera</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Informações Pessoais */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Informações Pessoais</Text>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>Nome Completo *</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.gray50,
                    borderColor: colors.borderLight,
                    color: colors.textPrimary
                  }
                ]}
                placeholder="Seu nome completo"
                placeholderTextColor={colors.textDisabled}
                value={nome}
                onChangeText={setNome}
                maxLength={50}
              />
              {nome.length > 0 && (
                <Text style={[styles.charCount, { color: colors.textDisabled }]}>
                  {nome.length}/50
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>E-mail *</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.gray50,
                    borderColor: colors.borderLight,
                    color: colors.textPrimary
                  }
                ]}
                placeholder="seu@email.com"
                placeholderTextColor={colors.textDisabled}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Biografia */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Biografia</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input, 
                  styles.textArea, 
                  { 
                    backgroundColor: colors.gray50,
                    borderColor: colors.borderLight,
                    color: colors.textPrimary
                  }
                ]}
                placeholder="Conte um pouco sobre você e seu interesse por plantas..."
                placeholderTextColor={colors.textDisabled}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={200}
              />
              {bio.length > 0 && (
                <Text style={[styles.charCount, { color: colors.textDisabled }]}>
                  {bio.length}/200
                </Text>
              )}
            </View>
          </View>

          {/* Indicadores de Validação */}
          <View style={[
            styles.indicadores, 
            { 
              backgroundColor: colors.gray50,
              borderLeftColor: colors.success
            }
          ]}>
            <Text style={[styles.indicadorTitulo, { color: colors.textSecondary }]}>
              Validação do formulário:
            </Text>
            <Text style={[
              nome.length > 0 ? styles.indicadorOk : styles.indicadorNok,
              { color: nome.length > 0 ? colors.success : colors.error }
            ]}>
              {nome.length > 0 ? "✓ Nome preenchido" : "✗ Nome obrigatório"}
            </Text>
            <Text style={[
              validarEmail(email) ? styles.indicadorOk : styles.indicadorNok,
              { color: validarEmail(email) ? colors.success : colors.error }
            ]}>
              {validarEmail(email) ? "✓ E-mail válido" : "✗ E-mail inválido"}
            </Text>
          </View>

          {/* Botões de Ação */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[
                styles.botaoSalvar, 
                { backgroundColor: colors.primary },
                (!validarFormulario() || salvando) && [
                  styles.botaoDesabilitado, 
                  { backgroundColor: colors.gray400 }
                ]
              ]} 
              onPress={handleSalvar}
              disabled={!validarFormulario() || salvando}
            >
              {salvando ? (
                <FontAwesome5 name="spinner" size={16} color={colors.white} />
              ) : (
                <FontAwesome5 name="save" size={16} color={colors.white} />
              )}
              <Text style={[styles.botaoSalvarText, { color: colors.white }]}>
                {salvando ? "Salvando..." : "Salvar Alterações"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.botaoCancelar, 
                { 
                  borderColor: colors.border,
                  backgroundColor: colors.surface
                }
              ]} 
              onPress={handleCancelar}
              disabled={salvando}
            >
              <FontAwesome5 name="times" size={16} color={colors.textSecondary} />
              <Text style={[styles.botaoCancelarText, { color: colors.textSecondary }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.requiredText, { color: colors.textDisabled }]}>
            * Campos obrigatórios
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    width: 40,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 16,
  },
  fotoContainer: {
    alignItems: "center",
  },
  imagePreviewContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  fotoPlaceholder: {
    alignItems: "center",
    padding: 20,
  },
  fotoOptions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12,
  },
  fotoOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  fotoOptionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 6,
  },
  fotoActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  fotoActionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  removeButton: {
    // Cor definida inline
  },
  fotoActionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 6,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    textAlign: "right",
    marginTop: 4,
  },
  indicadores: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
  },
  indicadorTitulo: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 10,
  },
  indicadorOk: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginBottom: 6,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  indicadorNok: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginBottom: 6,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  botaoSalvar: {
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
  botaoDesabilitado: {
    // Cor definida inline
  },
  botaoSalvarText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
  botaoCancelar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  botaoCancelarText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  requiredText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    textAlign: "center",
    marginTop: 16,
  },
});
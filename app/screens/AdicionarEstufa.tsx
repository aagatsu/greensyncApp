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
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes'; 

export default function AdicionarEstufa() {
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK

  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

  const validarFormulario = () => {
    return nome.trim().length > 0 && 
           localizacao.trim().length > 0 &&
           imagem !== null;
  };

  const escolherImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso às fotos para adicionar uma imagem da estufa.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const removerImagem = () => {
    setImagem(null);
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para tirar uma foto.');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const handleSalvar = () => {
    if (!validarFormulario()) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios e adicione uma foto");
      return;
    }

    // Simulação de salvamento
    const novaEstufa = {
      nome,
      localizacao,
      descricao,
      imagem
    };

    console.log('Nova estufa:', novaEstufa);

    Alert.alert(
      "Sucesso!", 
      `Estufa "${nome}" cadastrada com sucesso!`,
      [
        { 
          text: "OK", 
          onPress: () => router.back()
        }
      ]
    );
  };

  const handleCancelar = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]} // ATUALIZADO
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.box, { backgroundColor: colors.surface }]}> {/* ATUALIZADO */}
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={[styles.backButton, { borderColor: colors.border }]} // ATUALIZADO
              onPress={handleCancelar}
            >
              <FontAwesome5 name="arrow-left" size={TYPOGRAPHY.fontSize.lg} color={colors.primary} /> {/* ATUALIZADO */}
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.primary }]}>Nova Estufa</Text> {/* ATUALIZADO */}
            <View style={styles.headerSpacer} />
          </View>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Preencha os dados da nova estufa</Text> {/* ATUALIZADO */}

          {/* Foto da Estufa */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Foto da Estufa *</Text> {/* ATUALIZADO */}
            
            {imagem ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imagem }} style={styles.previewImage} />
                <View style={styles.imageActions}>
                  <TouchableOpacity 
                    style={[styles.imageActionButton, { backgroundColor: colors.success }]} // ATUALIZADO
                    onPress={escolherImagem}
                  >
                    <FontAwesome5 name="sync" size={TYPOGRAPHY.fontSize.sm} color={colors.white} /> {/* ATUALIZADO */}
                    <Text style={[styles.imageActionText, { color: colors.white }]}>Trocar</Text> {/* ATUALIZADO */}
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.imageActionButton, styles.removeButton, { backgroundColor: colors.error }]} // ATUALIZADO
                    onPress={removerImagem}
                  >
                    <FontAwesome5 name="trash" size={TYPOGRAPHY.fontSize.sm} color={colors.white} /> {/* ATUALIZADO */}
                    <Text style={[styles.imageActionText, { color: colors.white }]}>Remover</Text> {/* ATUALIZADO */}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.imageOptions}>
                <TouchableOpacity 
                  style={[styles.imageOptionButton, { 
                    backgroundColor: colors.gray50, 
                    borderColor: colors.border 
                  }]} // ATUALIZADO
                  onPress={escolherImagem}
                >
                  <FontAwesome5 name="image" size={TYPOGRAPHY.fontSize['3xl']} color={colors.success} /> {/* ATUALIZADO */}
                  <Text style={[styles.imageOptionText, { color: colors.textPrimary }]}>Galeria</Text> {/* ATUALIZADO */}
                  <Text style={[styles.imageOptionSubtext, { color: colors.textDisabled }]}>Escolher da galeria</Text> {/* ATUALIZADO */}
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.imageOptionButton, { 
                    backgroundColor: colors.gray50, 
                    borderColor: colors.border 
                  }]} // ATUALIZADO
                  onPress={tirarFoto}
                >
                  <FontAwesome5 name="camera" size={TYPOGRAPHY.fontSize['3xl']} color={colors.info} /> {/* ATUALIZADO */}
                  <Text style={[styles.imageOptionText, { color: colors.textPrimary }]}>Câmera</Text> {/* ATUALIZADO */}
                  <Text style={[styles.imageOptionSubtext, { color: colors.textDisabled }]}>Tirar nova foto</Text> {/* ATUALIZADO */}
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Informações Básicas */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Informações Básicas</Text> {/* ATUALIZADO */}
            
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>Nome da Estufa *</Text> {/* ATUALIZADO */}
              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.gray50, 
                  borderColor: colors.borderDark,
                  color: colors.textPrimary 
                }]} // ATUALIZADO
                placeholder="Ex: Estufa de Hortelã, Estufa Principal..."
                placeholderTextColor={colors.textDisabled} // ATUALIZADO
                value={nome}
                onChangeText={setNome}
                maxLength={50}
              />
              {nome.length > 0 && (
                <Text style={[styles.charCount, { color: colors.textDisabled }]}>{nome.length}/50</Text> // ATUALIZADO
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>Localização *</Text> {/* ATUALIZADO */}
              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.gray50, 
                  borderColor: colors.borderDark,
                  color: colors.textPrimary 
                }]} // ATUALIZADO
                placeholder="Ex: Varanda, Quintal, Garagem..."
                placeholderTextColor={colors.textDisabled} // ATUALIZADO
                value={localizacao}
                onChangeText={setLocalizacao}
                maxLength={30}
              />
              {localizacao.length > 0 && (
                <Text style={[styles.charCount, { color: colors.textDisabled }]}>{localizacao.length}/30</Text> // ATUALIZADO
              )}
            </View>
          </View>

          {/* Descrição */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Descrição (Opcional)</Text> {/* ATUALIZADO */}
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.textArea, { 
                  backgroundColor: colors.gray50, 
                  borderColor: colors.borderDark,
                  color: colors.textPrimary 
                }]} // ATUALIZADO
                placeholder="Descreva a finalidade desta estufa, tipos de plantas, observações..."
                placeholderTextColor={colors.textDisabled} // ATUALIZADO
                value={descricao}
                onChangeText={setDescricao}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={200}
              />
              {descricao.length > 0 && (
                <Text style={[styles.charCount, { color: colors.textDisabled }]}>{descricao.length}/200</Text> // ATUALIZADO
              )}
            </View>
          </View>

          {/* Indicadores de Validação */}
          <View style={[styles.indicadores, { 
            backgroundColor: colors.gray50, 
            borderLeftColor: colors.success 
          }]}> {/* ATUALIZADO */}
            <Text style={[styles.indicadorTitulo, { color: colors.textSecondary }]}>Validação do formulário:</Text> {/* ATUALIZADO */}
            <Text style={[
              nome.length > 0 ? styles.indicadorOk : styles.indicadorNok,
              { color: nome.length > 0 ? colors.success : colors.error }
            ]}>
              {nome.length > 0 ? "✓ Nome preenchido" : "✗ Nome obrigatório"}
            </Text>
            <Text style={[
              localizacao.length > 0 ? styles.indicadorOk : styles.indicadorNok,
              { color: localizacao.length > 0 ? colors.success : colors.error }
            ]}>
              {localizacao.length > 0 ? "✓ Localização preenchida" : "✗ Localização obrigatória"}
            </Text>
            <Text style={[
              imagem !== null ? styles.indicadorOk : styles.indicadorNok,
              { color: imagem !== null ? colors.success : colors.error }
            ]}>
              {imagem !== null ? "✓ Foto adicionada" : "✗ Foto obrigatória"}
            </Text>
          </View>

          {/* Botões de Ação */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[
                styles.botaoSalvar, 
                { backgroundColor: colors.primary }, // ATUALIZADO
                !validarFormulario() && [styles.botaoDesabilitado, { backgroundColor: colors.gray400 }] // ATUALIZADO
              ]} 
              onPress={handleSalvar}
              disabled={!validarFormulario()}
            >
              <FontAwesome5 name="save" size={TYPOGRAPHY.fontSize.base} color={colors.white} /> {/* ATUALIZADO */}
              <Text style={[styles.botaoSalvarText, { color: colors.white }]}>Salvar Estufa</Text> {/* ATUALIZADO */}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.botaoCancelar, { 
                borderColor: colors.borderDark 
              }]} // ATUALIZADO
              onPress={handleCancelar}
            >
              <FontAwesome5 name="times" size={TYPOGRAPHY.fontSize.base} color={colors.textSecondary} /> {/* ATUALIZADO */}
              <Text style={[styles.botaoCancelarText, { color: colors.textSecondary }]}>Cancelar</Text> {/* ATUALIZADO */}
            </TouchableOpacity>
          </View>

          <Text style={[styles.requiredText, { color: colors.textDisabled }]}>* Campos obrigatórios</Text> {/* ATUALIZADO */}
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
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 16,
  },
  imagePreviewContainer: {
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  imageActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  imageActionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  removeButton: {
    // Cor movida para o style inline
  },
  imageActionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 6,
  },
  imageOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  imageOptionButton: {
    flex: 1,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageOptionText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginTop: 8,
  },
  imageOptionSubtext: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginTop: 4,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
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
    // Cor movida para o style inline
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
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: "center",
    marginTop: 16,
  },
});
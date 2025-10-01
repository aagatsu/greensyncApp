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
import { COLORS } from '@/constants/Cores'; 
import { TYPOGRAPHY } from '@/constants/Fontes'; 

export default function AdicionarEstufa() {
  const router = useRouter();

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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.box}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleCancelar}>
              <FontAwesome5 name="arrow-left" size={TYPOGRAPHY.fontSize.lg} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Nova Estufa</Text>
            <View style={styles.headerSpacer} />
          </View>

          <Text style={styles.subtitle}>Preencha os dados da nova estufa</Text>

          {/* Foto da Estufa */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Foto da Estufa *</Text>
            
            {imagem ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imagem }} style={styles.previewImage} />
                <View style={styles.imageActions}>
                  <TouchableOpacity 
                    style={styles.imageActionButton}
                    onPress={escolherImagem}
                  >
                    <FontAwesome5 name="sync" size={TYPOGRAPHY.fontSize.sm} color={COLORS.white} />
                    <Text style={styles.imageActionText}>Trocar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.imageActionButton, styles.removeButton]}
                    onPress={removerImagem}
                  >
                    <FontAwesome5 name="trash" size={TYPOGRAPHY.fontSize.sm} color={COLORS.white} />
                    <Text style={styles.imageActionText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.imageOptions}>
                <TouchableOpacity 
                  style={styles.imageOptionButton}
                  onPress={escolherImagem}
                >
                  <FontAwesome5 name="image" size={TYPOGRAPHY.fontSize['3xl']} color={COLORS.success} />
                  <Text style={styles.imageOptionText}>Galeria</Text>
                  <Text style={styles.imageOptionSubtext}>Escolher da galeria</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.imageOptionButton}
                  onPress={tirarFoto}
                >
                  <FontAwesome5 name="camera" size={TYPOGRAPHY.fontSize['3xl']} color={COLORS.info} />
                  <Text style={styles.imageOptionText}>Câmera</Text>
                  <Text style={styles.imageOptionSubtext}>Tirar nova foto</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Informações Básicas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Básicas</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome da Estufa *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Estufa de Hortelã, Estufa Principal..."
                placeholderTextColor={COLORS.textDisabled}
                value={nome}
                onChangeText={setNome}
                maxLength={50}
              />
              {nome.length > 0 && (
                <Text style={styles.charCount}>{nome.length}/50</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Localização *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Varanda, Quintal, Garagem..."
                placeholderTextColor={COLORS.textDisabled}
                value={localizacao}
                onChangeText={setLocalizacao}
                maxLength={30}
              />
              {localizacao.length > 0 && (
                <Text style={styles.charCount}>{localizacao.length}/30</Text>
              )}
            </View>
          </View>

          {/* Descrição */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição (Opcional)</Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descreva a finalidade desta estufa, tipos de plantas, observações..."
                placeholderTextColor={COLORS.textDisabled}
                value={descricao}
                onChangeText={setDescricao}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={200}
              />
              {descricao.length > 0 && (
                <Text style={styles.charCount}>{descricao.length}/200</Text>
              )}
            </View>
          </View>

          {/* Indicadores de Validação */}
          <View style={styles.indicadores}>
            <Text style={styles.indicadorTitulo}>Validação do formulário:</Text>
            <Text style={nome.length > 0 ? styles.indicadorOk : styles.indicadorNok}>
              {nome.length > 0 ? "✓ Nome preenchido" : "✗ Nome obrigatório"}
            </Text>
            <Text style={localizacao.length > 0 ? styles.indicadorOk : styles.indicadorNok}>
              {localizacao.length > 0 ? "✓ Localização preenchida" : "✗ Localização obrigatória"}
            </Text>
            <Text style={imagem !== null ? styles.indicadorOk : styles.indicadorNok}>
              {imagem !== null ? "✓ Foto adicionada" : "✗ Foto obrigatória"}
            </Text>
          </View>

          {/* Botões de Ação */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[
                styles.botaoSalvar, 
                !validarFormulario() && styles.botaoDesabilitado
              ]} 
              onPress={handleSalvar}
              disabled={!validarFormulario()}
            >
              <FontAwesome5 name="save" size={TYPOGRAPHY.fontSize.base} color={COLORS.white} />
              <Text style={styles.botaoSalvarText}>Salvar Estufa</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.botaoCancelar} 
              onPress={handleCancelar}
            >
              <FontAwesome5 name="times" size={TYPOGRAPHY.fontSize.base} color={COLORS.textSecondary} />
              <Text style={styles.botaoCancelarText}>Cancelar</Text>
            </TouchableOpacity>
          </View>

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
    borderColor: COLORS.border,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
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
    backgroundColor: COLORS.success,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  removeButton: {
    backgroundColor: COLORS.error,
  },
  imageActionText: {
    color: COLORS.white,
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
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageOptionText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  imageOptionSubtext: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textDisabled,
    marginTop: 4,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textPrimary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textDisabled,
    textAlign: "right",
    marginTop: 4,
  },
  indicadores: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
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
  buttonsContainer: {
    marginTop: 10,
  },
  botaoSalvar: {
    backgroundColor: COLORS.primary,
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
  botaoDesabilitado: {
    backgroundColor: COLORS.gray400,
  },
  botaoSalvarText: {
    color: COLORS.white,
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
    borderColor: COLORS.borderDark,
  },
  botaoCancelarText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  requiredText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textDisabled,
    textAlign: "center",
    marginTop: 16,
  },
});
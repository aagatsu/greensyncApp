import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function AdicionarPlanta() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);

  // Função para abrir a galeria ou câmera
  const escolherImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de acesso às fotos para continuar.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const salvarPlanta = () => {
    if (!nome.trim()) {
      Alert.alert('Campo obrigatório', 'Digite o nome da planta.');
      return;
    }

    if (!descricao.trim()) {
      Alert.alert('Campo obrigatório', 'Digite a descrição da planta.');
      return;
    }

    if (!imagem) {
      Alert.alert('Foto obrigatória', 'Selecione uma foto para a planta.');
      return;
    }

    // Aqui você pode integrar com Firebase e salvar os dados
    console.log('Planta salva:', { nome, descricao, imagem });

    Alert.alert('Sucesso', 'Planta cadastrada com sucesso!', [
      {
        text: 'OK',
        onPress: () => router.back()
      }
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.box}>
          <Text style={styles.title}>Adicionar Nova Planta</Text>
          <Text style={styles.subtitle}>Preencha os dados da sua planta</Text>

          {/* Campo Nome */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome da Planta *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Manjericão, Hortelã..."
              placeholderTextColor={COLORS.textDisabled}
              value={nome}
              onChangeText={setNome}
            />
            {nome.trim().length > 0 && (
              <Text style={styles.charCount}>{nome.length}/50</Text>
            )}
          </View>

          {/* Campo Descrição */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descrição *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva as características da planta..."
              placeholderTextColor={COLORS.textDisabled}
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {descricao.trim().length > 0 && (
              <Text style={styles.charCount}>{descricao.length}/200</Text>
            )}
          </View>

          {/* Seção de Imagem */}
          <View style={styles.imageSection}>
            <Text style={styles.label}>Foto da Planta *</Text>
            
            {imagem ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imagem }} style={styles.previewImage} />
                <TouchableOpacity 
                  style={styles.changeImageButton}
                  onPress={escolherImagem}
                >
                  <FontAwesome5 name="sync" size={16} color={COLORS.white} />
                  <Text style={styles.changeImageText}>Trocar Foto</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.imageButton} 
                onPress={escolherImagem}
              >
                <FontAwesome5 name="camera" size={24} color={COLORS.primaryLight} />
                <Text style={styles.imageButtonText}>Selecionar Foto</Text>
                <Text style={styles.imageButtonSubtext}>Toque para escolher uma imagem</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Botões de ação */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[
                styles.saveButton, 
                (!nome.trim() || !descricao.trim() || !imagem) && styles.saveButtonDisabled
              ]} 
              onPress={salvarPlanta}
              disabled={!nome.trim() || !descricao.trim() || !imagem}
            >
              <FontAwesome5 name="check" size={16} color={COLORS.white} />
              <Text style={styles.saveButtonText}>Salvar Planta</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => router.back()}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          {/* Indicador de campos obrigatórios */}
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
    paddingTop: '15%',
  },
  scrollContent: {
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
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
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
  imageSection: {
    marginBottom: 30,
  },
  imageButton: {
    backgroundColor: COLORS.gray50,
    borderWidth: 2,
    borderColor: COLORS.borderLight,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.primaryLight,
    marginTop: 8,
  },
  imageButtonSubtext: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textDisabled,
    marginTop: 4,
  },
  imagePreviewContainer: {
    alignItems: "center",
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  changeImageButton: {
    backgroundColor: COLORS.primaryLight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  changeImageText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 6,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  saveButton: {
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
  saveButtonDisabled: {
    backgroundColor: COLORS.gray400,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  requiredText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textDisabled,
    textAlign: "center",
    marginTop: 20,
  },
});
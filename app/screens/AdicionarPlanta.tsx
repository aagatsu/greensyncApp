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
import { TYPOGRAPHY } from '@/constants/Fontes';
import { useTheme } from '@/context/ThemeContext';

export default function AdicionarPlanta() {
  const router = useRouter();
  const { colors } = useTheme();

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
      style={[styles.container, { backgroundColor: colors.background }]} // ATUALIZADO
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.box, { backgroundColor: colors.surface }]}> {/* ATUALIZADO */}
          <Text style={[styles.title, { color: colors.primary }]}>Adicionar Nova Planta</Text> {/* ATUALIZADO */}
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Preencha os dados da sua planta</Text> {/* ATUALIZADO */}

          {/* Campo Nome */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Nome da Planta *</Text> {/* ATUALIZADO */}
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.gray50, 
                borderColor: colors.border,
                color: colors.textPrimary 
              }]} // ATUALIZADO
              placeholder="Ex: Manjericão, Hortelã..."
              placeholderTextColor={colors.textDisabled} // ATUALIZADO
              value={nome}
              onChangeText={setNome}
            />
            {nome.trim().length > 0 && (
              <Text style={[styles.charCount, { color: colors.textDisabled }]}>{nome.length}/50</Text> // ATUALIZADO
            )}
          </View>

          {/* Campo Descrição */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Descrição *</Text> {/* ATUALIZADO */}
            <TextInput
              style={[styles.input, styles.textArea, { 
                backgroundColor: colors.gray50, 
                borderColor: colors.border,
                color: colors.textPrimary 
              }]} // ATUALIZADO
              placeholder="Descreva as características da planta..."
              placeholderTextColor={colors.textDisabled} // ATUALIZADO
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {descricao.trim().length > 0 && (
              <Text style={[styles.charCount, { color: colors.textDisabled }]}>{descricao.length}/200</Text> // ATUALIZADO
            )}
          </View>

          {/* Seção de Imagem */}
          <View style={styles.imageSection}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Foto da Planta *</Text> {/* ATUALIZADO */}
            
            {imagem ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imagem }} style={styles.previewImage} />
                <TouchableOpacity 
                  style={[styles.changeImageButton, { backgroundColor: colors.primary }]} // ATUALIZADO
                  onPress={escolherImagem}
                >
                  <FontAwesome5 name="sync" size={16} color={colors.white} /> {/* ATUALIZADO */}
                  <Text style={[styles.changeImageText, { color: colors.white }]}>Trocar Foto</Text> {/* ATUALIZADO */}
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                style={[styles.imageButton, { 
                  backgroundColor: colors.gray50, 
                  borderColor: colors.borderLight 
                }]} // ATUALIZADO
                onPress={escolherImagem}
              >
                <FontAwesome5 name="camera" size={24} color={colors.primaryLight} /> {/* ATUALIZADO */}
                <Text style={[styles.imageButtonText, { color: colors.primaryLight }]}>Selecionar Foto</Text> {/* ATUALIZADO */}
                <Text style={[styles.imageButtonSubtext, { color: colors.textDisabled }]}>Toque para escolher uma imagem</Text> {/* ATUALIZADO */}
              </TouchableOpacity>
            )}
          </View>

          {/* Botões de ação */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[
                styles.saveButton, 
                { backgroundColor: colors.primary }, // ATUALIZADO
                (!nome.trim() || !descricao.trim() || !imagem) && [styles.saveButtonDisabled, { backgroundColor: colors.gray400 }] // ATUALIZADO
              ]} 
              onPress={salvarPlanta}
              disabled={!nome.trim() || !descricao.trim() || !imagem}
            >
              <FontAwesome5 name="check" size={16} color={colors.white} /> {/* ATUALIZADO */}
              <Text style={[styles.saveButtonText, { color: colors.white }]}>Salvar Planta</Text> {/* ATUALIZADO */}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.cancelButton, { 
                borderColor: colors.border 
              }]} // ATUALIZADO
              onPress={() => router.back()}
            >
              <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancelar</Text> {/* ATUALIZADO */}
            </TouchableOpacity>
          </View>

          {/* Indicador de campos obrigatórios */}
          <Text style={[styles.requiredText, { color: colors.textDisabled }]}>* Campos obrigatórios</Text> {/* ATUALIZADO */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
  },
  scrollContent: {
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
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: "right",
    marginTop: 4,
  },
  imageSection: {
    marginBottom: 30,
  },
  imageButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginTop: 8,
  },
  imageButtonSubtext: {
    fontSize: TYPOGRAPHY.fontSize.sm,
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  changeImageText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 6,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  saveButton: {
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
  saveButtonDisabled: {
    // Cor movida para o style inline
  },
  saveButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  requiredText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: "center",
    marginTop: 20,
  },
});
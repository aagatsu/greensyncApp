import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function EditarPlanta() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  
  // CORREÇÃO: Garantir que o id seja uma string
  const { id } = params;
  const plantaId = Array.isArray(id) ? id[0] : id;

  // Dados mockados - depois virá do Firebase
  const plantas = [
    {
      id: '1',
      nome: 'Manjericão',
      descricao: 'Ótimo tempero, precisa de sol moderado e regas frequentes.',
      imagem: require('@/assets/images/manjericao.png'),
      tipo: 'Tempero',
      dificuldade: 'Fácil',
      temperatura: '18-25°C',
      luminosidade: 'Sol pleno',
      rega: 'Diária',
      solo: 'Fértil e bem drenado'
    },
    {
      id: '2',
      nome: 'Hortelã',
      descricao: 'Aroma refrescante, gosta de sombra parcial e solo úmido.',
      imagem: require('@/assets/images/hortela.png'),
      tipo: 'Aromática',
      dificuldade: 'Fácil',
      temperatura: '15-25°C',
      luminosidade: 'Meia-sombra',
      rega: 'Diária',
      solo: 'Úmido e rico em matéria orgânica'
    },
    {
      id: '3',
      nome: 'Alecrim',
      descricao: 'Resistente e ideal para pratos assados. Prefere locais ensolarados.',
      imagem: require('@/assets/images/alecrim.png'),
      tipo: 'Tempero',
      dificuldade: 'Média',
      temperatura: '20-30°C',
      luminosidade: 'Sol pleno',
      rega: 'A cada 2 dias',
      solo: 'Seco e arenoso'
    },
  ];

  // CORREÇÃO: Usar plantaId em vez de id diretamente
  const plantaOriginal = plantas.find(p => p.id === plantaId);

  // Estados para os campos editáveis
  const [nome, setNome] = useState(plantaOriginal?.nome || '');
  const [descricao, setDescricao] = useState(plantaOriginal?.descricao || '');
  const [tipo, setTipo] = useState(plantaOriginal?.tipo || '');
  const [dificuldade, setDificuldade] = useState(plantaOriginal?.dificuldade || '');
  const [temperatura, setTemperatura] = useState(plantaOriginal?.temperatura || '');
  const [luminosidade, setLuminosidade] = useState(plantaOriginal?.luminosidade || '');
  const [rega, setRega] = useState(plantaOriginal?.rega || '');
  const [solo, setSolo] = useState(plantaOriginal?.solo || '');

  // CORREÇÃO: Debug para verificar o ID
  console.log('ID recebido:', plantaId);
  console.log('Planta encontrada:', plantaOriginal);

  if (!plantaOriginal) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={styles.errorContainer}>
          <FontAwesome5 name="exclamation-triangle" size={50} color={colors.secondary} />
          <Text style={[styles.errorTitle, { color: colors.primary }]}>Planta não encontrada</Text>
          <Text style={[styles.errorText, { color: colors.textSecondary }]}>
            ID: {plantaId} - Não foi possível encontrar a planta para edição.
          </Text>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.primary }]} 
            onPress={() => router.back()}
          >
            <FontAwesome5 name="arrow-left" size={16} color={colors.white} />
            <Text style={[styles.backButtonText, { color: colors.white }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleSalvar = () => {
    if (!nome.trim() || !descricao.trim()) {
      Alert.alert('Erro', 'Nome e descrição são obrigatórios.');
      return;
    }

    // Aqui você faria a atualização no Firebase
    Alert.alert(
      'Sucesso',
      'Planta atualizada com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('Navegando de volta...');
            router.back();
          }
        }
      ]
    );
  };

  // CORREÇÃO: Função simplificada para cancelar
  const handleCancelar = () => {
    console.log('Cancelando edição...');
    router.back();
  };

  // CORREÇÃO: Função separada para voltar
  const handleVoltar = () => {
    console.log('Voltando...');
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]} 
          onPress={handleVoltar} // CORREÇÃO: Usar handleVoltar
        >
          <FontAwesome5 name="arrow-left" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.white }]}>Editar Planta</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Imagem e Nome */}
        <View style={styles.imageSection}>
          <Image source={plantaOriginal.imagem} style={[styles.image, { borderColor: colors.greenLight }]} />
          <Text style={[styles.imageLabel, { color: colors.textSecondary }]}>Imagem da planta</Text>
          <TouchableOpacity 
            style={[styles.changeImageButton, { backgroundColor: colors.greenLight }]}
            onPress={() => Alert.alert('Info', 'Funcionalidade em desenvolvimento')}
          >
            <FontAwesome5 name="camera" size={16} color={colors.primary} />
            <Text style={[styles.changeImageText, { color: colors.primary }]}>Alterar Imagem</Text>
          </TouchableOpacity>
        </View>

        {/* Formulário de Edição */}
        <View style={styles.form}>
          {/* Nome */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Nome da Planta *</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }
              ]}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite o nome da planta"
              placeholderTextColor={colors.textDisabled}
            />
          </View>

          {/* Tipo */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Tipo</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }
              ]}
              value={tipo}
              onChangeText={setTipo}
              placeholder="Ex: Tempero, Aromática, Medicinal"
              placeholderTextColor={colors.textDisabled}
            />
          </View>

          {/* Descrição */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Descrição *</Text>
            <TextInput
              style={[
                styles.input, 
                styles.textArea, 
                { 
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }
              ]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva as características da planta..."
              placeholderTextColor={colors.textDisabled}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Informações de Cultivo */}
          <View style={[styles.section, { backgroundColor: colors.surface }]}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="seedling" size={18} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.primary }]}>Informações de Cultivo</Text>
            </View>

            <View style={styles.grid}>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.textPrimary }]}>Dificuldade</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: colors.gray50,
                      borderColor: colors.borderLight,
                      color: colors.textPrimary
                    }
                  ]}
                  value={dificuldade}
                  onChangeText={setDificuldade}
                  placeholder="Ex: Fácil, Médio, Difícil"
                  placeholderTextColor={colors.textDisabled}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.textPrimary }]}>Temperatura Ideal</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: colors.gray50,
                      borderColor: colors.borderLight,
                      color: colors.textPrimary
                    }
                  ]}
                  value={temperatura}
                  onChangeText={setTemperatura}
                  placeholder="Ex: 18-25°C"
                  placeholderTextColor={colors.textDisabled}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.textPrimary }]}>Luminosidade</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: colors.gray50,
                      borderColor: colors.borderLight,
                      color: colors.textPrimary
                    }
                  ]}
                  value={luminosidade}
                  onChangeText={setLuminosidade}
                  placeholder="Ex: Sol pleno, Meia-sombra"
                  placeholderTextColor={colors.textDisabled}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.textPrimary }]}>Frequência de Rega</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: colors.gray50,
                      borderColor: colors.borderLight,
                      color: colors.textPrimary
                    }
                  ]}
                  value={rega}
                  onChangeText={setRega}
                  placeholder="Ex: Diária, A cada 2 dias"
                  placeholderTextColor={colors.textDisabled}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.textPrimary }]}>Tipo de Solo</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.gray50,
                    borderColor: colors.borderLight,
                    color: colors.textPrimary
                  }
                ]}
                value={solo}
                onChangeText={setSolo}
                placeholder="Ex: Fértil e bem drenado"
                placeholderTextColor={colors.textDisabled}
              />
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={[
                styles.cancelButton, 
                { 
                  backgroundColor: colors.surface,
                  borderColor: colors.border 
                }
              ]} 
              onPress={handleCancelar}
            >
              <FontAwesome5 name="times" size={16} color={colors.primary} />
              <Text style={[styles.cancelButtonText, { color: colors.primary }]}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.saveButton, { backgroundColor: colors.primary }]} 
              onPress={handleSalvar}
            >
              <FontAwesome5 name="check" size={16} color={colors.white} />
              <Text style={[styles.saveButtonText, { color: colors.white }]}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ... (os styles permanecem iguais)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
    borderWidth: 3,
  },
  imageLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: 8,
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeImageText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  form: {
    marginBottom: 30,
  },
  section: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  saveButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: TYPOGRAPHY.lineHeight.normal * TYPOGRAPHY.fontSize.lg,
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
});
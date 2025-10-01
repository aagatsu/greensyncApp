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
  Image
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function EditarPlanta() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { id } = params;

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

  const plantaOriginal = plantas.find(p => p.id === id);

  // Estados para os campos editáveis
  const [nome, setNome] = useState(plantaOriginal?.nome || '');
  const [descricao, setDescricao] = useState(plantaOriginal?.descricao || '');
  const [tipo, setTipo] = useState(plantaOriginal?.tipo || '');
  const [dificuldade, setDificuldade] = useState(plantaOriginal?.dificuldade || '');
  const [temperatura, setTemperatura] = useState(plantaOriginal?.temperatura || '');
  const [luminosidade, setLuminosidade] = useState(plantaOriginal?.luminosidade || '');
  const [rega, setRega] = useState(plantaOriginal?.rega || '');
  const [solo, setSolo] = useState(plantaOriginal?.solo || '');

  if (!plantaOriginal) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <View style={styles.errorContainer}>
          <FontAwesome5 name="exclamation-triangle" size={50} color={COLORS.secondary} />
          <Text style={styles.errorTitle}>Planta não encontrada</Text>
          <Text style={styles.errorText}>Não foi possível encontrar a planta para edição.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={16} color={COLORS.white} />
            <Text style={styles.backButtonText}>Voltar</Text>
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
          onPress: () => router.back()
        }
      ]
    );
  };

  const handleCancelar = () => {
    Alert.alert(
      'Cancelar Edição',
      'Tem certeza que deseja cancelar? Todas as alterações serão perdidas.',
      [
        {
          text: 'Continuar Editando',
          style: 'cancel'
        },
        {
          text: 'Cancelar',
          onPress: () => router.back()
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleCancelar}>
          <FontAwesome5 name="arrow-left" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Planta</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Imagem e Nome */}
        <View style={styles.imageSection}>
          <Image source={plantaOriginal.imagem} style={styles.image} />
          <Text style={styles.imageLabel}>Imagem da planta</Text>
          <TouchableOpacity style={styles.changeImageButton}>
            <FontAwesome5 name="camera" size={16} color={COLORS.primary} />
            <Text style={styles.changeImageText}>Alterar Imagem</Text>
          </TouchableOpacity>
        </View>

        {/* Formulário de Edição */}
        <View style={styles.form}>
          {/* Nome */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome da Planta *</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite o nome da planta"
              placeholderTextColor={COLORS.textDisabled}
            />
          </View>

          {/* Tipo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo</Text>
            <TextInput
              style={styles.input}
              value={tipo}
              onChangeText={setTipo}
              placeholder="Ex: Tempero, Aromática, Medicinal"
              placeholderTextColor={COLORS.textDisabled}
            />
          </View>

          {/* Descrição */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva as características da planta..."
              placeholderTextColor={COLORS.textDisabled}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Informações de Cultivo */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="seedling" size={18} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Informações de Cultivo</Text>
            </View>

            <View style={styles.grid}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dificuldade</Text>
                <TextInput
                  style={styles.input}
                  value={dificuldade}
                  onChangeText={setDificuldade}
                  placeholder="Ex: Fácil, Médio, Difícil"
                  placeholderTextColor={COLORS.textDisabled}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Temperatura Ideal</Text>
                <TextInput
                  style={styles.input}
                  value={temperatura}
                  onChangeText={setTemperatura}
                  placeholder="Ex: 18-25°C"
                  placeholderTextColor={COLORS.textDisabled}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Luminosidade</Text>
                <TextInput
                  style={styles.input}
                  value={luminosidade}
                  onChangeText={setLuminosidade}
                  placeholder="Ex: Sol pleno, Meia-sombra"
                  placeholderTextColor={COLORS.textDisabled}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Frequência de Rega</Text>
                <TextInput
                  style={styles.input}
                  value={rega}
                  onChangeText={setRega}
                  placeholder="Ex: Diária, A cada 2 dias"
                  placeholderTextColor={COLORS.textDisabled}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo de Solo</Text>
              <TextInput
                style={styles.input}
                value={solo}
                onChangeText={setSolo}
                placeholder="Ex: Fértil e bem drenado"
                placeholderTextColor={COLORS.textDisabled}
              />
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
              <FontAwesome5 name="times" size={16} color={COLORS.primary} />
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
              <FontAwesome5 name="check" size={16} color={COLORS.white} />
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
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
    borderColor: COLORS.greenLight,
  },
  imageLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.greenLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeImageText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  form: {
    marginBottom: 30,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: COLORS.black,
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
    color: COLORS.primary,
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textPrimary,
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
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  errorTitle: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: TYPOGRAPHY.lineHeight.normal * TYPOGRAPHY.fontSize.lg,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
});
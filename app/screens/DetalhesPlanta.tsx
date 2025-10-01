import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  StatusBar 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function DetalhesPlanta() {
  const params = useLocalSearchParams(); 
  const router = useRouter();

  // Captura o parâmetro "id"
  const id = params.id;

  const handleEditar = () => {
    router.push('/screens/EditarPlanta');
  };

  // Dados das plantas - depois pode vir do Firebase
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
      curiosidade: 'Afasta mosquitos naturalmente'
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
      curiosidade: 'Ideal para chás e drinks'
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
      curiosidade: 'Pode atingir até 1,5m de altura'
    },
  ];

  const planta = plantas.find(p => p.id === id);

  if (!planta) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <View style={styles.errorContainer}>
          <FontAwesome5 name="exclamation-triangle" size={50} color={COLORS.secondary} />
          <Text style={styles.errorTitle}>Planta não encontrada</Text>
          <Text style={styles.errorText}>A planta que você está procurando não existe.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={16} color={COLORS.white} />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Planta</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Imagem e Nome */}
        <View style={styles.imageSection}>
          <Image source={planta.imagem} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{planta.nome}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{planta.tipo}</Text>
            </View>
          </View>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="file-alt" size={18} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Descrição</Text>
          </View>
          <Text style={styles.description}>{planta.descricao}</Text>
        </View>

        {/* Informações de Cultivo */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="seedling" size={18} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Informações de Cultivo</Text>
          </View>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <FontAwesome5 name="thermometer-half" size={16} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Temperatura</Text>
              <Text style={styles.infoValue}>{planta.temperatura}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <FontAwesome5 name="sun" size={16} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Luminosidade</Text>
              <Text style={styles.infoValue}>{planta.luminosidade}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <FontAwesome5 name="tint" size={16} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Rega</Text>
              <Text style={styles.infoValue}>{planta.rega}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <FontAwesome5 name="chart-line" size={16} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Dificuldade</Text>
              <Text style={styles.infoValue}>{planta.dificuldade}</Text>
            </View>
          </View>
        </View>

        {/* Curiosidade */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="lightbulb" size={18} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Curiosidade</Text>
          </View>
          <View style={styles.curiosityCard}>
            <Text style={styles.curiosityText}>{planta.curiosidade}</Text>
          </View>
        </View>

        {/* Ações */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEditar}>
            <FontAwesome5 name="edit" size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Editar Planta</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryActionButton}>
            <FontAwesome5 name="trash" size={16} color={COLORS.primary} />
            <Text style={styles.secondaryActionButtonText}>Remover</Text>
          </TouchableOpacity>
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
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: COLORS.greenLight,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titleContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  tag: {
    backgroundColor: COLORS.greenLight,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    marginLeft: 8,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.lg,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  curiosityCard: {
    backgroundColor: COLORS.goldLight,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  curiosityText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textPrimary,
    fontStyle: 'italic',
    lineHeight: TYPOGRAPHY.lineHeight.normal * TYPOGRAPHY.fontSize.sm,
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 8,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  secondaryActionButton: {
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
    marginLeft: 8,
  },
  secondaryActionButtonText: {
    color: COLORS.primary,
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
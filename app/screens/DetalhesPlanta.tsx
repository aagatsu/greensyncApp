import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function DetalhesPlanta() {
  const params = useLocalSearchParams(); 
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK

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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={styles.errorContainer}>
          <FontAwesome5 name="exclamation-triangle" size={50} color={colors.secondary} />
          <Text style={[styles.errorTitle, { color: colors.primary }]}>Planta não encontrada</Text>
          <Text style={[styles.errorText, { color: colors.textSecondary }]}>
            A planta que você está procurando não existe.
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
          onPress={() => router.back()}
        >
          <FontAwesome5 name="arrow-left" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.white }]}>Detalhes da Planta</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Imagem e Nome */}
        <View style={styles.imageSection}>
          <Image 
            source={planta.imagem} 
            style={[styles.image, { borderColor: colors.greenLight }]} 
          />
          <View style={styles.titleContainer}>
            <Text style={[styles.name, { color: colors.primary }]}>{planta.nome}</Text>
            <View style={[styles.tag, { backgroundColor: colors.greenLight }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>{planta.tipo}</Text>
            </View>
          </View>
        </View>

        {/* Descrição */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="file-alt" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>Descrição</Text>
          </View>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {planta.descricao}
          </Text>
        </View>

        {/* Informações de Cultivo */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="seedling" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>Informações de Cultivo</Text>
          </View>
          
          <View style={styles.infoGrid}>
            <View style={[styles.infoItem, { backgroundColor: colors.gray50 }]}>
              <FontAwesome5 name="thermometer-half" size={16} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Temperatura</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{planta.temperatura}</Text>
            </View>
            
            <View style={[styles.infoItem, { backgroundColor: colors.gray50 }]}>
              <FontAwesome5 name="sun" size={16} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Luminosidade</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{planta.luminosidade}</Text>
            </View>
            
            <View style={[styles.infoItem, { backgroundColor: colors.gray50 }]}>
              <FontAwesome5 name="tint" size={16} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Rega</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{planta.rega}</Text>
            </View>
            
            <View style={[styles.infoItem, { backgroundColor: colors.gray50 }]}>
              <FontAwesome5 name="chart-line" size={16} color={colors.primary} />
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Dificuldade</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{planta.dificuldade}</Text>
            </View>
          </View>
        </View>

        {/* Curiosidade */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="lightbulb" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>Curiosidade</Text>
          </View>
          <View style={[styles.curiosityCard, { 
            backgroundColor: colors.goldLight,
            borderLeftColor: colors.secondary 
          }]}>
            <Text style={[styles.curiosityText, { color: colors.textPrimary }]}>
              {planta.curiosidade}
            </Text>
          </View>
        </View>

        {/* Ações */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]} 
            onPress={handleEditar}
          >
            <FontAwesome5 name="edit" size={16} color={colors.white} />
            <Text style={[styles.actionButtonText, { color: colors.white }]}>Editar Planta</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[
            styles.secondaryActionButton, { 
              backgroundColor: colors.surface,
              borderColor: colors.border 
            }
          ]}>
            <FontAwesome5 name="trash" size={16} color={colors.primary} />
            <Text style={[styles.secondaryActionButtonText, { color: colors.primary }]}>
              Remover
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    borderWidth: 4,
    elevation: 4,
    shadowColor: '#000',
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
    marginBottom: 8,
    textAlign: 'center',
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.lg,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  curiosityCard: {
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
  },
  curiosityText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
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
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
  },
  secondaryActionButtonText: {
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
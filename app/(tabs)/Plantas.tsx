// screens/Plantas.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { TYPOGRAPHY } from '@/constants/Fontes';
import { usePlantas, PlantaCatalogo } from '@/hooks/usePlantas';

export default function Plantas() {
  const router = useRouter();
  const { colors } = useTheme();
  const { plantasCatalogo, loading, error } = usePlantas();
  const [busca, setBusca] = useState('');

  // Função para filtrar plantas
  const plantasFiltradas = plantasCatalogo.filter(planta =>
    planta.nome.toLowerCase().includes(busca.toLowerCase()) ||
    planta.especie.toLowerCase().includes(busca.toLowerCase())
  );

  // Imagem padrão para plantas
  const getImagemPlanta = (planta: PlantaCatalogo) => {
    // Você pode usar imagens locais baseadas no nome da planta
    switch (planta.nome.toLowerCase()) {
      case 'alface':
        return require('@/assets/images/alface.png');
      case 'rúcula':
        return require('@/assets/images/rucula.png');
      case 'tomate-cereja':
        return require('@/assets/images/tomate.png');
      case 'manjericão':
        return require('@/assets/images/manjericao.png');
      case 'cenoura':
        return require('@/assets/images/cenoura.png');
      default:
        return require('@/assets/images/planta-default.png');
    }
  };

  // Formatar texto para exibição
  const formatarTexto = (texto: string, maxLength: number = 50) => {
    if (texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength) + '...';
  };

  const renderItemPlanta = ({ item }: { item: PlantaCatalogo }) => (
    <TouchableOpacity
      style={[
        styles.card, 
        { 
          backgroundColor: colors.gray50,
          borderLeftColor: colors.primary 
        }
      ]}
      onPress={() => router.push(`/screens/DetalhesPlanta?id=${item.id}&tipo=catalogo`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          <Image 
            source={getImagemPlanta(item)} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.cardText, { color: colors.textPrimary }]}>
            {item.nome}
          </Text>
          <Text style={[styles.especieText, { color: colors.textSecondary }]}>
            {item.especie}
          </Text>
          <Text style={[styles.descricaoText, { color: colors.textDisabled }]}>
            {formatarTexto(item.descricao)}
          </Text>
        </View>
      </View>
      
      <View style={styles.requisitosContainer}>
        <View style={styles.requisitoItem}>
          <FontAwesome5 name="thermometer-half" size={12} color={colors.textSecondary} />
          <Text style={[styles.requisitoText, { color: colors.textSecondary }]}>
            {item.requisitos.temperaturaIdeal}
          </Text>
        </View>
        <View style={styles.requisitoItem}>
          <FontAwesome5 name="tint" size={12} color={colors.textSecondary} />
          <Text style={[styles.requisitoText, { color: colors.textSecondary }]}>
            {item.requisitos.umidadeSolo}
          </Text>
        </View>
        <View style={styles.requisitoItem}>
          <FontAwesome5 name="sun" size={12} color={colors.textSecondary} />
          <Text style={[styles.requisitoText, { color: colors.textSecondary }]}>
            {item.requisitos.nivelLuz}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.tempoInfo}>
          <FontAwesome5 name="clock" size={12} color={colors.textSecondary} />
          <Text style={[styles.tempoText, { color: colors.textSecondary }]}>
            Colheita: {item.cicloVida.tempoColheita}
          </Text>
        </View>
        <View style={styles.detalhesContainer}>
          <Text style={[styles.detalhesText, { color: colors.primary }]}>
            Ver detalhes
          </Text>
          <FontAwesome5 name="chevron-right" size={12} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Carregando catálogo de plantas...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <FontAwesome5 name="exclamation-triangle" size={48} color={colors.error} />
          <Text style={[styles.errorText, { color: colors.textPrimary }]}>
            Erro ao carregar plantas
          </Text>
          <Text style={[styles.errorSubtext, { color: colors.textSecondary }]}>
            {error}
          </Text>
          <TouchableOpacity 
            style={[styles.botaoRecarregar, { backgroundColor: colors.primary }]}
            onPress={() => window.location.reload()}
          >
            <Text style={[styles.botaoRecarregarTexto, { color: colors.white }]}>
              Tentar Novamente
            </Text>
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
      <View style={[styles.box, { backgroundColor: colors.surface }]}>
        {/* Título */}
        <Text style={[styles.title, { color: colors.primary }]}>Catálogo de Plantas</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Explore as plantas disponíveis para cultivo
        </Text>

        {/* Campo de busca */}
        <TextInput
          style={[
            styles.searchInput, 
            { 
              backgroundColor: colors.gray50,
              borderColor: colors.border,
              color: colors.textPrimary
            }
          ]}
          placeholder="Buscar planta..."
          placeholderTextColor={colors.textDisabled}
          value={busca}
          onChangeText={setBusca}
        />

        {/* Contador de plantas */}
        <View style={[styles.contadorContainer, { backgroundColor: colors.greenLight }]}>
          <Text style={[styles.contadorText, { color: colors.primary }]}>
            {plantasFiltradas.length} {plantasFiltradas.length === 1 ? 'planta encontrada' : 'plantas encontradas'}
          </Text>
          <Text style={[styles.contadorSubtext, { color: colors.textSecondary }]}>
            Total no catálogo: {plantasCatalogo.length} plantas
          </Text>
        </View>

        {/* Lista de plantas */}
        <FlatList
          data={plantasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={renderItemPlanta}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="seedling" size={48} color={colors.border} />
              <Text style={[styles.emptyText, { color: colors.textDisabled }]}>
                {busca ? 'Nenhuma planta encontrada' : 'Nenhuma planta no catálogo'}
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.border }]}>
                {busca ? 'Tente buscar com outros termos' : 'Adicione plantas ao catálogo'}
              </Text>
            </View>
          }
        />

        {/* Botão para adicionar ao meu jardim (opcional) */}
        <TouchableOpacity
          style={[styles.botaoAdicionar, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/screens/AdicionarPlanta')}
        >
          <FontAwesome5 name="plus" size={16} color={colors.white} />
          <Text style={[styles.botaoAdicionarTexto, { color: colors.white }]}>
            Adicionar ao Meu Jardim
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  box: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
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
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
  contadorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  contadorText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textAlign: "center",
  },
  contadorSubtext: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: "center",
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: TYPOGRAPHY.fontSize.base,
    textAlign: 'center',
    marginBottom: 20,
  },
  botaoRecarregar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botaoRecarregarTexto: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  cardText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 4,
  },
  especieText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  descricaoText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    lineHeight: 16,
  },
  requisitosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  requisitoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  requisitoText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tempoInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  tempoText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginLeft: 4,
  },
  detalhesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detalhesText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.fontSize.base,
    textAlign: "center",
  },
  botaoAdicionar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    elevation: 2,
  },
  botaoAdicionarTexto: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
});
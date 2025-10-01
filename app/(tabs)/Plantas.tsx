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
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function Plantas() {
  const router = useRouter();

  // Estado inicial das plantas
  const [plantas, setPlantas] = useState([
    { id: '1', nome: 'Manjericão', imagem: require('../../assets/images/manjericao.png') },
    { id: '2', nome: 'Hortelã', imagem: require('../../assets/images/hortela.png') },
    { id: '3', nome: 'Alecrim', imagem: require('../../assets/images/alecrim.png') },
  ]);

  const [busca, setBusca] = useState('');

  // Função para filtrar plantas
  const plantasFiltradas = plantas.filter(planta =>
    planta.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.box}>
        {/* Título */}
        <Text style={styles.title}>Minhas Plantas</Text>
        <Text style={styles.subtitle}>Gerencie suas plantas cadastradas</Text>

        {/* Campo de busca */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar planta..."
          placeholderTextColor={COLORS.textDisabled}
          value={busca}
          onChangeText={setBusca}
        />

        {/* Contador de plantas */}
        <View style={styles.contadorContainer}>
          <Text style={styles.contadorText}>
            {plantasFiltradas.length} {plantasFiltradas.length === 1 ? 'planta encontrada' : 'plantas encontradas'}
          </Text>
        </View>

        {/* Lista de plantas */}
        <FlatList
          data={plantasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/screens/DetalhesPlanta?id=${item.id}`)}
            >
              <View style={styles.imageContainer}>
                <Image source={item.imagem} style={styles.image} />
              </View>
              <Text style={styles.cardText}>{item.nome}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.detalhesText}>Ver detalhes</Text>
                <FontAwesome5 name="chevron-right" size={12} color={COLORS.primary} />
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="seedling" size={48} color={COLORS.border} />
              <Text style={styles.emptyText}>Nenhuma planta encontrada</Text>
              <Text style={styles.emptySubtext}>
                {busca ? 'Tente buscar com outros termos' : 'Adicione sua primeira planta'}
              </Text>
            </View>
          }
        />

        {/* Botão flutuante para adicionar planta */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/screens/AdicionarPlanta')}
        >
          <FontAwesome5 name="plus" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  box: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
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
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: COLORS.gray50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textPrimary,
  },
  contadorContainer: {
    backgroundColor: COLORS.greenLight,
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: "center",
  },
  contadorText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detalhesText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textDisabled,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.border,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
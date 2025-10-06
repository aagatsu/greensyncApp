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
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function Plantas() {
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK

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
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.box, { backgroundColor: colors.surface }]}>
        {/* Título */}
        <Text style={[styles.title, { color: colors.primary }]}>Minhas Plantas</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Gerencie suas plantas cadastradas</Text>

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
        </View>

        {/* Lista de plantas */}
        <FlatList
          data={plantasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card, 
                { 
                  backgroundColor: colors.gray50,
                  borderLeftColor: colors.primary 
                }
              ]}
              onPress={() => router.push(`/screens/DetalhesPlanta?id=${item.id}`)}
            >
              <View style={styles.imageContainer}>
                <Image source={item.imagem} style={styles.image} />
              </View>
              <Text style={[styles.cardText, { color: colors.textPrimary }]}>{item.nome}</Text>
              <View style={styles.cardFooter}>
                <Text style={[styles.detalhesText, { color: colors.primary }]}>Ver detalhes</Text>
                <FontAwesome5 name="chevron-right" size={12} color={colors.primary} />
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="seedling" size={48} color={colors.border} />
              <Text style={[styles.emptyText, { color: colors.textDisabled }]}>Nenhuma planta encontrada</Text>
              <Text style={[styles.emptySubtext, { color: colors.border }]}>
                {busca ? 'Tente buscar com outros termos' : 'Adicione sua primeira planta'}
              </Text>
            </View>
          }
        />

        {/* Botão flutuante para adicionar planta */}
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/screens/AdicionarPlanta')}
        >
          <FontAwesome5 name="plus" size={24} color={colors.white} />
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
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: "center",
  },
  contadorText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
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
    textAlign: "center",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detalhesText: {
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
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.fontSize.base,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
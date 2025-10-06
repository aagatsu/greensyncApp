import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { TYPOGRAPHY } from "@/constants/Fontes";

export default function Estufas() {
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK

  // Dados de exemplo — futuramente isso virá do Firebase
  const [estufas, setEstufas] = useState([
    {
      id: "1",
      nome: "Estufa de Hortelã",
      local: "Varanda",
      imagem: require("@/assets/images/estufa.png"),
      plantas: 3,
      temperatura: "25°C",
      umidade: "65%"
    },
    {
      id: "2",
      nome: "Estufa de Manjericão",
      local: "Quintal",
      imagem: require("@/assets/images/estufa.png"),
      plantas: 5,
      temperatura: "23°C",
      umidade: "70%"
    },
    {
      id: "3",
      nome: "Estufa de Alecrim",
      local: "Cozinha",
      imagem: require("@/assets/images/estufa.png"),
      plantas: 2,
      temperatura: "26°C",
      umidade: "60%"
    },
  ]);

  const abrirDetalhes = (id: string) => {
    router.push({ pathname: "/screens/DetalhesEstufa", params: { id } });
  };

  const adicionarEstufa = () => {
    router.push('/screens/DetalhesEstufa');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.box, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.primary }]}>Minhas Estufas</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Gerencie suas estufas cadastradas</Text>

        {/* Contador de estufas */}
        <View style={[styles.contadorContainer, { backgroundColor: colors.greenLight }]}>
          <Text style={[styles.contadorText, { color: colors.primary }]}>
            {estufas.length} {estufas.length === 1 ? 'estufa cadastrada' : 'estufas cadastradas'}
          </Text>
        </View>

        <FlatList
          data={estufas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { 
                backgroundColor: colors.gray50,
                borderLeftColor: colors.success 
              }]}
              onPress={() => abrirDetalhes(item.id)}
            >
              <View style={styles.cardHeader}>
                <Image source={item.imagem} style={styles.image} />
                <View style={styles.info}>
                  <Text style={[styles.nome, { color: colors.textPrimary }]}>{item.nome}</Text>
                  <Text style={[styles.local, { color: colors.textSecondary }]}>
                    <FontAwesome5 name="map-marker-alt" size={TYPOGRAPHY.fontSize.sm} color={colors.textSecondary} /> {item.local}
                  </Text>
                </View>
                <FontAwesome5 name="chevron-right" size={TYPOGRAPHY.fontSize.lg} color={colors.primaryLight} />
              </View>
              
              <View style={styles.cardFooter}>
                <View style={[styles.metrica, { backgroundColor: colors.surface }]}>
                  <FontAwesome5 name="seedling" size={TYPOGRAPHY.fontSize.sm} color={colors.success} />
                  <Text style={[styles.metricaTexto, { color: colors.textPrimary }]}>{item.plantas} plantas</Text>
                </View>
                <View style={[styles.metrica, { backgroundColor: colors.surface }]}>
                  <FontAwesome5 name="thermometer-half" size={TYPOGRAPHY.fontSize.sm} color={colors.error} />
                  <Text style={[styles.metricaTexto, { color: colors.textPrimary }]}>{item.temperatura}</Text>
                </View>
                <View style={[styles.metrica, { backgroundColor: colors.surface }]}>
                  <FontAwesome5 name="tint" size={TYPOGRAPHY.fontSize.sm} color={colors.info} />
                  <Text style={[styles.metricaTexto, { color: colors.textPrimary }]}>{item.umidade}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <FontAwesome5 name="warehouse" size={48} color={colors.gray400} />
              <Text style={[styles.emptyText, { color: colors.textDisabled }]}>Nenhuma estufa cadastrada</Text>
              <Text style={[styles.emptySubtext, { color: colors.gray400 }]}>Adicione sua primeira estufa</Text>
            </View>
          }
        />

        {/* Botão flutuante para adicionar estufa */}
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/screens/AdicionarEstufa')}
        >
          <FontAwesome5 name="plus" size={TYPOGRAPHY.fontSize['3xl']} color={colors.white} />
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 4,
  },
  local: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metrica: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  metricaTexto: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginLeft: 4,
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
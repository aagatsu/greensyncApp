import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes';

// Tipo para os dados de cada sensor
type SensorCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  status?: "ok" | "alert" | "off";
  icon: string;
};

// Componente para exibir cada sensor
const SensorCard: React.FC<SensorCardProps> = ({ label, value, unit, status, icon }) => {
  const { colors } = useTheme(); // NOVO HOOK

  // Define a cor do status dinamicamente
  const getStatusColor = () => {
    switch (status) {
      case "ok":
        return colors.success;
      case "alert":
        return colors.warning;
      case "off":
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "ok":
        return "Normal";
      case "alert":
        return "Atenção";
      case "off":
        return "Desligado";
      default:
        return "Indefinido";
    }
  };

  const getIconColor = () => {
    switch (status) {
      case "ok":
        return colors.success;
      case "alert":
        return colors.warning;
      case "off":
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.gray50 }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
          <FontAwesome5 name={icon} size={20} color={getIconColor()} />
        </View>
        <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>{label}</Text>
      </View>
      
      <View style={styles.cardValueContainer}>
        <Text style={[styles.cardValue, { color: colors.primary }]}>
          {value}
          {unit && <Text style={[styles.cardUnit, { color: colors.textSecondary }]}> {unit}</Text>}
        </Text>
      </View>

      {status && (
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
          <Text style={[styles.cardStatus, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      )}
    </View>
  );
};

export default function DetalhesEstufa() {
  const { id } = useLocalSearchParams(); // Pegando o ID da estufa selecionada
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK

  // 🔹 Dados de exemplo (depois será integrado com Firebase)
  const estufaInfo = {
    nome: "Estufa de Hortelã",
    local: "Varanda",
    plantas: 3,
    sensores: [
      { label: "Temperatura", value: 24.5, unit: "°C", status: "ok", icon: "thermometer-half" },
      { label: "Umidade do Ar", value: 65, unit: "%", status: "ok", icon: "cloud" },
      { label: "Umidade do Solo", value: 42, unit: "%", status: "alert", icon: "tint" },
      { label: "Iluminação", value: "Ligada", status: "ok", icon: "lightbulb" },
      { label: "Ventilação", value: "Desligada", status: "off", icon: "fan" },
      { label: "pH do Solo", value: 6.8, unit: "pH", status: "ok", icon: "flask" },
    ]
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.box, { backgroundColor: colors.surface }]}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={[styles.backButton, { borderColor: colors.border }]} 
              onPress={() => router.back()}
            >
              <FontAwesome5 name="arrow-left" size={20} color={colors.primary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.primary }]}>Detalhes da Estufa</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Informações da Estufa */}
          <View style={[styles.estufaInfo, { backgroundColor: colors.gray50 }]}>
            <View style={styles.estufaHeader}>
              <FontAwesome5 name="warehouse" size={24} color={colors.primary} />
              <Text style={[styles.estufaNome, { color: colors.textPrimary }]}>{estufaInfo.nome}</Text>
            </View>
            <View style={styles.estufaDetails}>
              <View style={styles.detailItem}>
                <FontAwesome5 name="map-marker-alt" size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{estufaInfo.local}</Text>
              </View>
              <View style={styles.detailItem}>
                <FontAwesome5 name="seedling" size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{estufaInfo.plantas} plantas</Text>
              </View>
              <View style={styles.detailItem}>
                <FontAwesome5 name="hashtag" size={14} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>ID: {id}</Text>
              </View>
            </View>
          </View>

          {/* Título dos Sensores */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Sensores e Controles</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Status em tempo real</Text>
          </View>

          {/* Grid de Sensores */}
          <View style={styles.sensorsGrid}>
            {estufaInfo.sensores.map((sensor, index) => (
              <SensorCard
                key={index}
                label={sensor.label}
                value={sensor.value}
                unit={sensor.unit}
                status={sensor.status as "ok" | "alert" | "off"}
                icon={sensor.icon}
              />
            ))}
          </View>

          {/* Ações Rápidas */}
          <View style={styles.actionsSection}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Ações Rápidas</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
                <FontAwesome5 name="cog" size={20} color={colors.white} />
                <Text style={[styles.actionText, { color: colors.white }]}>Configurar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
                <FontAwesome5 name="chart-line" size={20} color={colors.white} />
                <Text style={[styles.actionText, { color: colors.white }]}>Relatório</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
                <FontAwesome5 name="history" size={20} color={colors.white} />
                <Text style={[styles.actionText, { color: colors.white }]}>Histórico</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  box: {
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    width: 40,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  estufaInfo: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  estufaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  estufaNome: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 12,
  },
  estufaDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    minWidth: "48%",
  },
  detailText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginLeft: 6,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.xs,
  },
  sensorsGrid: {
    marginBottom: 24,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  cardLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  cardValueContainer: {
    marginBottom: 8,
  },
  cardValue: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  cardUnit: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.normal,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  cardStatus: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  actionsSection: {
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 6,
  },
});
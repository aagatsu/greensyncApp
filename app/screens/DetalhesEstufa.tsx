import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
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
  // Define a cor do status dinamicamente
  const getStatusColor = () => {
    switch (status) {
      case "ok":
        return COLORS.success;
      case "alert":
        return COLORS.warning;
      case "off":
        return COLORS.error;
      default:
        return COLORS.textSecondary;
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
        return COLORS.success;
      case "alert":
        return COLORS.warning;
      case "off":
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={icon} size={20} color={getIconColor()} />
        </View>
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
      
      <View style={styles.cardValueContainer}>
        <Text style={styles.cardValue}>
          {value}
          {unit && <Text style={styles.cardUnit}> {unit}</Text>}
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Detalhes da Estufa</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Informações da Estufa */}
        <View style={styles.estufaInfo}>
          <View style={styles.estufaHeader}>
            <FontAwesome5 name="warehouse" size={24} color={COLORS.primary} />
            <Text style={styles.estufaNome}>{estufaInfo.nome}</Text>
          </View>
          <View style={styles.estufaDetails}>
            <View style={styles.detailItem}>
              <FontAwesome5 name="map-marker-alt" size={14} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>{estufaInfo.local}</Text>
            </View>
            <View style={styles.detailItem}>
              <FontAwesome5 name="seedling" size={14} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>{estufaInfo.plantas} plantas</Text>
            </View>
            <View style={styles.detailItem}>
              <FontAwesome5 name="hashtag" size={14} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>ID: {id}</Text>
            </View>
          </View>
        </View>

        {/* Título dos Sensores */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sensores e Controles</Text>
          <Text style={styles.sectionSubtitle}>Status em tempo real</Text>
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
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="cog" size={20} color={COLORS.white} />
              <Text style={styles.actionText}>Configurar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="chart-line" size={20} color={COLORS.white} />
              <Text style={styles.actionText}>Relatório</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="history" size={20} color={COLORS.white} />
              <Text style={styles.actionText}>Histórico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  box: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: COLORS.black,
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
    borderColor: COLORS.border,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  estufaInfo: {
    backgroundColor: COLORS.gray50,
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
    color: COLORS.textPrimary,
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
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
  },
  sensorsGrid: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.border,
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
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 1,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  cardLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  cardValueContainer: {
    marginBottom: 8,
  },
  cardValue: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
  },
  cardUnit: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.normal,
    color: COLORS.textSecondary,
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
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 6,
  },
});
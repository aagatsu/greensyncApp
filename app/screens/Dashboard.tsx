import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

// Interfaces para tipagem
interface MetricCard {
  id: string;
  titulo: string;
  valor: string | number;
  variacao: number;
  icone: string;
  cor: string;
  unidade?: string;
}

// Definir o tipo para saúde como tipo literal
type SaudeTipo = 'excelente' | 'boa' | 'atenção' | 'critica';

interface PlantaStatus {
  id: string;
  nome: string;
  saude: SaudeTipo;
  proximoCuidado: string;
  ultimaRega: string;
  icone: string;
}

interface Alerta {
  id: string;
  tipo: 'info' | 'aviso' | 'urgente';
  mensagem: string;
  tempo: string;
  lido: boolean;
}

// COMPONENTE ALERTA CARD DEFINIDO PRIMEIRO
const AlertaCard: React.FC<{ alerta: Alerta; onPress: () => void }> = ({ alerta, onPress }) => {
  const getAlertaColor = (tipo: string) => {
    switch (tipo) {
      case 'urgente': return COLORS.error;
      case 'aviso': return COLORS.warning;
      case 'info': return COLORS.info;
      default: return COLORS.textSecondary;
    }
  };

  const getAlertaIcon = (tipo: string) => {
    switch (tipo) {
      case 'urgente': return 'exclamation-triangle';
      case 'aviso': return 'exclamation-circle';
      case 'info': return 'info-circle';
      default: return 'info-circle';
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.alertaCard,
        !alerta.lido && styles.alertaNaoLido
      ]}
      onPress={onPress}
    >
      <View style={styles.alertaHeader}>
        <View style={styles.alertaIcon}>
          <FontAwesome5 
            name={getAlertaIcon(alerta.tipo)} 
            size={16} 
            color={getAlertaColor(alerta.tipo)} 
          />
        </View>
        <View style={styles.alertaContent}>
          <Text style={styles.alertaMensagem}>{alerta.mensagem}</Text>
          <Text style={styles.alertaTempo}>{alerta.tempo}</Text>
        </View>
        {!alerta.lido && <View style={[styles.alertaDot, { backgroundColor: getAlertaColor(alerta.tipo) }]} />}
      </View>
    </TouchableOpacity>
  );
};

// Dados para diferentes períodos
const dadosPorPeriodo: Record<'hoje' | 'semana' | 'mes', {
  metricas: MetricCard[];
  plantasStatus: PlantaStatus[];
  dica: string;
}> = {
  hoje: {
    metricas: [
      {
        id: '1',
        titulo: 'Plantas Saudáveis',
        valor: 12,
        variacao: 8,
        icone: 'seedling',
        cor: COLORS.success
      },
      {
        id: '2',
        titulo: 'Temperatura Média',
        valor: 24.5,
        variacao: -2,
        icone: 'thermometer-half',
        cor: COLORS.error,
        unidade: '°C'
      },
      {
        id: '3',
        titulo: 'Umidade Ideal',
        valor: 78,
        variacao: 12,
        icone: 'tint',
        cor: COLORS.info,
        unidade: '%'
      },
      {
        id: '4',
        titulo: 'Economia de Água',
        valor: 35,
        variacao: 15,
        icone: 'leaf',
        cor: COLORS.primary,
        unidade: '%'
      }
    ],
    plantasStatus: [
      {
        id: '1',
        nome: 'Manjericão',
        saude: 'excelente',
        proximoCuidado: 'Em 2 dias',
        ultimaRega: 'Hoje 08:30',
        icone: 'leaf'
      },
      {
        id: '2',
        nome: 'Hortelã',
        saude: 'boa',
        proximoCuidado: 'Amanhã',
        ultimaRega: 'Hoje 08:30',
        icone: 'leaf'
      },
      {
        id: '3',
        nome: 'Alecrim',
        saude: 'atenção',
        proximoCuidado: 'Hoje',
        ultimaRega: 'Ontem 18:00',
        icone: 'leaf'
      }
    ],
    dica: "A temperatura ideal para manjericão é entre 18°C e 25°C. Verifique se sua estufa está dentro desta faixa."
  },
  semana: {
    metricas: [
      {
        id: '1',
        titulo: 'Plantas Saudáveis',
        valor: 15,
        variacao: 5,
        icone: 'seedling',
        cor: COLORS.success
      },
      {
        id: '2',
        titulo: 'Temperatura Média',
        valor: 23.8,
        variacao: 1.2,
        icone: 'thermometer-half',
        cor: COLORS.error,
        unidade: '°C'
      },
      {
        id: '3',
        titulo: 'Umidade Ideal',
        valor: 72,
        variacao: 8,
        icone: 'tint',
        cor: COLORS.info,
        unidade: '%'
      },
      {
        id: '4',
        titulo: 'Economia de Água',
        valor: 42,
        variacao: 22,
        icone: 'leaf',
        cor: COLORS.primary,
        unidade: '%'
      }
    ],
    plantasStatus: [
      {
        id: '1',
        nome: 'Manjericão',
        saude: 'excelente',
        proximoCuidado: 'Em 2 dias',
        ultimaRega: 'Hoje 08:30',
        icone: 'leaf'
      },
      {
        id: '2',
        nome: 'Hortelã',
        saude: 'excelente',
        proximoCuidado: 'Amanhã',
        ultimaRega: 'Hoje 08:30',
        icone: 'leaf'
      },
      {
        id: '3',
        nome: 'Alecrim',
        saude: 'boa',
        proximoCuidado: 'Hoje',
        ultimaRega: 'Ontem 18:00',
        icone: 'leaf'
      },
      {
        id: '4',
        nome: 'Salsa',
        saude: 'boa',
        proximoCuidado: 'Amanhã',
        ultimaRega: 'Hoje 09:00',
        icone: 'leaf'
      }
    ],
    dica: "Esta semana sua economia de água aumentou 22%. Continue com as boas práticas de irrigação controlada."
  },
  mes: {
    metricas: [
      {
        id: '1',
        titulo: 'Plantas Saudáveis',
        valor: 18,
        variacao: 25,
        icone: 'seedling',
        cor: COLORS.success
      },
      {
        id: '2',
        titulo: 'Temperatura Média',
        valor: 24.2,
        variacao: -0.8,
        icone: 'thermometer-half',
        cor: COLORS.error,
        unidade: '°C'
      },
      {
        id: '3',
        titulo: 'Umidade Ideal',
        valor: 75,
        variacao: 18,
        icone: 'tint',
        cor: COLORS.info,
        unidade: '%'
      },
      {
        id: '4',
        titulo: 'Economia de Água',
        valor: 48,
        variacao: 35,
        icone: 'leaf',
        cor: COLORS.primary,
        unidade: '%'
      }
    ],
    plantasStatus: [
      {
        id: '1',
        nome: 'Manjericão',
        saude: 'excelente',
        proximoCuidado: 'Em 2 dias',
        ultimaRega: 'Hoje 08:30',
        icone: 'leaf'
      },
      {
        id: '2',
        nome: 'Hortelã',
        saude: 'excelente',
        proximoCuidado: 'Amanhã',
        ultimaRega: 'Hoje 08:30',
        icone: 'leaf'
      },
      {
        id: '3',
        nome: 'Alecrim',
        saude: 'excelente',
        proximoCuidado: 'Hoje',
        ultimaRega: 'Ontem 18:00',
        icone: 'leaf'
      },
      {
        id: '4',
        nome: 'Salsa',
        saude: 'boa',
        proximoCuidado: 'Amanhã',
        ultimaRega: 'Hoje 09:00',
        icone: 'leaf'
      },
      {
        id: '5',
        nome: 'Tomilho',
        saude: 'boa',
        proximoCuidado: 'Em 3 dias',
        ultimaRega: 'Hoje 10:00',
        icone: 'leaf'
      }
    ],
    dica: "No último mês você adicionou 6 novas plantas ao seu cultivo. Parabéns pela expansão!"
  }
};

export default function Dashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [periodo, setPeriodo] = useState<'hoje' | 'semana' | 'mes'>('hoje');
  const [metricas, setMetricas] = useState<MetricCard[]>([]);
  const [plantasStatus, setPlantasStatus] = useState<PlantaStatus[]>([]);
  const [dicaAtual, setDicaAtual] = useState("");

  const handleVoltar = () => {
    router.back();
  };


  // Alertas (mantidos fixos pois são em tempo real)
  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: '1',
      tipo: 'urgente',
      mensagem: 'Salsa precisa de irrigação urgente',
      tempo: '5 min atrás',
      lido: false
    },
    {
      id: '2',
      tipo: 'aviso',
      mensagem: 'Temperatura acima do ideal na Estufa B',
      tempo: '1 hora atrás',
      lido: true
    },
    {
      id: '3',
      tipo: 'info',
      mensagem: 'Relatório semanal disponível',
      tempo: '2 horas atrás',
      lido: true
    }
  ]);

  // Carregar dados baseado no período selecionado
  const carregarDadosPeriodo = (novoPeriodo: 'hoje' | 'semana' | 'mes') => {
    const dados = dadosPorPeriodo[novoPeriodo];
    setMetricas(dados.metricas);
    setPlantasStatus(dados.plantasStatus);
    setDicaAtual(dados.dica);
  };

  // Inicializar dados
  useEffect(() => {
    carregarDadosPeriodo(periodo);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulação de atualização de dados
    setTimeout(() => {
      carregarDadosPeriodo(periodo);
      setRefreshing(false);
    }, 1500);
  };

  const handlePeriodoChange = (novoPeriodo: 'hoje' | 'semana' | 'mes') => {
    setPeriodo(novoPeriodo);
    carregarDadosPeriodo(novoPeriodo);
  };

  const getSaudeColor = (saude: SaudeTipo) => {
    switch (saude) {
      case 'excelente': return COLORS.success;
      case 'boa': return COLORS.primaryLight;
      case 'atenção': return COLORS.warning;
      case 'critica': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  const marcarAlertaComoLido = (id: string) => {
    setAlertas(prev => prev.map(alerta => 
      alerta.id === id ? { ...alerta, lido: true } : alerta
    ));
  };

  // Componente de Card de Métrica
  const MetricCard = ({ metrica }: { metrica: MetricCard }) => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: `${metrica.cor}20` }]}>
          <FontAwesome5 name={metrica.icone} size={20} color={metrica.cor} />
        </View>
        <View style={styles.variacaoContainer}>
          <FontAwesome5 
            name={metrica.variacao >= 0 ? "arrow-up" : "arrow-down"} 
            size={10} 
            color={metrica.variacao >= 0 ? COLORS.success : COLORS.error} 
          />
          <Text style={[
            styles.variacaoText,
            { color: metrica.variacao >= 0 ? COLORS.success : COLORS.error }
          ]}>
            {Math.abs(metrica.variacao)}%
          </Text>
        </View>
      </View>
      <Text style={styles.metricValue}>
        {metrica.valor}{metrica.unidade && <Text style={styles.metricUnit}> {metrica.unidade}</Text>}
      </Text>
      <Text style={styles.metricTitle}>{metrica.titulo}</Text>
    </View>
  );

  // Componente de Status da Planta
  const PlantaStatusCard = ({ planta }: { planta: PlantaStatus }) => (
    <TouchableOpacity 
      style={styles.plantaCard}
      onPress={() => router.push(`/screens/DetalhesPlanta?id=${planta.id}`)}
    >
      <View style={styles.plantaHeader}>
        <View style={styles.plantaInfo}>
          <FontAwesome5 name={planta.icone} size={16} color={COLORS.primary} />
          <Text style={styles.plantaNome}>{planta.nome}</Text>
        </View>
        <View style={[styles.saudeBadge, { backgroundColor: `${getSaudeColor(planta.saude)}20` }]}>
          <Text style={[styles.saudeText, { color: getSaudeColor(planta.saude) }]}>
            {planta.saude}
          </Text>
        </View>
      </View>
      <View style={styles.plantaDetails}>
        <View style={styles.detailItem}>
          <FontAwesome5 name="clock" size={12} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>Próximo cuidado: {planta.proximoCuidado}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome5 name="tint" size={12} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>Última rega: {planta.ultimaRega}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={styles.box}>
          {/* Header */}
          <View style={styles.header}>
            <View>
                <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
                <FontAwesome5 name="arrow-left" size={20} color="#277C5C" />
                </TouchableOpacity>
              <Text style={styles.title}>Dashboard</Text>
              <Text style={styles.subtitle}>Visão geral do seu cultivo</Text>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <FontAwesome5 name="filter" size={16} color={COLORS.primary} />
              <Text style={styles.filterText}>Filtrar</Text>
            </TouchableOpacity>
          </View>

          {/* Período */}
          <View style={styles.periodoContainer}>
            {(['hoje', 'semana', 'mes'] as const).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.periodoButton,
                  periodo === item && styles.periodoButtonActive
                ]}
                onPress={() => handlePeriodoChange(item)}
              >
                <Text style={[
                  styles.periodoText,
                  periodo === item && styles.periodoTextActive
                ]}>
                  {item === 'hoje' ? 'Hoje' : item === 'semana' ? 'Semana' : 'Mês'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Métricas em Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Métricas Principais</Text>
            <View style={styles.metricsGrid}>
              {metricas.map((metrica) => (
                <MetricCard key={metrica.id} metrica={metrica} />
              ))}
            </View>
          </View>

          {/* Status das Plantas */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Status das Plantas</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/Plantas')}>
                <Text style={styles.verTodosText}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.plantasScroll}
            >
              {plantasStatus.map((planta) => (
                <PlantaStatusCard key={planta.id} planta={planta} />
              ))}
            </ScrollView>
          </View>

          {/* Alertas e Notificações */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Alertas</Text>
              <Text style={styles.alertasCount}>
                {alertas.filter(a => !a.lido).length} não lidos
              </Text>
            </View>
            <View style={styles.alertasContainer}>
              {alertas.map((alerta) => (
                <AlertaCard 
                  key={alerta.id} 
                  alerta={alerta} 
                  onPress={() => marcarAlertaComoLido(alerta.id)}
                />
              ))}
            </View>
          </View>

          {/* Ações Rápidas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            <View style={styles.acoesGrid}>
              <TouchableOpacity 
                style={styles.acaoButton}
                onPress={() => router.push('/screens/ControleAmbiente')}
              >
                <FontAwesome5 name="cog" size={20} color={COLORS.primary} />
                <Text style={styles.acaoText}>Controle</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.acaoButton}
                onPress={() => router.push('/(tabs)/Plantas')}
              >
                <FontAwesome5 name="plus" size={20} color={COLORS.primary} />
                <Text style={styles.acaoText}>Nova Planta</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.acaoButton}
                onPress={() => router.push('/(tabs)/Estufas')}
              >
                <FontAwesome5 name="warehouse" size={20} color={COLORS.primary} />
                <Text style={styles.acaoText}>Estufas</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.acaoButton}
                onPress={() => {/* Gerar relatório */}}
              >
                <FontAwesome5 name="chart-bar" size={20} color={COLORS.primary} />
                <Text style={styles.acaoText}>Relatório</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dicas do Dia */}
          <View style={styles.dicaContainer}>
            <FontAwesome5 name="lightbulb" size={20} color={COLORS.warning} />
            <View style={styles.dicaContent}>
              <Text style={styles.dicaTitle}>Dica do Dia</Text>
              <Text style={styles.dicaText}>
                {dicaAtual}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ... (seus estilos permanecem os mesmos)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  box: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 24,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
      backButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: 40,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  filterText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginLeft: 6,
  },
  periodoContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  periodoButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  periodoButtonActive: {
    backgroundColor: COLORS.surface,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  periodoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  periodoTextActive: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
  },
  verTodosText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  alertasCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  metricCard: {
    width: '48%',
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  variacaoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  variacaoText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginLeft: 4,
  },
  metricValue: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  metricUnit: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.normal,
  },
  metricTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  plantasScroll: {
    paddingRight: 16,
  },
  plantaCard: {
    width: 200,
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  plantaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  plantaInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  plantaNome: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  saudeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  saudeText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textTransform: 'capitalize',
  },
  plantaDetails: {
    gap: 6,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  alertasContainer: {
    gap: 8,
  },
  alertaCard: {
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 12,
    opacity: 0.8,
  },
  alertaNaoLido: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    opacity: 1,
  },
  alertaHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  alertaIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  alertaContent: {
    flex: 1,
  },
  alertaMensagem: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginBottom: 4,
  },
  alertaTempo: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
  },
  alertaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 6,
  },
  acoesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  acaoButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 16,
  },
  acaoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textPrimary,
    marginTop: 8,
    textAlign: 'center',
  },
  dicaContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.goldLight,
    borderRadius: 8,
    padding: 16,
  },
  dicaContent: {
    flex: 1,
    marginLeft: 12,
  },
  dicaTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  dicaText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.sm,
  },
});
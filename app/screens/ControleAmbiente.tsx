import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes';

// Interfaces para tipagem
interface ParametroControle {
  id: string;
  nome: string;
  valor: number;
  unidade: string;
  min: number;
  max: number;
  icone: string;
  cor: string;
  automatico: boolean;
}

interface Dispositivo {
  id: string;
  nome: string;
  estado: boolean;
  icone: string;
  cor: string;
  tipo: 'luz' | 'ventilacao' | 'irrigacao' | 'aquecedor';
}

// Componente Slider customizado para substituir o Slider removido
const CustomSlider = ({ 
  value, 
  onValueChange, 
  min, 
  max, 
  step = 1,
  color 
}: { 
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  color?: string;
}) => {
  const { colors } = useTheme(); // NOVO HOOK
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <View style={styles.sliderContainer}>
      <View style={[styles.sliderTrack, { backgroundColor: colors.gray300 }]}>
        <View 
          style={[
            styles.sliderFill,
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
      <View style={styles.sliderControls}>
        <TouchableOpacity 
          style={[styles.sliderButton, { backgroundColor: colors.primary }]}
          onPress={() => onValueChange(Math.max(min, value - step))}
          disabled={value <= min}
        >
          <FontAwesome5 name="minus" size={12} color={colors.textInverse} />
        </TouchableOpacity>
        
        <Text style={[styles.sliderValue, { color: colors.textPrimary }]}>{value}</Text>
        
        <TouchableOpacity 
          style={[styles.sliderButton, { backgroundColor: colors.primary }]}
          onPress={() => onValueChange(Math.min(max, value + step))}
          disabled={value >= max}
        >
          <FontAwesome5 name="plus" size={12} color={colors.textInverse} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ControleAmbiente() {
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK
  
  const handleVoltar = () => {
    router.back();
  };

  // Estados dos parâmetros ambientais
  const [parametros, setParametros] = useState<ParametroControle[]>([
    {
      id: '1',
      nome: 'Temperatura',
      valor: 24.5,
      unidade: '°C',
      min: 18,
      max: 35,
      icone: 'thermometer-half',
      cor: colors.error,
      automatico: true
    },
    {
      id: '2',
      nome: 'Umidade do Ar',
      valor: 65,
      unidade: '%',
      min: 40,
      max: 90,
      icone: 'cloud',
      cor: colors.info,
      automatico: true
    },
    {
      id: '3',
      nome: 'Umidade do Solo',
      valor: 42,
      unidade: '%',
      min: 20,
      max: 80,
      icone: 'tint',
      cor: colors.primary,
      automatico: false
    },
    {
      id: '4',
      nome: 'Luminosidade',
      valor: 75,
      unidade: '%',
      min: 0,
      max: 100,
      icone: 'sun',
      cor: colors.warning,
      automatico: true
    }
  ]);

  // Estados dos dispositivos
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([
    {
      id: '1',
      nome: 'Iluminação LED',
      estado: true,
      icone: 'lightbulb',
      cor: colors.warning,
      tipo: 'luz'
    },
    {
      id: '2',
      nome: 'Ventilação',
      estado: false,
      icone: 'fan',
      cor: colors.info,
      tipo: 'ventilacao'
    },
    {
      id: '3',
      nome: 'Sistema de Irrigação',
      estado: true,
      icone: 'tint',
      cor: colors.primary,
      tipo: 'irrigacao'
    }
  ]);

  const [modoAutomatico, setModoAutomatico] = useState(true);

  // Atualizar parâmetro
  const atualizarParametro = (id: string, novoValor: number) => {
    setParametros(prev => prev.map(param => 
      param.id === id ? { ...param, valor: novoValor } : param
    ));
  };

  // Alternar modo automático do parâmetro
  const alternarAutomatico = (id: string) => {
    setParametros(prev => prev.map(param => 
      param.id === id ? { ...param, automatico: !param.automatico } : param
    ));
  };

  // Alternar estado do dispositivo
  const alternarDispositivo = (id: string) => {
    setDispositivos(prev => prev.map(disp => 
      disp.id === id ? { ...disp, estado: !disp.estado } : disp
    ));
  };

  // Ativar todos os dispositivos
  const ativarTodosDispositivos = () => {
    setDispositivos(prev => prev.map(disp => ({ ...disp, estado: true })));
    Alert.alert("Sucesso", "Todos os dispositivos foram ativados");
  };

  // Desativar todos os dispositivos
  const desativarTodosDispositivos = () => {
    setDispositivos(prev => prev.map(disp => ({ ...disp, estado: false })));
    Alert.alert("Sucesso", "Todos os dispositivos foram desativados");
  };

  // Executar ação rápida
  const executarAcaoRapida = (acao: string) => {
    switch (acao) {
      case 'ventilacao':
        setDispositivos(prev => prev.map(disp => 
          disp.tipo === 'ventilacao' ? { ...disp, estado: true } : disp
        ));
        Alert.alert("Ventilação Ativada", "Sistema de ventilação ligado por 30 minutos");
        break;
      case 'irrigacao':
        setDispositivos(prev => prev.map(disp => 
          disp.tipo === 'irrigacao' ? { ...disp, estado: true } : disp
        ));
        Alert.alert("Irrigação Ativada", "Sistema de irrigação iniciado");
        break;
      case 'luz':
        setDispositivos(prev => prev.map(disp => 
          disp.tipo === 'luz' ? { ...disp, estado: !disp.estado } : disp
        ));
        break;
    }
  };

  // Componente de Parâmetro
  const ParametroControle = ({ parametro }: { parametro: ParametroControle }) => (
    <View style={[styles.parametroCard, { backgroundColor: colors.gray50 }]}>
      <View style={styles.parametroHeader}>
        <View style={styles.parametroInfo}>
          <View style={[styles.parametroIcon, { backgroundColor: `${parametro.cor}20` }]}>
            <FontAwesome5 name={parametro.icone} size={20} color={parametro.cor} />
          </View>
          <View style={styles.parametroText}>
            <Text style={[styles.parametroNome, { color: colors.textPrimary }]}>{parametro.nome}</Text>
            <Text style={[styles.parametroValor, { color: colors.textPrimary }]}>
              {parametro.valor} {parametro.unidade}
            </Text>
          </View>
        </View>
        <View style={styles.controleAutomatico}>
          <Text style={[styles.controleTexto, { color: colors.textSecondary }]}>
            {parametro.automatico ? 'Automático' : 'Manual'}
          </Text>
          <Switch
            value={parametro.automatico}
            onValueChange={() => alternarAutomatico(parametro.id)}
            trackColor={{ false: colors.gray400, true: `${parametro.cor}80` }}
            thumbColor={parametro.automatico ? parametro.cor : colors.gray200}
          />
        </View>
      </View>

      {!parametro.automatico && (
        <View style={[styles.controleManual, { borderTopColor: colors.borderLight }]}>
          <Text style={[styles.rangeText, { color: colors.textSecondary }]}>
            {parametro.min}{parametro.unidade} - {parametro.max}{parametro.unidade}
          </Text>
          <CustomSlider
            value={parametro.valor}
            onValueChange={(value: number) => atualizarParametro(parametro.id, value)}
            min={parametro.min}
            max={parametro.max}
            step={parametro.unidade === '°C' ? 0.5 : 1}
            color={parametro.cor}
          />
        </View>
      )}
    </View>
  );

  // Componente de Dispositivo
  const DispositivoControle = ({ dispositivo }: { dispositivo: Dispositivo }) => (
    <View style={[styles.dispositivoCard, { backgroundColor: colors.gray50 }]}>
      <View style={styles.dispositivoInfo}>
        <View style={[styles.dispositivoIcon, { backgroundColor: `${dispositivo.cor}20` }]}>
          <FontAwesome5 
            name={dispositivo.icone} 
            size={20} 
            color={dispositivo.estado ? dispositivo.cor : colors.textDisabled} 
          />
        </View>
        <View style={styles.dispositivoText}>
          <Text style={[
            styles.dispositivoNome,
            { color: colors.textPrimary },
            !dispositivo.estado && [styles.dispositivoDesligado, { color: colors.textDisabled }]
          ]}>
            {dispositivo.nome}
          </Text>
          <Text style={[styles.dispositivoEstado, { color: colors.textSecondary }]}>
            {dispositivo.estado ? 'Ligado' : 'Desligado'}
          </Text>
        </View>
      </View>
      <Switch
        value={dispositivo.estado}
        onValueChange={() => alternarDispositivo(dispositivo.id)}
        trackColor={{ false: colors.gray400, true: `${dispositivo.cor}80` }}
        thumbColor={dispositivo.estado ? dispositivo.cor : colors.gray200}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.box, { backgroundColor: colors.surface }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={[styles.backButton, { borderColor: colors.border }]} 
              onPress={handleVoltar}
            >
              <FontAwesome5 name="arrow-left" size={20} color={colors.primary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.primary }]}>Controle Ambiental</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Gerencie os parâmetros da sua estufa</Text>
          </View>

          {/* Status Geral */}
          <View style={[styles.statusContainer, { backgroundColor: colors.gray50 }]}>
            <View style={styles.statusItem}>
              <FontAwesome5 name="check-circle" size={16} color={colors.success} />
              <Text style={[styles.statusText, { color: colors.textSecondary }]}>
                {dispositivos.filter(d => d.estado).length} dispositivos ativos
              </Text>
            </View>
            <View style={styles.statusItem}>
              <FontAwesome5 name="cog" size={16} color={colors.info} />
              <Text style={[styles.statusText, { color: colors.textSecondary }]}>
                {parametros.filter(p => p.automatico).length}/{parametros.length} automáticos
              </Text>
            </View>
          </View>

          {/* Ações Rápidas */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Ações Rápidas</Text>
            <View style={styles.acoesGrid}>
              <TouchableOpacity 
                style={[styles.acaoButton, { 
                  backgroundColor: colors.gray50, 
                  borderColor: colors.borderLight 
                }]}
                onPress={() => executarAcaoRapida('ventilacao')}
              >
                <FontAwesome5 name="wind" size={24} color={colors.info} />
                <Text style={[styles.acaoText, { color: colors.textPrimary }]}>Ventilar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.acaoButton, { 
                  backgroundColor: colors.gray50, 
                  borderColor: colors.borderLight 
                }]}
                onPress={() => executarAcaoRapida('irrigacao')}
              >
                <FontAwesome5 name="tint" size={24} color={colors.primary} />
                <Text style={[styles.acaoText, { color: colors.textPrimary }]}>Irrigar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.acaoButton, { 
                  backgroundColor: colors.gray50, 
                  borderColor: colors.borderLight 
                }]}
                onPress={() => executarAcaoRapida('luz')}
              >
                <FontAwesome5 name="lightbulb" size={24} color={colors.warning} />
                <Text style={[styles.acaoText, { color: colors.textPrimary }]}>Luz</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Parâmetros Ambientais */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Parâmetros Ambientais</Text>
              <View style={styles.controlesGlobais}>
                <TouchableOpacity 
                  style={[styles.controleGlobalBtn, { backgroundColor: colors.success }]}
                  onPress={ativarTodosDispositivos}
                >
                  <FontAwesome5 name="play" size={12} color={colors.textInverse} />
                  <Text style={[styles.controleGlobalText, { color: colors.textInverse }]}>Ligar Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.controleGlobalBtn, styles.controleGlobalBtnOff, { backgroundColor: colors.error }]}
                  onPress={desativarTodosDispositivos}
                >
                  <FontAwesome5 name="stop" size={12} color={colors.textInverse} />
                  <Text style={[styles.controleGlobalText, { color: colors.textInverse }]}>Desligar Todos</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {parametros.map((parametro) => (
              <ParametroControle key={parametro.id} parametro={parametro} />
            ))}
          </View>

          {/* Dispositivos */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Dispositivos</Text>
            {dispositivos.map((dispositivo) => (
              <DispositivoControle key={dispositivo.id} dispositivo={dispositivo} />
            ))}
          </View>

          {/* Informações */}
          <View style={[styles.infoBox, { backgroundColor: colors.greenLight }]}>
            <FontAwesome5 name="info-circle" size={16} color={colors.info} />
            <Text style={[styles.infoText, { color: colors.textPrimary }]}>
              Modo automático ajusta os parâmetros baseado nas necessidades das plantas
            </Text>
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
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    textAlign: "center",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
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
  },
  controlesGlobais: {
    flexDirection: "row",
    gap: 8,
  },
  controleGlobalBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  controleGlobalBtnOff: {
    // Cor movida para o style inline
  },
  controleGlobalText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginLeft: 4,
  },
  acoesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  acaoButton: {
    flex: 1,
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    width: 40,
  },
  acaoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginTop: 8,
  },
  parametroCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  parametroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  parametroInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  parametroIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  parametroText: {
    flex: 1,
  },
  parametroNome: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: 2,
  },
  parametroValor: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  controleAutomatico: {
    alignItems: "center",
  },
  controleTexto: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginBottom: 4,
  },
  controleManual: {
    borderTopWidth: 1,
    paddingTop: 12,
  },
  rangeText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    textAlign: "center",
    marginBottom: 8,
  },
  // Estilos do CustomSlider
  sliderContainer: {
    marginBottom: 8,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
  },
  sliderControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  dispositivoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  dispositivoInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dispositivoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dispositivoText: {
    flex: 1,
  },
  dispositivoNome: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: 2,
  },
  dispositivoDesligado: {
    // Cor movida para o style inline
  },
  dispositivoEstado: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 8,
    padding: 12,
  },
  infoText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginLeft: 8,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.sm,
  },
});
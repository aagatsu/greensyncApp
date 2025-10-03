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
import { COLORS } from '@/constants/Cores';
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
  color = COLORS.primary 
}: { 
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  color?: string;
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderTrack}>
        <View 
          style={[
            styles.sliderFill,
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
      <View style={styles.sliderControls}>
        <TouchableOpacity 
          style={styles.sliderButton}
          onPress={() => onValueChange(Math.max(min, value - step))}
          disabled={value <= min}
        >
          <FontAwesome5 name="minus" size={12} color={COLORS.textInverse} />
        </TouchableOpacity>
        
        <Text style={styles.sliderValue}>{value}</Text>
        
        <TouchableOpacity 
          style={styles.sliderButton}
          onPress={() => onValueChange(Math.min(max, value + step))}
          disabled={value >= max}
        >
          <FontAwesome5 name="plus" size={12} color={COLORS.textInverse} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ControleAmbiente() {
  const router = useRouter();
  
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
      cor: COLORS.error,
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
      cor: COLORS.info,
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
      cor: COLORS.primary,
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
      cor: COLORS.warning,
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
      cor: COLORS.warning,
      tipo: 'luz'
    },
    {
      id: '2',
      nome: 'Ventilação',
      estado: false,
      icone: 'fan',
      cor: COLORS.info,
      tipo: 'ventilacao'
    },
    {
      id: '3',
      nome: 'Sistema de Irrigação',
      estado: true,
      icone: 'tint',
      cor: COLORS.primary,
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
    <View style={styles.parametroCard}>
      <View style={styles.parametroHeader}>
        <View style={styles.parametroInfo}>
          <View style={[styles.parametroIcon, { backgroundColor: `${parametro.cor}20` }]}>
            <FontAwesome5 name={parametro.icone} size={20} color={parametro.cor} />
          </View>
          <View style={styles.parametroText}>
            <Text style={styles.parametroNome}>{parametro.nome}</Text>
            <Text style={styles.parametroValor}>
              {parametro.valor} {parametro.unidade}
            </Text>
          </View>
        </View>
        <View style={styles.controleAutomatico}>
          <Text style={styles.controleTexto}>
            {parametro.automatico ? 'Automático' : 'Manual'}
          </Text>
          <Switch
            value={parametro.automatico}
            onValueChange={() => alternarAutomatico(parametro.id)}
            trackColor={{ false: COLORS.gray400, true: `${parametro.cor}80` }}
            thumbColor={parametro.automatico ? parametro.cor : COLORS.gray200}
          />
        </View>
      </View>

      {!parametro.automatico && (
        <View style={styles.controleManual}>
          <Text style={styles.rangeText}>
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
    <View style={styles.dispositivoCard}>
      <View style={styles.dispositivoInfo}>
        <View style={[styles.dispositivoIcon, { backgroundColor: `${dispositivo.cor}20` }]}>
          <FontAwesome5 
            name={dispositivo.icone} 
            size={20} 
            color={dispositivo.estado ? dispositivo.cor : COLORS.textDisabled} 
          />
        </View>
        <View style={styles.dispositivoText}>
          <Text style={[
            styles.dispositivoNome,
            !dispositivo.estado && styles.dispositivoDesligado
          ]}>
            {dispositivo.nome}
          </Text>
          <Text style={styles.dispositivoEstado}>
            {dispositivo.estado ? 'Ligado' : 'Desligado'}
          </Text>
        </View>
      </View>
      <Switch
        value={dispositivo.estado}
        onValueChange={() => alternarDispositivo(dispositivo.id)}
        trackColor={{ false: COLORS.gray400, true: `${dispositivo.cor}80` }}
        thumbColor={dispositivo.estado ? dispositivo.cor : COLORS.gray200}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.box}>
          {/* Header */}
          <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
              <FontAwesome5 name="arrow-left" size={20} color="#277C5C" />
              </TouchableOpacity>
            <Text style={styles.title}>Controle Ambiental</Text>
            <Text style={styles.subtitle}>Gerencie os parâmetros da sua estufa</Text>
          </View>

          {/* Status Geral */}
          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <FontAwesome5 name="check-circle" size={16} color={COLORS.success} />
              <Text style={styles.statusText}>
                {dispositivos.filter(d => d.estado).length} dispositivos ativos
              </Text>
            </View>
            <View style={styles.statusItem}>
              <FontAwesome5 name="cog" size={16} color={COLORS.info} />
              <Text style={styles.statusText}>
                {parametros.filter(p => p.automatico).length}/{parametros.length} automáticos
              </Text>
            </View>
          </View>

          {/* Ações Rápidas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            <View style={styles.acoesGrid}>
              <TouchableOpacity 
                style={styles.acaoButton}
                onPress={() => executarAcaoRapida('ventilacao')}
              >
                <FontAwesome5 name="wind" size={24} color={COLORS.info} />
                <Text style={styles.acaoText}>Ventilar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.acaoButton}
                onPress={() => executarAcaoRapida('irrigacao')}
              >
                <FontAwesome5 name="tint" size={24} color={COLORS.primary} />
                <Text style={styles.acaoText}>Irrigar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.acaoButton}
                onPress={() => executarAcaoRapida('luz')}
              >
                <FontAwesome5 name="lightbulb" size={24} color={COLORS.warning} />
                <Text style={styles.acaoText}>Luz</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Parâmetros Ambientais */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Parâmetros Ambientais</Text>
              <View style={styles.controlesGlobais}>
                <TouchableOpacity 
                  style={styles.controleGlobalBtn}
                  onPress={ativarTodosDispositivos}
                >
                  <FontAwesome5 name="play" size={12} color={COLORS.textInverse} />
                  <Text style={styles.controleGlobalText}>Ligar Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.controleGlobalBtn, styles.controleGlobalBtnOff]}
                  onPress={desativarTodosDispositivos}
                >
                  <FontAwesome5 name="stop" size={12} color={COLORS.textInverse} />
                  <Text style={styles.controleGlobalText}>Desligar Todos</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {parametros.map((parametro) => (
              <ParametroControle key={parametro.id} parametro={parametro} />
            ))}
          </View>

          {/* Dispositivos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dispositivos</Text>
            {dispositivos.map((dispositivo) => (
              <DispositivoControle key={dispositivo.id} dispositivo={dispositivo} />
            ))}
          </View>

          {/* Informações */}
          <View style={styles.infoBox}>
            <FontAwesome5 name="info-circle" size={16} color={COLORS.info} />
            <Text style={styles.infoText}>
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
    marginBottom: 20,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.gray50,
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
    color: COLORS.textSecondary,
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
    color: COLORS.textPrimary,
  },
  controlesGlobais: {
    flexDirection: "row",
    gap: 8,
  },
  controleGlobalBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  controleGlobalBtnOff: {
    backgroundColor: COLORS.error,
  },
  controleGlobalText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textInverse,
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
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
    backButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: 40,
  },
  acaoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  parametroCard: {
    backgroundColor: COLORS.gray50,
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
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  parametroValor: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
  },
  controleAutomatico: {
    alignItems: "center",
  },
  controleTexto: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  controleManual: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 12,
  },
  rangeText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 8,
  },
  // Estilos do CustomSlider
  sliderContainer: {
    marginBottom: 8,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: COLORS.gray300,
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
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
  },
  dispositivoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.gray50,
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
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  dispositivoDesligado: {
    color: COLORS.textDisabled,
  },
  dispositivoEstado: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.greenLight,
    borderRadius: 8,
    padding: 12,
  },
  infoText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textPrimary,
    marginLeft: 8,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.sm,
  },
});
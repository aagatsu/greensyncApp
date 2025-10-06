import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes'; // NOVA IMPORT

// Interfaces para tipagem
interface FAQItem {
  id: string;
  pergunta: string;
  resposta: string;
  aberto: boolean;
}

interface ItemContatoProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  color?: string;
}

interface ItemAjudaProps {
  icon: string;
  title: string;
  onPress: () => void;
  color?: string;
}

// Componente ItemContato com tipagem correta
const ItemContato: React.FC<ItemContatoProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  color = "#277C5C" 
}) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity style={[styles.contatoItem, { backgroundColor: colors.gray50 }]} onPress={onPress}>
      <View style={styles.contatoLeft}>
        <View style={[styles.contatoIcon, { backgroundColor: `${color}20` }]}>
          <FontAwesome5 name={icon} size={20} color={color} />
        </View>
        <View style={styles.contatoText}>
          <Text style={[styles.contatoTitle, { color: colors.textPrimary }]}>{title}</Text>
          <Text style={[styles.contatoSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        </View>
      </View>
      <FontAwesome5 name="chevron-right" size={14} color={colors.textDisabled} />
    </TouchableOpacity>
  );
};

// Componente ItemAjuda com tipagem correta
const ItemAjuda: React.FC<ItemAjudaProps> = ({ 
  icon, 
  title, 
  onPress, 
  color = "#277C5C" 
}) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity style={[styles.ajudaItem, { backgroundColor: colors.gray50 }]} onPress={onPress}>
      <View style={[styles.ajudaIcon, { backgroundColor: `${color}20` }]}>
        <FontAwesome5 name={icon} size={18} color={color} />
      </View>
      <Text style={[styles.ajudaTitle, { color: colors.textPrimary }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Suporte() {
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK
  const [faqAberto, setFaqAberto] = useState<string | null>(null);

  // Dados das perguntas frequentes
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: '1',
      pergunta: "Como adicionar uma nova planta?",
      resposta: "Vá para a tela 'Plantas' e clique no botão '+' no canto inferior direito. Preencha as informações da planta e adicione uma foto.",
      aberto: false
    },
    {
      id: '2',
      pergunta: "Como configurar uma nova estufa?",
      resposta: "Acesse a tela 'Estufas' e clique no botão '+'. Preencha os dados da estufa, incluindo localização e dimensões.",
      aberto: false
    },
    {
      id: '3',
      pergunta: "O aplicativo funciona offline?",
      resposta: "Sim, você pode visualizar suas plantas e estufas offline. Algumas funcionalidades como sincronização requerem conexão com a internet.",
      aberto: false
    },
    {
      id: '4',
      pergunta: "Como alterar minha senha?",
      resposta: "Vá para 'Configurações' > 'Conta' > 'Alterar Senha' e siga as instruções para criar uma nova senha.",
      aberto: false
    },
    {
      id: '5',
      pergunta: "Posso exportar meus dados?",
      resposta: "Sim, em 'Configurações' > 'Conta' > 'Exportar Dados' você pode baixar um relatório em PDF com todas as suas informações.",
      aberto: false
    }
  ]);

  const toggleFaq = (id: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id 
        ? { ...faq, aberto: !faq.aberto }
        : { ...faq, aberto: false }
    ));
    setFaqAberto(faqAberto === id ? null : id);
  };

  const fazerLigacao = () => {
    Linking.openURL('tel:+5511999999999').catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o discador telefônico");
    });
  };

  const enviarEmail = () => {
    Linking.openURL('mailto:suporte@greensync.com?subject=Suporte GreenSync&body=Olá, preciso de ajuda com:').catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o aplicativo de e-mail");
    });
  };

  const abrirWhatsApp = () => {
    Linking.openURL('https://wa.me/5511999999999?text=Olá, preciso de ajuda com o aplicativo GreenSync').catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp");
    });
  };

  const abrirManual = () => {
    Alert.alert("Manual do Usuário", "Em breve disponível para download");
  };

  const verTutoriais = () => {
    Alert.alert("Tutoriais", "Nossa biblioteca de tutoriais em vídeo estará disponível em breve");
  };

  const reportarProblema = () => {
    Linking.openURL('mailto:bugs@greensync.com?subject=Reportar Problema - GreenSync&body=Descreva o problema encontrado:').catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o aplicativo de e-mail");
    });
  };

  const sugerirMelhoria = () => {
    Linking.openURL('mailto:melhorias@greensync.com?subject=Sugestão de Melhoria - GreenSync&body=Minha sugestão:').catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o aplicativo de e-mail");
    });
  };

  const handleVoltar = () => {
    router.back();
  };

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
            <Text style={[styles.title, { color: colors.primary }]}>Ajuda & Suporte</Text>
            <View style={styles.headerSpacer} />
          </View>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Estamos aqui para ajudar você!</Text>

          {/* Canais de Contato */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Canais de Contato</Text>
            
            <ItemContato
              icon="phone-alt"
              title="Telefone"
              subtitle="(11) 99999-9999"
              onPress={fazerLigacao}
              color={colors.info}
            />
            
            <ItemContato
              icon="envelope"
              title="E-mail"
              subtitle="suporte@greensync.com"
              onPress={enviarEmail}
              color={colors.warning}
            />
            
            <ItemContato
              icon="whatsapp"
              title="WhatsApp"
              subtitle="Chat em tempo real"
              onPress={abrirWhatsApp}
              color="#25D366"
            />
          </View>

          {/* Recursos de Ajuda */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Recursos de Ajuda</Text>
            
            <View style={styles.ajudaGrid}>
              <ItemAjuda
                icon="book"
                title="Manual do Usuário"
                onPress={abrirManual}
                color="#9C27B0"
              />
              
              <ItemAjuda
                icon="video"
                title="Tutoriais em Vídeo"
                onPress={verTutoriais}
                color={colors.error}
              />
            </View>
          </View>

          {/* Feedback */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Feedback</Text>
            
            <ItemContato
              icon="bug"
              title="Reportar Problema"
              subtitle="Encontrou um bug? Nos avise!"
              onPress={reportarProblema}
              color={colors.error}
            />
            
            <ItemContato
              icon="lightbulb"
              title="Sugerir Melhoria"
              subtitle="Tem uma ideia para melhorar o app?"
              onPress={sugerirMelhoria}
              color={colors.warning}
            />
          </View>

          {/* Perguntas Frequentes */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Perguntas Frequentes (FAQ)</Text>
            
            {faqs.map((faq) => (
              <View key={faq.id} style={[styles.faqItem, { backgroundColor: colors.gray50 }]}>
                <TouchableOpacity 
                  style={styles.faqPergunta}
                  onPress={() => toggleFaq(faq.id)}
                >
                  <Text style={[styles.faqPerguntaText, { color: colors.textPrimary }]}>{faq.pergunta}</Text>
                  <FontAwesome5 
                    name={faq.aberto ? "chevron-up" : "chevron-down"} 
                    size={14} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
                
                {faq.aberto && (
                  <View style={[styles.faqResposta, { borderTopColor: colors.borderLight }]}>
                    <Text style={[styles.faqRespostaText, { color: colors.textSecondary }]}>{faq.resposta}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Informações de Horário */}
          <View style={[styles.infoBox, { backgroundColor: colors.greenLight }]}>
            <FontAwesome5 name="clock" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.primary }]}>Horário de Atendimento</Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>Segunda a Sexta: 8h às 18h</Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>Sábados: 9h às 13h</Text>
            </View>
          </View>

          {/* Tempo de Resposta */}
          <View style={[styles.infoBox, { backgroundColor: colors.greenLight }]}>
            <FontAwesome5 name="stopwatch" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.primary }]}>Tempo de Resposta</Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>E-mail: até 24 horas</Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>WhatsApp: até 2 horas</Text>
            </View>
          </View>

          {/* Informações do Suporte */}
          <View style={[styles.appInfo, { borderTopColor: colors.borderLight }]}>
            <Text style={[styles.appVersion, { color: colors.textSecondary }]}>GreenSync Suporte v1.0.0</Text>
            <Text style={[styles.appCopyright, { color: colors.textDisabled }]}>© 2024 GreenSync. Todos os direitos reservados.</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
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
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    textAlign: "center",
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 16,
    marginLeft: 8,
  },
  contatoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  contatoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contatoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contatoText: {
    flex: 1,
  },
  contatoTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: 2,
  },
  contatoSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  ajudaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  ajudaItem: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  ajudaIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  ajudaTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    textAlign: "center",
  },
  faqItem: {
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  faqPergunta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  faqPerguntaText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginRight: 12,
  },
  faqResposta: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
  },
  faqRespostaText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.sm,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 4,
  },
  infoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  appInfo: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  appVersion: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    textAlign: "center",
  },
});
import React from "react";
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
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

// Interface para o componente de recurso
interface RecursoProps {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

// Componente de Recurso
const Recurso: React.FC<RecursoProps> = ({ 
  icon, 
  title, 
  description, 
  color = COLORS.primary
}) => (
  <View style={styles.recursoItem}>
    <View style={[styles.recursoIcon, { backgroundColor: `${color}20` }]}>
      <FontAwesome5 name={icon} size={24} color={color} />
    </View>
    <View style={styles.recursoContent}>
      <Text style={styles.recursoTitle}>{title}</Text>
      <Text style={styles.recursoDescription}>{description}</Text>
    </View>
  </View>
);

// Interface para o componente de equipe
interface MembroEquipeProps {
  nome: string;
  cargo: string;
  avatar: string;
  color?: string;
}

// Componente de Membro da Equipe
const MembroEquipe: React.FC<MembroEquipeProps> = ({ 
  nome, 
  cargo, 
  avatar, 
  color = COLORS.primary
}) => (
  <View style={styles.membroItem}>
    <View style={[styles.membroAvatar, { backgroundColor: `${color}20` }]}>
      <FontAwesome5 name={avatar} size={28} color={color} />
    </View>
    <View style={styles.membroInfo}>
      <Text style={styles.membroNome}>{nome}</Text>
      <Text style={styles.membroCargo}>{cargo}</Text>
    </View>
  </View>
);

export default function Sobre() {
  const router = useRouter();

  const abrirWebsite = () => {
    Linking.openURL('https://www.greensync.com.br').catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o website");
    });
  };

  const abrirLinkedIn = () => {
    Linking.openURL('https://linkedin.com/company/greensync').catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o LinkedIn");
    });
  };

  const abrirInstagram = () => {
    Linking.openURL('https://instagram.com/greensync.app').catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o Instagram");
    });
  };

  const enviarFeedback = () => {
    Linking.openURL('mailto:feedback@greensync.com?subject=Feedback - GreenSync&body=Olá, gostaria de compartilhar meu feedback:').catch(() => {
      Alert.alert("Erro", "Não foi possível abrir o aplicativo de e-mail");
    });
  };

  const avaliarApp = () => {
    Alert.alert(
      "Avaliar App",
      "Em breve você poderá avaliar o GreenSync na loja de aplicativos!",
      [{ text: "Entendi" }]
    );
  };

  const verTermosUso = () => {
    Alert.alert(
      "Termos de Uso",
      "Os termos de uso e política de privacidade estarão disponíveis em breve em nosso website.",
      [
        { text: "Fechar", style: "cancel" },
        { text: "Visitar Website", onPress: abrirWebsite }
      ]
    );
  };

  const verPolíticaPrivacidade = () => {
    Alert.alert(
      "Política de Privacidade",
      "Nossa política de privacidade estará disponível em breve. Valorizamos a segurança dos seus dados.",
      [
        { text: "Fechar", style: "cancel" },
        { text: "Saber Mais", onPress: abrirWebsite }
      ]
    );
  };

  // Dados dos recursos
  const recursos = [
    {
      icon: "seedling",
      title: "Gestão de Plantas",
      description: "Cadastre, monitore e gerencie todas as suas plantas em um só lugar",
      color: COLORS.primary
    },
    {
      icon: "warehouse",
      title: "Controle de Estufas",
      description: "Acompanhe as condições das suas estufas e otimize o cultivo",
      color: COLORS.info
    },
    {
      icon: "chart-line",
      title: "Dashboard Inteligente",
      description: "Visualize métricas e insights sobre seu cultivo",
      color: COLORS.warning
    },
    {
      icon: "bell",
      title: "Alertas Automáticos",
      description: "Receba notificações sobre condições importantes",
      color: COLORS.error
    }
  ];

  // Dados da equipe
  const equipe = [
    {
      nome: "Gustavo Souza",
      cargo: "Desenvolvedor Front-end",
      avatar: "code"
    },
    {
      nome: "Carlos Daniel",
      cargo: "Desenvolvedor Back-end",
      avatar: "server"
    },
    {
      nome: "Livia Beatriz",
      cargo: "Designer UI/UX",
      avatar: "paint-brush"
    },
    {
      nome: "Gabriel Domingos",
      cargo: "Especialista em Agricultura",
      avatar: "leaf"
    }
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.box}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Sobre o GreenSync</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Logo e Descrição */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <FontAwesome5 name="leaf" size={50} color={COLORS.primary} />
            </View>
            <Text style={styles.appName}>GreenSync</Text>
            <Text style={styles.appSlogan}>Sincronizando sua paixão por plantas</Text>
            <Text style={styles.appDescription}>
              O GreenSync é um aplicativo inovador desenvolvido para entusiastas da agricultura urbana 
              e cultivadores domésticos. Nossa missão é simplificar o gerenciamento de plantas e estufas, 
              proporcionando uma experiência intuitiva e completa.
            </Text>
          </View>

          {/* Versão e Informações */}
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <FontAwesome5 name="code-branch" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>Versão 1.0.0</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome5 name="calendar" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>Lançamento: Novembro 2025</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome5 name="mobile-alt" size={16} color={COLORS.primary} />
              <Text style={styles.infoText}>Compatível: iOS e Android</Text>
            </View>
          </View>

          {/* Recursos Principais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recursos Principais</Text>
            {recursos.map((recurso, index) => (
              <Recurso
                key={index}
                icon={recurso.icon}
                title={recurso.title}
                description={recurso.description}
                color={recurso.color}
              />
            ))}
          </View>

          {/* Nossa Equipe */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nossa Equipe</Text>
            <Text style={styles.sectionSubtitle}>
              Conheça o time por trás do GreenSync
            </Text>
            <View style={styles.equipeGrid}>
              {equipe.map((membro, index) => (
                <MembroEquipe
                  key={index}
                  nome={membro.nome}
                  cargo={membro.cargo}
                  avatar={membro.avatar}
                />
              ))}
            </View>
          </View>

          {/* Tecnologias */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tecnologias Utilizadas</Text>
            <View style={styles.techList}>
              <View style={styles.techItem}>
                <FontAwesome5 name="react" size={20} color="#61DAFB" />
                <Text style={styles.techText}>React Native</Text>
              </View>
              <View style={styles.techItem}>
                <FontAwesome5 name="js-square" size={20} color="#F7DF1E" />
                <Text style={styles.techText}>TypeScript</Text>
              </View>
              <View style={styles.techItem}>
                <FontAwesome5 name="fire" size={20} color="#FFA611" />
                <Text style={styles.techText}>Firebase</Text>
              </View>
              <View style={styles.techItem}>
                <FontAwesome5 name="github" size={20} color={COLORS.gray800} />
                <Text style={styles.techText}>GitHub</Text>
              </View>
            </View>
          </View>

          {/* Redes Sociais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conecte-se Conosco</Text>
            <View style={styles.redesSociais}>
              <TouchableOpacity style={styles.redeSocialButton} onPress={abrirWebsite}>
                <FontAwesome5 name="globe" size={20} color={COLORS.primary} />
                <Text style={styles.redeSocialText}>Website</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.redeSocialButton} onPress={abrirLinkedIn}>
                <FontAwesome5 name="linkedin" size={20} color="#0077B5" />
                <Text style={styles.redeSocialText}>LinkedIn</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.redeSocialButton} onPress={abrirInstagram}>
                <FontAwesome5 name="instagram" size={20} color="#E4405F" />
                <Text style={styles.redeSocialText}>Instagram</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Ações */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações</Text>
            <TouchableOpacity style={styles.actionButton} onPress={enviarFeedback}>
              <FontAwesome5 name="comment-alt" size={18} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Enviar Feedback</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={avaliarApp}>
              <FontAwesome5 name="star" size={18} color={COLORS.white} />
              <Text style={styles.actionButtonText}>Avaliar App</Text>
            </TouchableOpacity>
          </View>

          {/* Legal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Legais</Text>
            <TouchableOpacity style={styles.legalButton} onPress={verTermosUso}>
              <Text style={styles.legalButtonText}>Termos de Uso</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.legalButton} onPress={verPolíticaPrivacidade}>
              <Text style={styles.legalButtonText}>Política de Privacidade</Text>
            </TouchableOpacity>
          </View>

          {/* Rodapé */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Desenvolvido com ❤️ para a comunidade de cultivadores
            </Text>
            <Text style={styles.copyright}>
              © 2025 GreenSync. Todos os direitos reservados.
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
  logoSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.greenLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  appName: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    marginBottom: 8,
  },
  appSlogan: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
    marginBottom: 16,
    textAlign: "center",
  },
  appDescription: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: TYPOGRAPHY.lineHeight.normal * TYPOGRAPHY.fontSize.base,
  },
  infoSection: {
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textPrimary,
    marginLeft: 12,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  recursoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  recursoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recursoContent: {
    flex: 1,
  },
  recursoTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  recursoDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.normal * TYPOGRAPHY.fontSize.sm,
  },
  equipeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  membroItem: {
    width: "48%",
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  membroAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  membroInfo: {
    alignItems: "center",
  },
  membroNome: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
    textAlign: "center",
  },
  membroCargo: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  techList: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  techItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  techText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  redesSociais: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  redeSocialButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 4,
  },
  redeSocialText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginLeft: 8,
  },
  legalButton: {
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  legalButtonText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  footerText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 8,
  },
  copyright: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textDisabled,
    textAlign: "center",
  },
});
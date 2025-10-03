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
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function PoliticaPrivacidade() {
  const router = useRouter();

  const handleVoltar = () => {
    router.back();
  };

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
              <FontAwesome5 name="arrow-left" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Política de Privacidade</Text>
            <View style={styles.headerSpacer} />
          </View>

          <Text style={styles.subtitle}>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </Text>

          {/* Conteúdo da Política */}
          <View style={styles.content}>
            <Text style={styles.paragraph}>
              Esta Política de Privacidade descreve como o GreenSync coleta, usa e compartilha 
              suas informações pessoais quando você usa nosso aplicativo.
            </Text>

            <Section title="1. Informações que Coletamos">
              <Text style={styles.paragraph}>
                Coletamos os seguintes tipos de informações:
              </Text>
              <SubSection title="Informações Pessoais:">
                <BulletPoint text="Nome completo" />
                <BulletPoint text="Endereço de e-mail" />
                <BulletPoint text="Foto de perfil (opcional)" />
              </SubSection>
              <SubSection title="Dados de Uso:">
                <BulletPoint text="Informações sobre suas plantas e estufas" />
                <BulletPoint text="Preferências de configuração" />
                <BulletPoint text="Logs de uso do aplicativo" />
              </SubSection>
              <SubSection title="Dados Técnicos:">
                <BulletPoint text="Tipo de dispositivo" />
                <BulletPoint text="Sistema operacional" />
                <BulletPoint text="Endereço IP" />
              </SubSection>
            </Section>

            <Section title="2. Como Usamos Suas Informações">
              <Text style={styles.paragraph}>
                Utilizamos suas informações para:
              </Text>
              <BulletPoint text="Fornecer e manter nosso serviço" />
              <BulletPoint text="Personalizar sua experiência no aplicativo" />
              <BulletPoint text="Enviar notificações importantes" />
              <BulletPoint text="Melhorar e desenvolver novos recursos" />
              <BulletPoint text="Garantir a segurança do aplicativo" />
            </Section>

            <Section title="3. Compartilhamento de Informações">
              <Text style={styles.paragraph}>
                Não vendemos suas informações pessoais. Podemos compartilhar seus dados apenas nas 
                seguintes situações:
              </Text>
              <BulletPoint text="Com seu consentimento explícito" />
              <BulletPoint text="Para cumprir obrigações legais" />
              <BulletPoint text="Com prestadores de serviços essenciais" />
              <BulletPoint text="Em caso de fusão ou aquisição da empresa" />
            </Section>

            <Section title="4. Armazenamento e Segurança">
              <Text style={styles.paragraph}>
                Seus dados são armazenados em servidores seguros e implementamos medidas de 
                segurança técnicas e organizacionais apropriadas para proteger suas informações 
                contra acesso não autorizado, alteração ou destruição.
              </Text>
            </Section>

            <Section title="5. Seus Direitos">
              <Text style={styles.paragraph}>
                Você tem os seguintes direitos sobre seus dados pessoais:
              </Text>
              <BulletPoint text="Acessar e visualizar seus dados" />
              <BulletPoint text="Corrigir informações imprecisas" />
              <BulletPoint text="Solicitar a exclusão de seus dados" />
              <BulletPoint text="Revogar consentimentos fornecidos" />
              <BulletPoint text="Exportar seus dados em formato legível" />
              <Text style={styles.paragraph}>
                Para exercer esses direitos, entre em contato através do e-mail: privacidade@greensync.com
              </Text>
            </Section>

            <Section title="6. Cookies e Tecnologias Similares">
              <Text style={styles.paragraph}>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                analisar o uso do aplicativo e personalizar conteúdo. Você pode controlar 
                o uso de cookies através das configurações do seu navegador.
              </Text>
            </Section>

            <Section title="7. Retenção de Dados">
              <Text style={styles.paragraph}>
                Manteremos suas informações pessoais apenas pelo tempo necessário para 
                cumprir os fins descritos nesta política, a menos que um período de 
                retenção mais longo seja exigido ou permitido por lei.
              </Text>
            </Section>

            <Section title="8. Transferência Internacional">
              <Text style={styles.paragraph}>
                Seus dados podem ser processados em servidores localizados fora do seu 
                país de residência. Garantimos que essas transferências são realizadas 
                com proteções adequadas de acordo com as leis aplicáveis.
              </Text>
            </Section>

            <Section title="9. Alterações nesta Política">
              <Text style={styles.paragraph}>
                Podemos atualizar esta Política de Privacidade periodicamente. 
                Notificaremos você sobre mudanças significativas através do aplicativo 
                ou por e-mail. O uso continuado do GreenSync após as alterações 
                constitui aceitação da nova política.
              </Text>
            </Section>

            <Section title="10. Contato">
              <Text style={styles.paragraph}>
                Se você tiver alguma dúvida sobre esta Política de Privacidade, 
                entre em contato conosco:
              </Text>
              <BulletPoint text="E-mail: privacidade@greensync.com" />
              <BulletPoint text="Site: www.greensync.com/privacidade" />
              <BulletPoint text="Telefone: (11) 99999-9999" />
            </Section>

            <View style={styles.avisoImportante}>
              <FontAwesome5 name="shield-alt" size={20} color={COLORS.info} />
              <Text style={styles.avisoTexto}>
                Sua privacidade é nossa prioridade. Estamos comprometidos em proteger 
                suas informações pessoais e ser transparentes sobre como as utilizamos.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Componente de Seção
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

// Componente de Subseção
const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.subSection}>
    <Text style={styles.subSectionTitle}>{title}</Text>
    {children}
  </View>
);

// Componente de Item com Bullet
const BulletPoint = ({ text }: { text: string }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

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
    marginBottom: 8,
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
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  content: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subSection: {
    marginBottom: 12,
    marginLeft: 8,
  },
  subSectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bullet: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    marginRight: 8,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
  bulletText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
  avisoImportante: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.greenLight,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  avisoTexto: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginLeft: 12,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.sm,
  },
});
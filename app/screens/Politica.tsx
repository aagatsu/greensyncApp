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
import { useTheme } from '@/context/ThemeContext'; // NOVA IMPORT
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function PoliticaPrivacidade() {
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK

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
            <Text style={[styles.title, { color: colors.primary }]}>Política de Privacidade</Text>
            <View style={styles.headerSpacer} />
          </View>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </Text>

          {/* Conteúdo da Política */}
          <View style={styles.content}>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              Esta Política de Privacidade descreve como o GreenSync coleta, usa e compartilha 
              suas informações pessoais quando você usa nosso aplicativo.
            </Text>

            <Section title="1. Informações que Coletamos" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Coletamos os seguintes tipos de informações:
              </Text>
              <SubSection title="Informações Pessoais:" colors={colors}>
                <BulletPoint text="Nome completo" colors={colors} />
                <BulletPoint text="Endereço de e-mail" colors={colors} />
                <BulletPoint text="Foto de perfil (opcional)" colors={colors} />
              </SubSection>
              <SubSection title="Dados de Uso:" colors={colors}>
                <BulletPoint text="Informações sobre suas plantas e estufas" colors={colors} />
                <BulletPoint text="Preferências de configuração" colors={colors} />
                <BulletPoint text="Logs de uso do aplicativo" colors={colors} />
              </SubSection>
              <SubSection title="Dados Técnicos:" colors={colors}>
                <BulletPoint text="Tipo de dispositivo" colors={colors} />
                <BulletPoint text="Sistema operacional" colors={colors} />
                <BulletPoint text="Endereço IP" colors={colors} />
              </SubSection>
            </Section>

            <Section title="2. Como Usamos Suas Informações" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Utilizamos suas informações para:
              </Text>
              <BulletPoint text="Fornecer e manter nosso serviço" colors={colors} />
              <BulletPoint text="Personalizar sua experiência no aplicativo" colors={colors} />
              <BulletPoint text="Enviar notificações importantes" colors={colors} />
              <BulletPoint text="Melhorar e desenvolver novos recursos" colors={colors} />
              <BulletPoint text="Garantir a segurança do aplicativo" colors={colors} />
            </Section>

            <Section title="3. Compartilhamento de Informações" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Não vendemos suas informações pessoais. Podemos compartilhar seus dados apenas nas 
                seguintes situações:
              </Text>
              <BulletPoint text="Com seu consentimento explícito" colors={colors} />
              <BulletPoint text="Para cumprir obrigações legais" colors={colors} />
              <BulletPoint text="Com prestadores de serviços essenciais" colors={colors} />
              <BulletPoint text="Em caso de fusão ou aquisição da empresa" colors={colors} />
            </Section>

            <Section title="4. Armazenamento e Segurança" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Seus dados são armazenados em servidores seguros e implementamos medidas de 
                segurança técnicas e organizacionais apropriadas para proteger suas informações 
                contra acesso não autorizado, alteração ou destruição.
              </Text>
            </Section>

            <Section title="5. Seus Direitos" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Você tem os seguintes direitos sobre seus dados pessoais:
              </Text>
              <BulletPoint text="Acessar e visualizar seus dados" colors={colors} />
              <BulletPoint text="Corrigir informações imprecisas" colors={colors} />
              <BulletPoint text="Solicitar a exclusão de seus dados" colors={colors} />
              <BulletPoint text="Revogar consentimentos fornecidos" colors={colors} />
              <BulletPoint text="Exportar seus dados em formato legível" colors={colors} />
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Para exercer esses direitos, entre em contato através do e-mail: privacidade@greensync.com
              </Text>
            </Section>

            <Section title="6. Cookies e Tecnologias Similares" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                analisar o uso do aplicativo e personalizar conteúdo. Você pode controlar 
                o uso de cookies através das configurações do seu navegador.
              </Text>
            </Section>

            <Section title="7. Retenção de Dados" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Manteremos suas informações pessoais apenas pelo tempo necessário para 
                cumprir os fins descritos nesta política, a menos que um período de 
                retenção mais longo seja exigido ou permitido por lei.
              </Text>
            </Section>

            <Section title="8. Transferência Internacional" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Seus dados podem ser processados em servidores localizados fora do seu 
                país de residência. Garantimos que essas transferências são realizadas 
                com proteções adequadas de acordo com as leis aplicáveis.
              </Text>
            </Section>

            <Section title="9. Alterações nesta Política" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Podemos atualizar esta Política de Privacidade periodicamente. 
                Notificaremos você sobre mudanças significativas através do aplicativo 
                ou por e-mail. O uso continuado do GreenSync após as alterações 
                constitui aceitação da nova política.
              </Text>
            </Section>

            <Section title="10. Contato" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Se você tiver alguma dúvida sobre esta Política de Privacidade, 
                entre em contato conosco:
              </Text>
              <BulletPoint text="E-mail: privacidade@greensync.com" colors={colors} />
              <BulletPoint text="Site: www.greensync.com/privacidade" colors={colors} />
              <BulletPoint text="Telefone: (11) 99999-9999" colors={colors} />
            </Section>

            <View style={[styles.avisoImportante, { backgroundColor: colors.greenLight }]}>
              <FontAwesome5 name="shield-alt" size={20} color={colors.info} />
              <Text style={[styles.avisoTexto, { color: colors.textPrimary }]}>
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
const Section = ({ title, children, colors }: { title: string; children: React.ReactNode; colors: any }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{title}</Text>
    {children}
  </View>
);

// Componente de Subseção
const SubSection = ({ title, children, colors }: { title: string; children: React.ReactNode; colors: any }) => (
  <View style={styles.subSection}>
    <Text style={[styles.subSectionTitle, { color: colors.textPrimary }]}>{title}</Text>
    {children}
  </View>
);

// Componente de Item com Bullet
const BulletPoint = ({ text, colors }: { text: string; colors: any }) => (
  <View style={styles.bulletItem}>
    <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
    <Text style={[styles.bulletText, { color: colors.textSecondary }]}>{text}</Text>
  </View>
);

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
    fontSize: TYPOGRAPHY.fontSize.sm,
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
    marginBottom: 8,
  },
  subSection: {
    marginBottom: 12,
    marginLeft: 8,
  },
  subSectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: TYPOGRAPHY.fontSize.base,
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
    marginRight: 8,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
  bulletText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.base,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
  },
  avisoImportante: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  avisoTexto: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginLeft: 12,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.sm,
  },
});
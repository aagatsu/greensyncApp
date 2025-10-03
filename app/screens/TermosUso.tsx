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

export default function TermosUso() {
  const router = useRouter();

  const handleVoltar = () => {
    router.back();
  };

  const handleAceitarTermos = () => {
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
            <Text style={styles.title}>Termos de Uso</Text>
            <View style={styles.headerSpacer} />
          </View>

          <Text style={styles.subtitle}>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </Text>

          {/* Conteúdo dos Termos */}
          <View style={styles.content}>
            <Text style={styles.paragraph}>
              Bem-vindo ao GreenSync. Ao utilizar nosso aplicativo, você concorda com estes termos de uso. 
              Leia-os cuidadosamente antes de usar nossos serviços.
            </Text>

            <Section title="1. Aceitação dos Termos">
              <Text style={styles.paragraph}>
                Ao acessar e usar o GreenSync, você aceita e concorda em ficar vinculado pelos 
                presentes Termos de Uso e pela nossa Política de Privacidade.
              </Text>
            </Section>

            <Section title="2. Uso do Aplicativo">
              <Text style={styles.paragraph}>
                Você concorda em usar o GreenSync apenas para fins legais e de acordo com estes Termos. 
                É proibido:
              </Text>
              <BulletPoint text="Utilizar o aplicativo de maneira fraudulenta ou enganosa" />
              <BulletPoint text="Tentar acessar áreas restritas do sistema" />
              <BulletPoint text="Violar qualquer lei ou regulamento aplicável" />
              <BulletPoint text="Coletar dados de outros usuários sem autorização" />
            </Section>

            <Section title="3. Cadastro e Conta">
              <Text style={styles.paragraph}>
                Para usar certas funcionalidades do GreenSync, você precisará criar uma conta. 
                Você é responsável por:
              </Text>
              <BulletPoint text="Manter a confidencialidade de sua senha" />
              <BulletPoint text="Toda atividade que ocorrer em sua conta" />
              <BulletPoint text="Fornecer informações precisas e atualizadas" />
              <Text style={styles.paragraph}>
                Reservamo-nos o direito de encerrar contas que violarem estes Termos.
              </Text>
            </Section>

            <Section title="4. Propriedade Intelectual">
              <Text style={styles.paragraph}>
                Todo o conteúdo do GreenSync, incluindo logos, designs, textos e funcionalidades, 
                são de nossa propriedade ou de nossos licenciadores e estão protegidos por leis 
                de propriedade intelectual.
              </Text>
            </Section>

            <Section title="5. Dados e Privacidade">
              <Text style={styles.paragraph}>
                Sua privacidade é importante para nós. Nossa coleta e uso de dados pessoais estão 
                descritos em nossa Política de Privacidade. Ao usar o GreenSync, você concorda com 
                essa coleta e uso.
              </Text>
            </Section>

            <Section title="6. Limitação de Responsabilidade">
              <Text style={styles.paragraph}>
                O GreenSync é fornecido "no estado em que se encontra". Não garantimos que o 
                aplicativo será ininterrupto ou livre de erros. Em nenhum caso seremos responsáveis 
                por quaisquer danos indiretos ou consequenciais.
              </Text>
            </Section>

            <Section title="7. Modificações nos Termos">
              <Text style={styles.paragraph}>
                Podemos modificar estes Termos a qualquer momento. Notificaremos você sobre 
                mudanças significativas. O uso continuado do aplicativo após as modificações 
                constitui aceitação dos novos Termos.
              </Text>
            </Section>

            <Section title="8. Lei Aplicável">
              <Text style={styles.paragraph}>
                Estes Termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida 
                nos tribunais competentes de São Paulo, SP.
              </Text>
            </Section>

            <Section title="9. Contato">
              <Text style={styles.paragraph}>
                Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco através 
                do e-mail: legal@greensync.com
              </Text>
            </Section>

            <View style={styles.avisoImportante}>
              <FontAwesome5 name="exclamation-triangle" size={20} color={COLORS.warning} />
              <Text style={styles.avisoTexto}>
                Ao usar o GreenSync, você confirma que leu, compreendeu e concorda com estes Termos de Uso.
              </Text>
            </View>
          </View>

          {/* Botão de Aceitação */}
          <TouchableOpacity style={styles.botaoAceitar} onPress={handleAceitarTermos}>
            <FontAwesome5 name="check" size={16} color={COLORS.textInverse} />
            <Text style={styles.botaoAceitarTexto}>Li e Aceito os Termos</Text>
          </TouchableOpacity>
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
    backgroundColor: COLORS.goldLight,
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
  botaoAceitar: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botaoAceitarTexto: {
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
});
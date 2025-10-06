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

export default function TermosUso() {
  const router = useRouter();
  const { colors } = useTheme(); // NOVO HOOK

  const handleVoltar = () => {
    router.back();
  };

  const handleAceitarTermos = () => {
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
            <Text style={[styles.title, { color: colors.primary }]}>Termos de Uso</Text>
            <View style={styles.headerSpacer} />
          </View>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </Text>

          {/* Conteúdo dos Termos */}
          <View style={styles.content}>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              Bem-vindo ao GreenSync. Ao utilizar nosso aplicativo, você concorda com estes termos de uso. 
              Leia-os cuidadosamente antes de usar nossos serviços.
            </Text>

            <Section title="1. Aceitação dos Termos" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Ao acessar e usar o GreenSync, você aceita e concorda em ficar vinculado pelos 
                presentes Termos de Uso e pela nossa Política de Privacidade.
              </Text>
            </Section>

            <Section title="2. Uso do Aplicativo" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Você concorda em usar o GreenSync apenas para fins legais e de acordo com estes Termos. 
                É proibido:
              </Text>
              <BulletPoint text="Utilizar o aplicativo de maneira fraudulenta ou enganosa" colors={colors} />
              <BulletPoint text="Tentar acessar áreas restritas do sistema" colors={colors} />
              <BulletPoint text="Violar qualquer lei ou regulamento aplicável" colors={colors} />
              <BulletPoint text="Coletar dados de outros usuários sem autorização" colors={colors} />
            </Section>

            <Section title="3. Cadastro e Conta" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Para usar certas funcionalidades do GreenSync, você precisará criar uma conta. 
                Você é responsável por:
              </Text>
              <BulletPoint text="Manter a confidencialidade de sua senha" colors={colors} />
              <BulletPoint text="Toda atividade que ocorrer em sua conta" colors={colors} />
              <BulletPoint text="Fornecer informações precisas e atualizadas" colors={colors} />
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Reservamo-nos o direito de encerrar contas que violarem estes Termos.
              </Text>
            </Section>

            <Section title="4. Propriedade Intelectual" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Todo o conteúdo do GreenSync, incluindo logos, designs, textos e funcionalidades, 
                são de nossa propriedade ou de nossos licenciadores e estão protegidos por leis 
                de propriedade intelectual.
              </Text>
            </Section>

            <Section title="5. Dados e Privacidade" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Sua privacidade é importante para nós. Nossa coleta e uso de dados pessoais estão 
                descritos em nossa Política de Privacidade. Ao usar o GreenSync, você concorda com 
                essa coleta e uso.
              </Text>
            </Section>

            <Section title="6. Limitação de Responsabilidade" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                O GreenSync é fornecido "no estado em que se encontra". Não garantimos que o 
                aplicativo será ininterrupto ou livre de erros. Em nenhum caso seremos responsáveis 
                por quaisquer danos indiretos ou consequenciais.
              </Text>
            </Section>

            <Section title="7. Modificações nos Termos" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Podemos modificar estes Termos a qualquer momento. Notificaremos você sobre 
                mudanças significativas. O uso continuado do aplicativo após as modificações 
                constitui aceitação dos novos Termos.
              </Text>
            </Section>

            <Section title="8. Lei Aplicável" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Estes Termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida 
                nos tribunais competentes de São Paulo, SP.
              </Text>
            </Section>

            <Section title="9. Contato" colors={colors}>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Em caso de dúvidas sobre estes Termos de Uso, entre em contato conosco através 
                do e-mail: legal@greensync.com
              </Text>
            </Section>

            <View style={[styles.avisoImportante, { backgroundColor: colors.goldLight }]}>
              <FontAwesome5 name="exclamation-triangle" size={20} color={colors.warning} />
              <Text style={[styles.avisoTexto, { color: colors.textPrimary }]}>
                Ao usar o GreenSync, você confirma que leu, compreendeu e concorda com estes Termos de Uso.
              </Text>
            </View>
          </View>

          {/* Botão de Aceitação */}
          <TouchableOpacity 
            style={[styles.botaoAceitar, { backgroundColor: colors.primary }]} 
            onPress={handleAceitarTermos}
          >
            <FontAwesome5 name="check" size={16} color={colors.white} />
            <Text style={[styles.botaoAceitarTexto, { color: colors.white }]}>Li e Aceito os Termos</Text>
          </TouchableOpacity>
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
  botaoAceitar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botaoAceitarTexto: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { TYPOGRAPHY } from '@/constants/Fontes';

// Interface para as props do ConfigItem
interface ConfigItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  showArrow?: boolean;
  colors: any;
}

// Interface para as props do SectionTitle
interface SectionTitleProps {
  title: string;
  colors: any;
}

// Componente ConfigItem com tipagem correta
const ConfigItem: React.FC<ConfigItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showSwitch = false, 
  switchValue = false, 
  onSwitchChange = () => {},
  showArrow = true,
  colors 
}) => (
  <TouchableOpacity 
    style={[styles.configItem, { backgroundColor: colors.gray50 }]} 
    onPress={onPress} 
    disabled={showSwitch}
  >
    <View style={styles.configItemLeft}>
      <View style={[styles.configIcon, { backgroundColor: colors.greenLight }]}>
        <FontAwesome5 name={icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.configText}>
        <Text style={[styles.configTitle, { color: colors.textPrimary }]}>{title}</Text>
        {subtitle && <Text style={[styles.configSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
      </View>
    </View>
    
    <View style={styles.configItemRight}>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.gray400, true: colors.primaryLight }}
          thumbColor={switchValue ? colors.primary : colors.gray200}
        />
      ) : showArrow ? (
        <FontAwesome5 name="chevron-right" size={14} color={colors.textDisabled} />
      ) : null}
    </View>
  </TouchableOpacity>
);

// Componente SectionTitle
const SectionTitle: React.FC<SectionTitleProps> = ({ title, colors }) => (
  <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{title}</Text>
);

export default function Configuracoes() {
  const router = useRouter();
  const { usuario, logout } = useAuth();
  const { isDark, toggleTheme, colors } = useTheme();

  // Estados para as configurações
  const [notificacoes, setNotificacoes] = useState(true);
  const [notificacoesEmail, setNotificacoesEmail] = useState(false);
  const [dadosMoveis, setDadosMoveis] = useState(true);
  const [localizacao, setLocalizacao] = useState(true);
  const [backupAutomatico, setBackupAutomatico] = useState(true);

  const handleVoltar = () => {
    router.back();
  };

  const handleEditarPerfil = () => {
    router.push('/screens/EditarPerfil');
  };

  const handleAlterarSenha = () => {
    Alert.alert("Alterar Senha", "Funcionalidade em desenvolvimento");
  };

  const handleNotificacoes = () => {
    setNotificacoes(!notificacoes);
    if (!notificacoes) {
      Alert.alert("Notificações ativadas", "Você receberá alertas importantes sobre suas plantas.");
    }
  };

  const handleLimparCache = () => {
    Alert.alert(
      "Limpar Cache",
      "Tem certeza que deseja limpar o cache do aplicativo?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Limpar", 
          style: "destructive",
          onPress: () => {
            Alert.alert("Sucesso", "Cache limpo com sucesso!");
          }
        }
      ]
    );
  };

  const handleExportarDados = () => {
    Alert.alert("Exportar Dados", "Funcionalidade em desenvolvimento");
  };

  const handleSobre = () => {
    router.push('/(tabs)/Sobre');
  };

  const handleSuporte = () => {
    router.push('/screens/Suporte')
  };

  const handleSair = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: () => {
            logout();
            router.replace('/TelaLogin');
          }
        }
      ]
    );
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
            <Text style={[styles.title, { color: colors.primary }]}>Configurações</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Informações do Usuário */}
          <View style={[styles.userInfo, { backgroundColor: colors.gray50 }]}>
            <View style={[styles.avatar, { backgroundColor: colors.greenLight }]}>
              <FontAwesome5 name="user" size={24} color={colors.primary} />
            </View>
            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: colors.textPrimary }]}>{usuario?.nome || 'Usuário'}</Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{usuario?.email}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.editButton, { borderColor: colors.primary }]} 
              onPress={handleEditarPerfil}
            >
              <FontAwesome5 name="edit" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Conta */}
          <View style={styles.section}>
            <SectionTitle title="Conta" colors={colors} />
            <ConfigItem 
              icon="user-edit"
              title="Editar Perfil"
              subtitle="Altere suas informações pessoais"
              onPress={handleEditarPerfil}
              colors={colors}
            />
            <ConfigItem 
              icon="lock"
              title="Alterar Senha"
              subtitle="Atualize sua senha de acesso"
              onPress={handleAlterarSenha}
              colors={colors}
            />
            <ConfigItem 
              icon="database"
              title="Exportar Dados"
              subtitle="Baixe seus dados em PDF"
              onPress={handleExportarDados}
              colors={colors}
            />
          </View>

          {/* Notificações */}
          <View style={styles.section}>
            <SectionTitle title="Notificações" colors={colors} />
            <ConfigItem 
              icon="bell"
              title="Notificações Push"
              subtitle="Receba alertas importantes"
              showSwitch={true}
              switchValue={notificacoes}
              onSwitchChange={handleNotificacoes}
              colors={colors}
            />
            <ConfigItem 
              icon="envelope"
              title="Notificações por E-mail"
              subtitle="Receba relatórios por e-mail"
              showSwitch={true}
              switchValue={notificacoesEmail}
              onSwitchChange={setNotificacoesEmail}
              colors={colors}
            />
          </View>

          {/* Preferências */}
          <View style={styles.section}>
            <SectionTitle title="Preferências" colors={colors} />
            <ConfigItem 
              icon="moon"
              title="Modo Escuro"
              subtitle="Interface com tema escuro"
              showSwitch={true}
              switchValue={isDark}
              onSwitchChange={toggleTheme}
              colors={colors}
            />
            <ConfigItem 
              icon="wifi"
              title="Usar Dados Móveis"
              subtitle="Sincronizar usando dados móveis"
              showSwitch={true}
              switchValue={dadosMoveis}
              onSwitchChange={setDadosMoveis}
              colors={colors}
            />
            <ConfigItem 
              icon="map-marker-alt"
              title="Compartilhar Localização"
              subtitle="Para recomendações climáticas"
              showSwitch={true}
              switchValue={localizacao}
              onSwitchChange={setLocalizacao}
              colors={colors}
            />
          </View>

          {/* Privacidade e Segurança */}
          <View style={styles.section}>
            <SectionTitle title="Privacidade e Segurança" colors={colors} />
            <ConfigItem 
              icon="shield-alt"
              title="Backup Automático"
              subtitle="Salve seus dados na nuvem"
              showSwitch={true}
              switchValue={backupAutomatico}
              onSwitchChange={setBackupAutomatico}
              colors={colors}
            />
            <ConfigItem 
              icon="trash"
              title="Limpar Cache"
              subtitle="Libere espaço no dispositivo"
              onPress={handleLimparCache}
              colors={colors}
            />
          </View>

          {/* Ajuda e Suporte */}
          <View style={styles.section}>
            <SectionTitle title="Ajuda e Suporte" colors={colors} />
            <ConfigItem 
              icon="info-circle"
              title="Sobre o App"
              subtitle="Versão e informações"
              onPress={handleSobre}
              colors={colors}
            />
            <ConfigItem 
              icon="headset"
              title="Suporte"
              subtitle="Entre em contato conosco"
              onPress={handleSuporte}
              colors={colors}
            />
          </View>

          {/* Sair */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={[styles.logoutButton, { backgroundColor: colors.error }]} 
              onPress={handleSair}
            >
              <FontAwesome5 name="sign-out-alt" size={18} color={colors.white} />
              <Text style={[styles.logoutText, { color: colors.white }]}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>

          {/* Informações do App */}
          <View style={[styles.appInfo, { borderTopColor: colors.border }]}>
            <Text style={[styles.appVersion, { color: colors.textSecondary }]}>GreenSync v1.0.0</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
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
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 12,
    marginLeft: 8,
  },
  configItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  configItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  configIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  configText: {
    flex: 1,
  },
  configTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    marginBottom: 2,
  },
  configSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  configItemRight: {
    marginLeft: 12,
  },
  logoutButton: {
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
  logoutText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
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
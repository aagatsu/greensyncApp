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
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
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
  showArrow = true 
}) => (
  <TouchableOpacity style={styles.configItem} onPress={onPress} disabled={showSwitch}>
    <View style={styles.configItemLeft}>
      <View style={styles.configIcon}>
        <FontAwesome5 name={icon} size={18} color={COLORS.primary} />
      </View>
      <View style={styles.configText}>
        <Text style={styles.configTitle}>{title}</Text>
        {subtitle && <Text style={styles.configSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    
    <View style={styles.configItemRight}>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: COLORS.gray400, true: COLORS.greenMuted }}
          thumbColor={switchValue ? COLORS.primary : COLORS.gray100}
        />
      ) : showArrow ? (
        <FontAwesome5 name="chevron-right" size={14} color={COLORS.textDisabled} />
      ) : null}
    </View>
  </TouchableOpacity>
);

// Interface para as props do SectionTitle
interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

export default function Configuracoes() {
  const router = useRouter();
  const { usuario, logout } = useAuth();

  // Estados para as configurações
  const [notificacoes, setNotificacoes] = useState(true);
  const [notificacoesEmail, setNotificacoesEmail] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(false);
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
            <Text style={styles.title}>Configurações</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Informações do Usuário */}
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <FontAwesome5 name="user" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{usuario?.nome || 'Usuário'}</Text>
              <Text style={styles.userEmail}>{usuario?.email}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditarPerfil}>
              <FontAwesome5 name="edit" size={14} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Conta */}
          <View style={styles.section}>
            <SectionTitle title="Conta" />
            <ConfigItem 
              icon="user-edit"
              title="Editar Perfil"
              subtitle="Altere suas informações pessoais"
              onPress={handleEditarPerfil}
            />
            <ConfigItem 
              icon="lock"
              title="Alterar Senha"
              subtitle="Atualize sua senha de acesso"
              onPress={handleAlterarSenha}
            />
            <ConfigItem 
              icon="database"
              title="Exportar Dados"
              subtitle="Baixe seus dados em PDF"
              onPress={handleExportarDados}
            />
          </View>

          {/* Notificações */}
          <View style={styles.section}>
            <SectionTitle title="Notificações" />
            <ConfigItem 
              icon="bell"
              title="Notificações Push"
              subtitle="Receba alertas importantes"
              showSwitch={true}
              switchValue={notificacoes}
              onSwitchChange={handleNotificacoes}
            />
            <ConfigItem 
              icon="envelope"
              title="Notificações por E-mail"
              subtitle="Receba relatórios por e-mail"
              showSwitch={true}
              switchValue={notificacoesEmail}
              onSwitchChange={setNotificacoesEmail}
            />
          </View>

          {/* Preferências */}
          <View style={styles.section}>
            <SectionTitle title="Preferências" />
            <ConfigItem 
              icon="moon"
              title="Modo Escuro"
              subtitle="Interface com tema escuro"
              showSwitch={true}
              switchValue={modoEscuro}
              onSwitchChange={setModoEscuro}
            />
            <ConfigItem 
              icon="wifi"
              title="Usar Dados Móveis"
              subtitle="Sincronizar usando dados móveis"
              showSwitch={true}
              switchValue={dadosMoveis}
              onSwitchChange={setDadosMoveis}
            />
            <ConfigItem 
              icon="map-marker-alt"
              title="Compartilhar Localização"
              subtitle="Para recomendações climáticas"
              showSwitch={true}
              switchValue={localizacao}
              onSwitchChange={setLocalizacao}
            />
          </View>

          {/* Privacidade e Segurança */}
          <View style={styles.section}>
            <SectionTitle title="Privacidade e Segurança" />
            <ConfigItem 
              icon="shield-alt"
              title="Backup Automático"
              subtitle="Salve seus dados na nuvem"
              showSwitch={true}
              switchValue={backupAutomatico}
              onSwitchChange={setBackupAutomatico}
            />
            <ConfigItem 
              icon="trash"
              title="Limpar Cache"
              subtitle="Libere espaço no dispositivo"
              onPress={handleLimparCache}
            />
          </View>

          {/* Ajuda e Suporte */}
          <View style={styles.section}>
            <SectionTitle title="Ajuda e Suporte" />
            <ConfigItem 
              icon="info-circle"
              title="Sobre o App"
              subtitle="Versão e informações"
              onPress={handleSobre}
            />
            <ConfigItem 
              icon="headset"
              title="Suporte"
              subtitle="Entre em contato conosco"
              onPress={handleSuporte}
            />
          </View>

          {/* Sair */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleSair}>
              <FontAwesome5 name="sign-out-alt" size={18} color={COLORS.textInverse} />
              <Text style={styles.logoutText}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>

          {/* Informações do App */}
          <View style={styles.appInfo}>
            <Text style={styles.appVersion}>GreenSync v1.0.0</Text>
            <Text style={styles.appCopyright}>© 2024 GreenSync. Todos os direitos reservados.</Text>
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
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.greenLight,
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
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: 12,
    marginLeft: 8,
  },
  configItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.gray50,
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
    backgroundColor: COLORS.greenLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  configText: {
    flex: 1,
  },
  configTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  configSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  configItemRight: {
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
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
  logoutText: {
    color: COLORS.textInverse,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginLeft: 8,
  },
  appInfo: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  appVersion: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textDisabled,
    textAlign: "center",
  },
});
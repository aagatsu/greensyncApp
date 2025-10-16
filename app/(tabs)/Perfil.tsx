import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function Perfil() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { colors } = useTheme();
  const [carregandoLogout, setCarregandoLogout] = useState(false);

  const handleLogout = async () => {
    setCarregandoLogout(true);
    
    try {
      const result = await logout();
      
      if (result.success) {
        // Logout bem-sucedido, redireciona para tela de login
        router.replace('/TelaLogin');
      } else {
        console.error("Erro no logout:", result.error);
        // Você pode mostrar um toast ou mensagem de erro aqui se quiser
      }
    } catch (error) {
      console.error("Erro inesperado no logout:", error);
    } finally {
      setCarregandoLogout(false);
    }
  };

  const handleEditarPerfil = () => {
    router.push('/screens/EditarPerfil');
  };

  const handleConfiguracoes = () => {
    router.push('/screens/Configuracoes');
  };

  const handleAjuda = () => {
    router.push('/screens/Suporte');
  };

  // Dados do usuário do Firebase
  const usuario = {
    nome: user?.displayName || 'Usuário',
    email: user?.email || 'Não informado',
    id: user?.uid || 'N/A'
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.box, { backgroundColor: colors.surface }]}>
          {/* Header do Perfil */}
          <View style={[styles.header, { borderBottomColor: colors.borderLight }]}>
            <View style={[styles.avatarContainer, { backgroundColor: colors.greenLight }]}>
              <FontAwesome5 name="user" size={40} color={colors.primary} />
            </View>
            <Text style={[styles.nome, { color: colors.textPrimary }]}>{usuario.nome}</Text>
            <Text style={[styles.email, { color: colors.textSecondary }]}>{usuario.email}</Text>
            <Text style={[styles.membroDesde, { color: colors.textDisabled }]}>Membro desde Jan 2024</Text>
          </View>

          {/* Informações da Conta */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Informações da Conta</Text>
            
            <View style={[styles.infoCard, { backgroundColor: colors.gray50 }]}>
              <View style={styles.infoItem}>
                <FontAwesome5 name="envelope" size={16} color={colors.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>E-mail</Text>
                  <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{usuario.email}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <FontAwesome5 name="id-card" size={16} color={colors.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>ID do Usuário</Text>
                  <Text style={[styles.infoValue, { color: colors.textPrimary }]} numberOfLines={1} ellipsizeMode="middle">
                    {usuario.id.substring(0, 8)}...
                  </Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <FontAwesome5 name="calendar" size={16} color={colors.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Status da Conta</Text>
                  <Text style={[styles.statusAtivo, { color: colors.success }]}>Ativa</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Estatísticas */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Minhas Estatísticas</Text>
            
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: colors.gray50 }]}>
                <FontAwesome5 name="seedling" size={20} color={colors.primary} />
                <Text style={[styles.statNumber, { color: colors.primary }]}>12</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Plantas</Text>
              </View>

              <View style={[styles.statCard, { backgroundColor: colors.gray50 }]}>
                <FontAwesome5 name="warehouse" size={20} color={colors.info} />
                <Text style={[styles.statNumber, { color: colors.info }]}>3</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Estufas</Text>
              </View>

              <View style={[styles.statCard, { backgroundColor: colors.gray50 }]}>
                <FontAwesome5 name="chart-line" size={20} color={colors.warning} />
                <Text style={[styles.statNumber, { color: colors.warning }]}>95%</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Sucesso</Text>
              </View>
            </View>
          </View>

          {/* Ações Rápidas */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Ações Rápidas</Text>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: colors.gray50 }]} 
              onPress={handleEditarPerfil}
            >
              <FontAwesome5 name="user-edit" size={18} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.textPrimary }]}>Editar Perfil</Text>
              <FontAwesome5 name="chevron-right" size={14} color={colors.textDisabled} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: colors.gray50 }]} 
              onPress={handleConfiguracoes}
            >
              <FontAwesome5 name="cog" size={18} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.textPrimary }]}>Configurações</Text>
              <FontAwesome5 name="chevron-right" size={14} color={colors.textDisabled} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: colors.gray50 }]} 
              onPress={handleAjuda}
            >
              <FontAwesome5 name="question-circle" size={18} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.textPrimary }]}>Ajuda & Suporte</Text>
              <FontAwesome5 name="chevron-right" size={14} color={colors.textDisabled} />
            </TouchableOpacity>
          </View>

          {/* Botão de Logout */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={[
                styles.logoutButton, 
                { backgroundColor: colors.error },
                carregandoLogout && { opacity: 0.7 }
              ]} 
              onPress={handleLogout}
              disabled={carregandoLogout}
            >
              {carregandoLogout ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <>
                  <FontAwesome5 name="sign-out-alt" size={18} color={colors.white} />
                  <Text style={[styles.logoutText, { color: colors.white }]}>Sair da Conta</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Informações do App */}
          <View style={[styles.appInfo, { borderTopColor: colors.borderLight }]}>
            <Text style={[styles.appVersion, { color: colors.textSecondary }]}>GreenSync v1.0.0</Text>
            <Text style={[styles.appCopyright, { color: colors.textDisabled }]}>© 2024 GreenSync. Todos os direitos reservados.</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Mantenha os mesmos estilos...
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
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  nome: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 4,
  },
  email: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    marginBottom: 8,
  },
  membroDesde: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  statusAtivo: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginTop: 8,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    marginTop: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  actionText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
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
    fontSize: TYPOGRAPHY.fontSize.lg,
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
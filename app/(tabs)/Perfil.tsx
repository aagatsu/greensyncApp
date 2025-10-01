import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

export default function Perfil() {
  const { usuario, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const handleEditarPerfil = () => {
    router.push('/screens/EditarPerfil')
  };

  const handleConfiguracoes = () => {
    router.push('/screens/Configuracoes')
  };

  const handleAjuda = () => {
    router.push('/screens/Suporte')
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.box}>
          {/* Header do Perfil */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <FontAwesome5 name="user" size={40} color={COLORS.primary} />
            </View>
            <Text style={styles.nome}>{usuario?.nome || 'Usuário'}</Text>
            <Text style={styles.email}>{usuario?.email}</Text>
            <Text style={styles.membroDesde}>Membro desde Jan 2024</Text>
          </View>

          {/* Informações da Conta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações da Conta</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <FontAwesome5 name="envelope" size={16} color={COLORS.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>E-mail</Text>
                  <Text style={styles.infoValue}>{usuario?.email}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <FontAwesome5 name="id-card" size={16} color={COLORS.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>ID do Usuário</Text>
                  <Text style={styles.infoValue}>{usuario?.id || 'N/A'}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <FontAwesome5 name="calendar" size={16} color={COLORS.textSecondary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Status da Conta</Text>
                  <Text style={styles.statusAtivo}>Ativa</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Estatísticas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Minhas Estatísticas</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <FontAwesome5 name="seedling" size={20} color={COLORS.primary} />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Plantas</Text>
              </View>

              <View style={styles.statCard}>
                <FontAwesome5 name="warehouse" size={20} color={COLORS.info} />
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Estufas</Text>
              </View>

              <View style={styles.statCard}>
                <FontAwesome5 name="chart-line" size={20} color={COLORS.warning} />
                <Text style={styles.statNumber}>95%</Text>
                <Text style={styles.statLabel}>Sucesso</Text>
              </View>
            </View>
          </View>

          {/* Ações Rápidas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleEditarPerfil}>
              <FontAwesome5 name="user-edit" size={18} color={COLORS.primary} />
              <Text style={styles.actionText}>Editar Perfil</Text>
              <FontAwesome5 name="chevron-right" size={14} color={COLORS.textDisabled} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleConfiguracoes}>
              <FontAwesome5 name="cog" size={18} color={COLORS.primary} />
              <Text style={styles.actionText}>Configurações</Text>
              <FontAwesome5 name="chevron-right" size={14} color={COLORS.textDisabled} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleAjuda}>
              <FontAwesome5 name="question-circle" size={18} color={COLORS.primary} />
              <Text style={styles.actionText}>Ajuda & Suporte</Text>
              <FontAwesome5 name="chevron-right" size={14} color={COLORS.textDisabled} />
            </TouchableOpacity>
          </View>

          {/* Botão de Logout */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <FontAwesome5 name="sign-out-alt" size={18} color={COLORS.white} />
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
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  nome: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  membroDesde: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textDisabled,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: COLORS.gray50,
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
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
  },
  statusAtivo: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.success,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
    elevation: 1,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  actionText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.textPrimary,
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
    color: COLORS.white,
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
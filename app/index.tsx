// app/index.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/Cores';
import { TYPOGRAPHY } from '@/constants/Fontes';

const { width, height } = Dimensions.get('window');

export default function IndexPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight, '#4CAF50']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Partículas decorativas */}
      <View style={styles.particles}>
        <View style={[styles.particle, styles.particle1]} />
        <View style={[styles.particle, styles.particle2]} />
        <View style={[styles.particle, styles.particle3]} />
        <View style={[styles.particle, styles.particle4]} />
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {/* Header com Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="leaf" size={40} color={COLORS.white} />
            <Text style={styles.logo}>GreenSync</Text>
          </View>
        </View>

        {/* Imagem Central */}
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/logoFundo2.png')}
            style={styles.leaf}
            resizeMode="contain"
          />
          <View style={styles.imageOverlay} />
        </View>

        {/* Cards de Destaque */}
        <View style={styles.features}>
          <View style={styles.featureCard}>
            <FontAwesome5 name="seedling" size={20} color={COLORS.primary} />
            <Text style={styles.featureText}>Gestão Inteligente</Text>
          </View>
          <View style={styles.featureCard}>
            <FontAwesome5 name="chart-line" size={20} color={COLORS.primary} />
            <Text style={styles.featureText}>Monitoramento em Tempo Real</Text>
          </View>
          <View style={styles.featureCard}>
            <FontAwesome5 name="mobile-alt" size={20} color={COLORS.primary} />
            <Text style={styles.featureText}>Controle Remoto</Text>
          </View>
        </View>

        {/* Área de Botões */}
        <View style={styles.buttonsContainer}>
          {/* Botão Login */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/TelaLogin')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[COLORS.secondaryLight, COLORS.secondary]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <FontAwesome5 name="sign-in-alt" size={18} color={COLORS.primary} />
              <Text style={styles.loginButtonText}>Entrar na Minha Conta</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Botão Cadastro */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push('/Cadastro')}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>Criar Nova Conta</Text>
            <FontAwesome5 name="arrow-right" size={14} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Juntamente com a natureza 🌱
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
  },
  particle1: {
    width: 100,
    height: 100,
    top: '10%',
    left: '10%',
  },
  particle2: {
    width: 150,
    height: 150,
    top: '60%',
    right: '10%',
  },
  particle3: {
    width: 80,
    height: 80,
    bottom: '20%',
    left: '5%',
  },
  particle4: {
    width: 120,
    height: 120,
    top: '30%',
    right: '5%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    fontSize: TYPOGRAPHY.fontSize['6xl'],
    fontWeight: TYPOGRAPHY.fontWeight.extrabold as any, // Correção aqui
    color: COLORS.white,
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  leaf: {
    width: width * 0.7,
    height: width * 0.7,
    maxWidth: 300,
    maxHeight: 300,
  },
  imageOverlay: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: width * 0.4,
    zIndex: -1,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  featureCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 8,
    borderRadius: 16,
    minWidth: 100,
  },
  featureText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold as any, // Correção aqui
    color: COLORS.white,
    marginTop: 6,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    borderRadius: 25,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  loginButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold as any, // Correção aqui
    marginLeft: 10,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: '100%',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold as any, // Correção aqui
    marginRight: 8,
  },
  guestButton: {
    paddingVertical: 12,
  },
  guestText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontStyle: 'italic',
  },
});
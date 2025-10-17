// screens/PopularBancoScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { useFirebaseDatabase } from '@/hooks/useFirebaseDatabase';
import { useTheme } from '@/context/ThemeContext';

export default function PopularBancoScreen() {
  const { popularBanco, limparBanco, loading, error } = useFirebaseDatabase();
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>('');
  const { colors } = useTheme();

  const handlePopularBanco = async () => {
    setMensagem('🏗️ Populando banco de dados...');
    setTipoMensagem('');

    const result = await popularBanco();
    
    if (result.success && result.detalhes) {
      setMensagem(`✅ Banco populado com sucesso!\n\n${result.detalhes.usuarios}\n${result.detalhes.plantas}\n${result.detalhes.estufas}\n${result.detalhes.plantasUsuario}`);
      setTipoMensagem('sucesso');
    } else if (result.success) {
      setMensagem('✅ Banco populado com dados de exemplo!');
      setTipoMensagem('sucesso');
    } else {
      setMensagem(`❌ Erro: ${result.error || "Erro ao popular banco"}`);
      setTipoMensagem('erro');
    }
  };

  const handleLimparBanco = async () => {
    setMensagem('🧹 Limpando banco de dados...');
    setTipoMensagem('');

    const result = await limparBanco();
    
    if (result.success) {
      setMensagem('✅ Banco limpo com sucesso!');
      setTipoMensagem('sucesso');
    } else {
      setMensagem(`❌ Erro: ${result.error || "Erro ao limpar banco"}`);
      setTipoMensagem('erro');
    }
  };

  const limparMensagem = () => {
    setMensagem('');
    setTipoMensagem('');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          🗃️ Gerenciar Banco de Dados
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Funções para popular ou limpar o banco de dados para testes.
        </Text>

        {/* Mensagem de Status */}
        {mensagem ? (
          <View style={[
            styles.mensagemContainer,
            { 
              backgroundColor: tipoMensagem === 'erro' ? `${colors.error}20` : `${colors.success}20`,
              borderColor: tipoMensagem === 'erro' ? colors.error : colors.success
            }
          ]}>
            <Text style={[
              styles.mensagemTexto,
              { color: tipoMensagem === 'erro' ? colors.error : colors.success }
            ]}>
              {mensagem}
            </Text>
            <TouchableOpacity onPress={limparMensagem} style={styles.fecharBotao}>
              <Text style={[styles.fecharTexto, { color: colors.textSecondary }]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Card de Popular Banco */}
        <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            📊 Popular Banco
          </Text>
          
          <View style={styles.lista}>
            <Text style={[styles.item, { color: colors.textSecondary }]}>
              • 3 usuários de exemplo
            </Text>
            <Text style={[styles.item, { color: colors.textSecondary }]}>
              • 3 plantas no catálogo
            </Text>
            <Text style={[styles.item, { color: colors.textSecondary }]}>
              • 2 estufas com sensores
            </Text>
            <Text style={[styles.item, { color: colors.textSecondary }]}>
              • 1 planta do usuário
            </Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.botao, 
              { backgroundColor: colors.primary },
              loading && { opacity: 0.6 }
            ]} 
            onPress={handlePopularBanco}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={[styles.botaoTexto, { color: colors.white }]}>
                🚀 Popular Banco
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Card de Limpar Banco */}
        <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.error }]}>
            ⚠️ Limpar Banco
          </Text>
          
          <Text style={[styles.warningText, { color: colors.textSecondary }]}>
            Esta ação irá APAGAR TODOS os dados do banco. Use apenas para testes!
          </Text>

          <TouchableOpacity 
            style={[
              styles.botaoLimpar, 
              { backgroundColor: colors.error },
              loading && { opacity: 0.6 }
            ]} 
            onPress={handleLimparBanco}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : (
              <Text style={[styles.botaoTexto, { color: colors.white }]}>
                🧹 Limpar Banco
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Status Atual */}
        <View style={[styles.statusCard, { backgroundColor: colors.gray50 }]}>
          <Text style={[styles.statusTitle, { color: colors.textPrimary }]}>
            Status
          </Text>
          <Text style={[styles.statusText, { color: colors.textSecondary }]}>
            {loading ? "⏳ Processando..." : "Pronto para executar ações"}
          </Text>
        </View>

        {/* Instruções */}
        <View style={[styles.instrucoesCard, { backgroundColor: colors.greenLight }]}>
          <Text style={[styles.instrucoesTitle, { color: colors.primary }]}>
            💡 Como usar:
          </Text>
          <Text style={[styles.instrucoesText, { color: colors.textSecondary }]}>
            1. Clique em "Popular Banco" para adicionar dados{'\n'}
            2. Use "Limpar Banco" para resetar tudo{'\n'}
            3. Verifique no Firebase Console os dados
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  mensagemContainer: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mensagemTexto: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  fecharBotao: {
    padding: 4,
    marginLeft: 10,
  },
  fecharTexto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  lista: {
    marginLeft: 10,
    marginBottom: 15,
  },
  item: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  warningText: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  botao: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoLimpar: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusCard: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 14,
  },
  instrucoesCard: {
    borderRadius: 8,
    padding: 15,
  },
  instrucoesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instrucoesText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Fan, 
  Zap, 
  Wind, 
  AlertTriangle, 
  Droplets, 
  Power, 
  ChevronRight,
  TrendingUp
} from 'lucide-react-native';

export default function Dashboard() {
  // Hook para controlar a navegação
  const navigation = useNavigation<any>();

  // Array com os dados das salas para não repetir muito código
  const salasFavoritas = [
    { id: 1, nome: 'Bloco A - Sala 101', status: '22°C • Esfriar', consumo: '~ 850W' },
    { id: 2, nome: 'Bloco B - Sala 201', status: '23°C • Aquecer', consumo: '~ 920W' },
    { id: 3, nome: 'Bloco C - Lab 301', status: '19°C • Esfriar', consumo: '~ 1100W' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* ================= SEÇÃO: VISÃO GERAL ================= */}
      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>VISÃO GERAL</Text>
        
        <View style={styles.linhaCards}>
          {/* Card: Aparelhos Ligados (Quadrado) */}
          <View style={styles.cardMetade}>
            <View style={styles.cabecalhoCard}>
              <View style={[styles.iconeCirculo, { backgroundColor: '#ecfdf5' }]}>
                <Fan color="#059669" size={20} />
              </View>
            </View>
            <Text style={styles.labelCard}>Aparelhos Ligados</Text>
            <View style={styles.linhaValorAparelhosMini}>
              <Text style={styles.valorCard}>12</Text>
              <Text style={styles.textoOnline}> / 45 online</Text>
            </View>
          </View>

          {/* Card: Consumo */}
          <View style={styles.cardMetade}>
            <View style={styles.cabecalhoCard}>
              <View style={[styles.iconeCirculo, { backgroundColor: '#64748b' }]}>
                <Zap color="#fff" size={20} />
              </View>
              <View style={styles.badgeLigado}>
                <View style={styles.pontoVerde} />
                <Text style={styles.textoBadgeLigado}>LIGADO</Text>
              </View>
            </View>
            <Text style={styles.labelCard}>CONSUMO DIÁRIO</Text>
            <View style={styles.linhaValor}>
              <Text style={styles.valorCard}>42.8</Text>
              <Text style={styles.unidadeCard}> kW</Text>
            </View>
          </View>
        </View>

        {/* Card Largo: Sugestão - Qualidade do Ar / Sensores Extras */}
        <View style={styles.cardLargo}>
          <View style={[styles.iconeCirculo, { backgroundColor: '#f0f9ff' }]}>
            <Wind color="#0284c7" size={24} />
          </View>
          <View style={styles.infoLargo}>
            <Text style={styles.labelLargo}>Qualidade do Ar (IAQ)</Text>
            <View style={styles.linhaValorLargo}>
              <Text style={styles.valorLargoTexto}>Excelente</Text>
              <Text style={styles.textoSecundarioLargo}> • CO2 em níveis normais</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ================= SEÇÃO: ALERTAS CRÍTICOS ================= */}
      <View style={styles.secao}>
        <View style={styles.cabecalhoSecao}>
          <Text style={styles.tituloSecao}>ALERTAS CRÍTICOS</Text>
          <View style={styles.badgeAlerta}>
            <Text style={styles.textoBadgeAlerta}>2 Ativos</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollHorizontal}>
          <View style={[styles.cardAlerta, styles.cardAlertaCritico]}>
            <View style={styles.topoAlerta}>
              <AlertTriangle color="#ef4444" size={20} />
              <Text style={styles.tituloAlerta}>Ar esquecido fora de{'\n'}horário</Text>
            </View>
            <Text style={styles.textoAlerta}>Sala 102 (Bloco A) está{'\n'}funcionando vazia.</Text>
            <TouchableOpacity style={styles.botaoAcaoAlerta}>
              <Text style={styles.textoBotaoAlerta}>Desligar Agora</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardAlerta}>
            <View style={styles.topoAlerta}>
              <Droplets color="#3b82f6" size={20} />
              <Text style={styles.tituloAlerta}>Umidade elevada</Text>
            </View>
            <Text style={styles.textoAlerta}>Laboratório 3 com{'\n'}umidade acima de 60%.</Text>
            <TouchableOpacity style={styles.botaoAcaoAlertaAzul}>
              <Text style={styles.textoBotaoAlertaAzul}>Monitorar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* ================= SEÇÃO: SALAS FAVORITAS ================= */}
      <View style={styles.secao}>
        <View style={styles.cabecalhoSecao}>
          <Text style={styles.tituloSecao}>SALAS FAVORITAS</Text>
          {/* Navegação ao clicar em Ver Todas */}
          <TouchableOpacity 
            style={styles.badgeNeutro}
            onPress={() => navigation.navigate('blocos')}
          >
            <Text style={styles.textoBadgeNeutro}>Ver Todas</Text>
          </TouchableOpacity>
        </View>

        {/* Renderizando a lista de salas automaticamente */}
        {salasFavoritas.map((sala) => (
          <TouchableOpacity key={sala.id} style={styles.cardSala} activeOpacity={0.7} onPress={() => navigation.navigate('controleSala', { salaId: sala.id, nomeSala: sala.nome })}>
            <View style={[styles.iconeCirculo, { backgroundColor: '#ecfdf5' }]}>
              <Power color="#059669" size={20} />
            </View>
            
            <View style={styles.infoSala}>
              <Text style={styles.tituloSala}>{sala.nome}</Text>
              <Text style={styles.subtituloSala}>{sala.status}</Text>
            </View>

            <View style={styles.statusSala}>
              <View style={styles.linhaConsumo}>
                <TrendingUp color="#94a3b8" size={12} style={{ marginRight: 4 }} />
                <Text style={styles.consumoSala}>{sala.consumo}</Text>
              </View>
              <View style={styles.badgeLigadoMini}>
                <Text style={styles.textoBadgeLigado}>LIGADO</Text>
              </View>
            </View>
            
            <ChevronRight color="#cbd5e1" size={20} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
  },
  secao: {
    marginTop: 24,
  },
  cabecalhoSecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tituloSecao: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 12,
  },
  
  /* --- Estilos da Visão Geral --- */
  linhaCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardMetade: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cabecalhoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconeCirculo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLigado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pontoVerde: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
    marginRight: 4,
  },
  textoBadgeLigado: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#059669',
  },
  labelCard: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 4,
  },
  linhaValor: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valorCard: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  unidadeCard: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  linhaValorAparelhosMini: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  textoOnline: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  
  /* --- Card Largo (Sugestão IAQ) --- */
  cardLargo: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoLargo: {
    marginLeft: 16,
  },
  labelLargo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 2,
  },
  linhaValorLargo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valorLargoTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  textoSecundarioLargo: {
    fontSize: 13,
    color: '#94a3b8',
  },

  /* --- Estilos de Alertas Críticos --- */
  badgeAlerta: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoBadgeAlerta: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  scrollHorizontal: {
    paddingBottom: 8,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  cardAlerta: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: 220,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardAlertaCritico: {
    borderColor: '#fecaca',
  },
  topoAlerta: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tituloAlerta: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginLeft: 8,
    flex: 1,
  },
  textoAlerta: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 16,
    marginLeft: 28,
  },
  botaoAcaoAlerta: {
    backgroundColor: '#ecfdf5',
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 28,
  },
  textoBotaoAlerta: {
    color: '#059669',
    fontWeight: 'bold',
    fontSize: 13,
  },
  botaoAcaoAlertaAzul: {
    backgroundColor: '#eff6ff',
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 28,
  },
  textoBotaoAlertaAzul: {
    color: '#3b82f6',
    fontWeight: 'bold',
    fontSize: 13,
  },

  /* --- Estilos de Salas Favoritas --- */
  badgeNeutro: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  textoBadgeNeutro: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
  },
  cardSala: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12, // Espaçamento entre os cards gerados pelo map
  },
  infoSala: {
    flex: 1,
    marginLeft: 12,
  },
  tituloSala: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtituloSala: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  statusSala: {
    alignItems: 'flex-end',
  },
  linhaConsumo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  consumoSala: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  badgeLigadoMini: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
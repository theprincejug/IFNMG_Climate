import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, 
  MoreVertical, 
  Droplets, 
  Thermometer, 
  Wind, 
  Power,
  Plus,
  Minus
} from 'lucide-react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

// Importando o contexto global
import { ContextoSalas, Sala } from '@/contexts/ContextoSalas';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ControleSala() {
  const router = useRouter();
  const { salaId, nomeSala = 'SALA DESCONHECIDA' } = useLocalSearchParams<{ salaId: string, nomeSala: string }>();

  // 2. Conectando com o Contexto Global
  const { salas, atualizarTemperatura } = useContext(ContextoSalas);
  const salaAtual = salas?.find((s: Sala) => s.id === Number(salaId));

  // Estados interativos da tela (puxando os dados iniciais do contexto, se existirem)
  const [ligado, setLigado] = useState(salaAtual ? salaAtual.ligado : true);
  const [temperatura, setTemperatura] = useState(salaAtual ? salaAtual.temperatura : 22);
  const [modo, setModo] = useState('esfriar'); // 'esfriar', 'ventilar', 'seco'
  const [velocidade, setVelocidade] = useState('auto'); // 'baixa', 'media', 'alta', 'auto'

  // 3. Atualiza o contexto global automaticamente sempre que a temperatura mudar
  useEffect(() => {
    if (salaId) {
      atualizarTemperatura(salaId, temperatura);
    }
  }, [temperatura, salaId, atualizarTemperatura]);

  // Funções de controle
  const aumentarTemp = () => setTemperatura((prev: number) => prev < 30 ? prev + 1 : prev);
  const diminuirTemp = () => setTemperatura((prev: number) => prev > 16 ? prev - 1 : prev);
  const alternarEnergia = () => setLigado(!ligado);

  // 4. Matemática do Arco Dinâmico (Semicírculo perfeito baseado no raio 100 do seu código)
  const raio = 100;
  const comprimentoArco = Math.PI * raio; // ~314.16
  const porcentagemTemp = (temperatura - 16) / (30 - 16); // Intervalo de 16°C a 30°C
  const preenchimento = comprimentoArco - (comprimentoArco * porcentagemTemp);

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= CABEÇALHO ================= */}
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => router.back()} style={styles.botaoIcone}>
          <ChevronLeft color="#64748b" size={28} />
        </TouchableOpacity>
        
        <View style={styles.centroCabecalho}>
          <Text style={styles.tituloCabecalho}>{salaAtual ? salaAtual.nome.toUpperCase() : nomeSala.toUpperCase()}</Text>
          <Text style={[styles.statusCabecalho, !ligado && { color: '#ef4444' }]}>
            {ligado ? 'Online' : 'Offline'}
          </Text>
        </View>

        <TouchableOpacity style={styles.botaoIcone}>
          <MoreVertical color="#64748b" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ================= CONTROLE DE TEMPERATURA ================= */}
        <View style={styles.cardPrincipal}>
          
          <View style={styles.arcoContainer}>
            {/* SVG do Arco Simulado */}
            <Svg width="240" height="130" viewBox="0 0 240 130">
              {/* Linha de fundo (Cinza) */}
              <Path 
                d="M 20 120 A 100 100 0 0 1 220 120" 
                fill="none" 
                stroke="#f1f5f9" 
                strokeWidth="16" 
                strokeLinecap="round" 
              />
              {/* Linha de progresso Dinâmica (agora usa o mesmo desenho do fundo, mas cortado pelo dashoffset) */}
              <Path 
                d="M 20 120 A 100 100 0 0 1 220 120" 
                fill="none" 
                stroke={ligado ? "#059669" : "#cbd5e1"} 
                strokeWidth="16" 
                strokeLinecap="round" 
                strokeDasharray={comprimentoArco}
                strokeDashoffset={preenchimento}
              />
            </Svg>

            {/* Informações no centro do arco */}
            <View style={styles.infoTemperatura}>
              <Text style={styles.labelMeta}>Meta</Text>
              <View style={styles.valorTemperaturaContainer}>
                <Text style={styles.valorTemperatura}>{temperatura}</Text>
                <Text style={styles.unidadeTemperatura}>°C</Text>
              </View>
              <View style={styles.infoUmidade}>
                <Droplets color="#3b82f6" size={14} style={{ marginRight: 4 }} />
                <Text style={styles.textoUmidade}>Umidade do Ar 45%</Text>
              </View>
            </View>
          </View>

          {/* Botões de + e - */}
          <View style={styles.controlesMaisMenos}>
            <TouchableOpacity onPress={diminuirTemp} style={styles.botaoCircularSecundario}>
              <Minus color="#64748b" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={aumentarTemp} style={styles.botaoCircularSecundario}>
              <Plus color="#64748b" size={24} />
            </TouchableOpacity>
          </View>

          {/* Botão de Ligar/Desligar */}
          <TouchableOpacity 
            onPress={alternarEnergia} 
            style={[styles.botaoLigar, !ligado && { backgroundColor: '#ef4444' }]}
            activeOpacity={0.8}
          >
            <Power color="#ffffff" size={32} />
          </TouchableOpacity>
        </View>

        {/* ================= MODO ================= */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>MODO</Text>
          <View style={styles.linhaModos}>
            <TouchableOpacity 
              onPress={() => setModo('esfriar')}
              style={[styles.botaoModo, modo === 'esfriar' && styles.botaoModoAtivo]}
            >
              <Thermometer color={modo === 'esfriar' ? '#059669' : '#94a3b8'} size={24} />
              <Text style={[styles.textoModo, modo === 'esfriar' && styles.textoModoAtivo]}>Esfriar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setModo('ventilar')}
              style={[styles.botaoModo, modo === 'ventilar' && styles.botaoModoAtivo]}
            >
              <Wind color={modo === 'ventilar' ? '#059669' : '#94a3b8'} size={24} />
              <Text style={[styles.textoModo, modo === 'ventilar' && styles.textoModoAtivo]}>Ventilar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setModo('seco')}
              style={[styles.botaoModo, modo === 'seco' && styles.botaoModoAtivo]}
            >
              <Droplets color={modo === 'seco' ? '#059669' : '#94a3b8'} size={24} />
              <Text style={[styles.textoModo, modo === 'seco' && styles.textoModoAtivo]}>Seco</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= VELOCIDADE DO VENTILADOR ================= */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>VELOCIDADE DO VENTILADOR</Text>
          <View style={styles.containerVelocidade}>
            {['Baixa', 'Média', 'Alta', 'Auto'].map((vel) => {
              const velLower = vel.toLowerCase();
              const isAtivo = velocidade === velLower;
              return (
                <TouchableOpacity 
                  key={vel}
                  onPress={() => setVelocidade(velLower)}
                  style={[styles.botaoVelocidade, isAtivo && styles.botaoVelocidadeAtivo]}
                >
                  <Text style={[styles.textoVelocidade, isAtivo && styles.textoVelocidadeAtiva]}>
                    {vel}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* ================= CONSUMO DE ENERGIA ================= */}
        <View style={styles.secao}>
          <View style={styles.cabecalhoConsumo}>
            <Text style={styles.tituloSecao}>CONSUMO DE ENERGIA</Text>
            <Text style={styles.valorConsumo}>850 W</Text>
          </View>

          {/* Gráfico Simulado com SVG */}
          <View style={styles.cardGrafico}>
            <Svg height="160" width="100%" viewBox="0 0 300 160" preserveAspectRatio="none">
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#059669" stopOpacity="0.2" />
                  <Stop offset="1" stopColor="#059669" stopOpacity="0.0" />
                </LinearGradient>
              </Defs>
              
              {/* Linhas de grade horizontais */}
              {[20, 60, 100, 140].map((y, i) => (
                <Path key={i} d={`M 30 ${y} L 300 ${y}`} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              ))}

              {/* Área preenchida do gráfico */}
              <Path 
                d="M 30 140 L 30 40 Q 45 60 60 30 T 90 90 T 120 40 T 150 100 T 180 40 T 210 110 T 240 40 T 270 120 L 290 60 L 290 140 Z" 
                fill="url(#grad)" 
              />
              
              {/* Linha do gráfico */}
              <Path 
                d="M 30 40 Q 45 60 60 30 T 90 90 T 120 40 T 150 100 T 180 40 T 210 110 T 240 40 T 270 120 L 290 60" 
                fill="none" 
                stroke="#059669" 
                strokeWidth="3" 
                strokeLinejoin="round"
              />

              {/* Textos do Eixo Y */}
              <Text style={[styles.textoEixo, { position: 'absolute', top: 10, left: 0 }]}>200</Text>
              <Text style={[styles.textoEixo, { position: 'absolute', top: 50, left: 0 }]}>900</Text>
              <Text style={[styles.textoEixo, { position: 'absolute', top: 90, left: 0 }]}>600</Text>
              <Text style={[styles.textoEixo, { position: 'absolute', top: 130, left: 0 }]}>300</Text>
            </Svg>

            {/* Eixo X */}
            <View style={styles.eixoX}>
              <Text style={styles.textoEixo}>0:00</Text>
              <Text style={styles.textoEixo}>4:00</Text>
              <Text style={styles.textoEixo}>8:00</Text>
              <Text style={styles.textoEixo}>12:00</Text>
              <Text style={styles.textoEixo}>16:00</Text>
              <Text style={styles.textoEixo}>20:00</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  /* --- Cabeçalho --- */
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  botaoIcone: {
    padding: 4,
  },
  centroCabecalho: {
    alignItems: 'center',
  },
  tituloCabecalho: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statusCabecalho: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
    marginTop: 2,
  },
  
  /* --- Card Principal de Temperatura --- */
  cardPrincipal: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 24,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
    marginBottom: 40, // Espaço para o botão de energia vazar pra baixo
  },
  arcoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140, // Altura ajustada para o SVG
  },
  infoTemperatura: {
    position: 'absolute',
    top: 30, // Desce o texto para ficar no centro do arco
    alignItems: 'center',
  },
  labelMeta: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  valorTemperaturaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  valorTemperatura: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#0f172a',
    lineHeight: 70, // Ajuste para a fonte não cortar
  },
  unidadeTemperatura: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 8,
  },
  infoUmidade: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  textoUmidade: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  controlesMaisMenos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
    marginTop: -20, // Sobe os botões para as pontas do arco
  },
  botaoCircularSecundario: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  botaoLigar: {
    position: 'absolute',
    bottom: -32, // Faz o botão vazar para fora do card branco
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  /* --- Seções Gerais --- */
  secao: {
    marginTop: 24,
  },
  tituloSecao: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 12,
  },

  /* --- Modos --- */
  linhaModos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoModo: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  botaoModoAtivo: {
    backgroundColor: '#ecfdf5',
    borderColor: '#059669',
  },
  textoModo: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  textoModoAtivo: {
    color: '#059669',
  },

  /* --- Velocidade --- */
  containerVelocidade: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 4,
  },
  botaoVelocidade: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  botaoVelocidadeAtivo: {
    backgroundColor: '#0f172a', // Cor escura do botão "Auto"
  },
  textoVelocidade: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  textoVelocidadeAtiva: {
    color: '#ffffff',
  },

  /* --- Consumo --- */
  cabecalhoConsumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  valorConsumo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
  },
  cardGrafico: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  textoEixo: {
    fontSize: 10,
    color: '#94a3b8',
  },
  eixoX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 30, // Alinha com o início do gráfico
    marginTop: 8,
  }
});
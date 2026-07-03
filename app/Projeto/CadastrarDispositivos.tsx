import { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Power, Plus, Minus, Droplets } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";

export default function CadastroSala() {
  const [nome, setNome] = useState("");
  const [temperatura, setTemperatura] = useState("22");
  const [modo, setModo] = useState("Frio");
  const [ligado, setLigado] = useState(true);
  const [erro, setErro] = useState("");

  const cadastrar = () => {
    if (!nome.trim()) {
      setErro("Digite o nome da sala.");
      return;
    }

    setErro("");

    // Aqui você salva no banco depois
    router.back();
  };

  const aumentarTemp = () => {
  const temp = Number(temperatura);
  if (temp < 30) {
    setTemperatura(String(temp + 1));
  }
};

const diminuirTemp = () => {
  const temp = Number(temperatura);
  if (temp > 16) {
    setTemperatura(String(temp - 1));
  }
};

const alternarEnergia = () => {
  setLigado(!ligado);
};

const raio = 100;
const comprimentoArco = Math.PI * raio;
const porcentagemTemp = (Number(temperatura) - 16) / (30 - 16);
const preenchimento =
  comprimentoArco - comprimentoArco * porcentagemTemp;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Dispositivo</Text>

      <Text style={styles.label}>Nome do Dispositivo</Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex.: Laboratório 01"
        placeholderTextColor="rgba(0,0,0,0.35)"
      />

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

      <Text style={styles.label}>Modo</Text>

      <View style={styles.linha}>
        <TouchableOpacity
          style={[
            styles.botaoModo,
            modo === "Frio" && styles.botaoModoAtivo,
          ]}
          onPress={() => setModo("Frio")}
        >
          <Text>❄ Frio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoModo,
            modo === "Ventilar" && styles.botaoModoAtivo,
          ]}
          onPress={() => setModo("Ventilar")}
        >
          <Text>🌀 Ventilar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoModo,
            modo === "Seco" && styles.botaoModoAtivo,
          ]}
          onPress={() => setModo("Seco")}
        >
          <Text>💧 Seco</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Status</Text>

      <View style={styles.linha}>
        <TouchableOpacity
          style={[
            styles.botaoModo,
            ligado && styles.botaoModoAtivo,
          ]}
          onPress={() => setLigado(true)}
        >
          <Text>Ligado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoModo,
            !ligado && styles.botaoModoAtivo,
          ]}
          onPress={() => setLigado(false)}
        >
          <Text>Desligado</Text>
        </TouchableOpacity>
      </View>

      {erro !== "" && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      <TouchableOpacity
        style={styles.botaoCadastrar}
        onPress={cadastrar}
      >
        <Text style={styles.textoBotao}>
          Cadastrar Dispositivo
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0f172a",
  },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },

  botaoModo: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginHorizontal: 4,
  },

  botaoModoAtivo: {
    backgroundColor: "#ecfdf5",
    borderColor: "#059669",
  },

  textoModo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
  },

  textoModoAtivo: {
    color: "#059669",
  },

  erro: {
    color: "#ef4444",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "500",
    textAlign: "center",
  },

  botaoCadastrar: {
    backgroundColor: "#059669",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#059669",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  cardPrincipal: {
  backgroundColor: "#ffffff",
  borderRadius: 24,
  paddingVertical: 24,
  alignItems: "center",
  marginTop: 20,
  borderWidth: 1,
  borderColor: "#e2e8f0",
  elevation: 2,
  marginBottom: 40,
  position: "relative",
},

arcoContainer: {
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  height: 140,
},

infoTemperatura: {
  position: "absolute",
  top: 30,
  alignItems: "center",
},

labelMeta: {
  fontSize: 14,
  color: "#64748b",
  fontWeight: "500",
},

valorTemperaturaContainer: {
  flexDirection: "row",
  alignItems: "flex-start",
},

valorTemperatura: {
  fontSize: 60,
  fontWeight: "bold",
  color: "#0f172a",
},

unidadeTemperatura: {
  fontSize: 24,
  fontWeight: "600",
  marginTop: 8,
},

infoUmidade: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 4,
},

textoUmidade: {
  fontSize: 12,
  color: "#64748b",
},

controlesMaisMenos: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "65%",
  marginTop: -15,
},

botaoCircularSecundario: {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: "#ffffff",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#e2e8f0",
},

botaoLigar: {
  position: "absolute",
  bottom: -30,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#059669",
  justifyContent: "center",
  alignItems: "center",
  elevation: 6,
},
});
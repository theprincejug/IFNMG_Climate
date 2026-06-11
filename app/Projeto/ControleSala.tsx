import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";

export default function ControleSala() {
  const [ligado, setLigado] = useState(true);
  const [temperatura, setTemperatura] = useState(24);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sala 101</Text>

      <View style={styles.card}>
        <Text style={styles.label}>🌡 Temperatura Atual</Text>
        <Text style={styles.tempAtual}>22°C</Text>
      </View>

      <View style={styles.cardLinha}>
        <Text style={styles.label}>Ar-condicionado</Text>

        <Switch
          value={ligado}
          onValueChange={setLigado}
          trackColor={{
            false: "#cbd5e1",
            true: "#10b981",
          }}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Temperatura Desejada
        </Text>

        <View style={styles.tempContainer}>
          <TouchableOpacity
            style={styles.botaoTemp}
            onPress={() => setTemperatura(temperatura - 1)}
          >
            <Text style={styles.botaoTexto}>−</Text>
          </TouchableOpacity>

          <Text style={styles.tempDesejada}>
            {temperatura}°C
          </Text>

          <TouchableOpacity
            style={styles.botaoTemp}
            onPress={() => setTemperatura(temperatura + 1)}
          >
            <Text style={styles.botaoTexto}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Modo</Text>

        <View style={styles.modos}>
          <TouchableOpacity style={styles.modoAtivo}>
            <Text style={styles.textoModoAtivo}>
              ❄ Frio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modo}>
            <Text>💨 Ventilar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modo}>
            <Text>⚙ Auto</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 20,
    color: "#0f172a",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },

  cardLinha: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    color: "#64748b",
    marginBottom: 8,
  },

  tempAtual: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#10b981",
  },

  tempContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  tempDesejada: {
    fontSize: 32,
    fontWeight: "bold",
  },

  botaoTemp: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  modos: {
    flexDirection: "row",
    gap: 10,
  },

  modo: {
    padding: 12,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
  },

  modoAtivo: {
    padding: 12,
    backgroundColor: "#10b981",
    borderRadius: 10,
  },

  textoModoAtivo: {
    color: "#fff",
    fontWeight: "bold",
  },
});
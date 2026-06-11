import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";

export default function Blocos() {
  const [sala101, setSala101] = useState(true);
  const [sala102, setSala102] = useState(true);
  const [sala103, setSala103] = useState(false);
  const [sala201, setSala201] = useState(true);
  const [sala202, setSala202] = useState(false);
  const [sala203, setSala203] = useState(true);
  const [lab301, setLab301] = useState(false);
  const [lab302, setLab302] = useState(true);

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Blocos e Salas</Text>
        <Text style={styles.subtitulo}>
          Selecione uma sala para controlar
        </Text>
      </View>

      {/* BLOCO A */}
      <View style={styles.blocoContainer}>
        <Text style={styles.blocoTitulo}>BLOCO A</Text>

        <View style={styles.card}>
          <SalaItem
            nome="Sala 101"
            temperatura="22°C"
            ligado={sala101}
            setLigado={setSala101}
          />

          <SalaItem
            nome="Sala 102"
            temperatura="24°C"
            ligado={sala102}
            setLigado={setSala102}
          />

          <SalaItem
            nome="Sala 103"
            temperatura="20°C"
            ligado={sala103}
            setLigado={setSala103}
            ultimo
          />
        </View>
      </View>

      {/* BLOCO B */}
      <View style={styles.blocoContainer}>
        <Text style={styles.blocoTitulo}>BLOCO B</Text>

        <View style={styles.card}>
          <SalaItem
            nome="Sala 201"
            temperatura="23°C"
            ligado={sala201}
            setLigado={setSala201}
            ultimo
          />
          <SalaItem
            nome="Sala 202"
            temperatura="21°C"
            ligado={sala202}
            setLigado={setSala202}
          />
          <SalaItem
            nome="Sala 203"
            temperatura="25°C"
            ligado={sala203}
            setLigado={setSala203}
            ultimo
          />
        </View>
      </View>

      {/* BLOCO C */}
      <View style={styles.blocoContainer}>
        <Text style={styles.blocoTitulo}>BLOCO C</Text>

        <View style={styles.card}>
          <SalaItem
            nome="Lab 301"
            temperatura="19°C"
            ligado={lab301}
            setLigado={setLab301}
            ultimo
          />
          <SalaItem
            nome="Lab 302"
            temperatura="21°C"
            ligado={lab302}
            setLigado={setLab302}
          />
        </View>
      </View>
    </ScrollView>
  );
}

interface SalaItemProps {
  nome: string;
  temperatura: string;
  ligado: boolean;
  setLigado: React.Dispatch<React.SetStateAction<boolean>>;
  ultimo?: boolean;
}

function SalaItem({
  nome,
  temperatura,
  ligado,
  setLigado,
  ultimo = false,
}: SalaItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[
        styles.salaItem,
        !ultimo && styles.bordaInferior,
      ]}
    >
      <View>
        <Text style={styles.nomeSala}>{nome}</Text>
        <Text style={styles.temperatura}>🌡 {temperatura}</Text>
      </View>

      <View style={styles.acoes}>
  <Switch
    value={ligado}
    onValueChange={setLigado}
    trackColor={{
      false: "#cbd5e1",
      true: "#10b981",
    }}
    thumbColor="#fff"
  />

<TouchableOpacity
  onPress={() => router.push("/controleSala")}
>
  <Text style={styles.seta}>›</Text>
</TouchableOpacity>
</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
  },

  subtitulo: {
    marginTop: 6,
    color: "#64748b",
    fontSize: 14,
  },

  blocoContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },

  blocoTitulo: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#10b981",
    paddingLeft: 8,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  salaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },

  bordaInferior: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  nomeSala: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },

  temperatura: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 14,
  },

  acoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  seta: {
    fontSize: 26,
    color: "#94a3b8",
  },
});
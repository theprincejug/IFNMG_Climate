import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export default function CadastroBloco() {
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [blocos, setBlocos] = useState<string[]>([]);

  const cadastrar = async () => {
    if (!nome.trim()) {
      setErro("Preencha o nome do bloco.");
      return;
    }

    setErro("");

    const { error } = await supabase
      .from("blocos")
      .insert({
        nome: nome.trim(),
      });

    if (error) {
      console.log(error);
      setErro(error.message);
      return;
    }

    console.log("Bloco criado:", nome);

    setNome("");

    router.replace("/Projeto/Blocos");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Blocos</Text>

      <Text style={styles.label}>Nome do Bloco</Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          setErro("");
        }}
        placeholder="Ex.: Bloco A"
        placeholderTextColor="rgba(0,0,0,0.35)"
      />

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar Bloco</Text>
      </TouchableOpacity>

      {blocos.map((bloco, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nomeBloco}>{bloco}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 10,
  },

  erro: {
    color: "red",
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#059669",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  nomeBloco: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
});
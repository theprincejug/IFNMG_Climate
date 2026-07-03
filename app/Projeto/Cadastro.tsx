import { useState } from "react";
import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  

  const cadastrar = () => {
    if (!nome.trim()) {
      setErro("Preencha o nome.");
      return;
    }

    if (!email.trim()) {
      setErro("Preencha o e-mail.");
      return;
    }

    if (!email.endsWith("@ifnmg.edu.br")) {
    setErro("O e-mail deve terminar com @ifnmg.edu.br.");
    return;
  }

    if (!senha.trim()) {
      setErro("Preencha a senha.");
      return;
    }

    if (!confirmarSenha.trim()) {
      setErro("Confirme a senha.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setErro("");
    router.replace("/Projeto/Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.iconeContainer}>
          <Text style={styles.iconeTexto}>🌡</Text>
        </View>

        <Text style={styles.titulo}>IFNMG Climate</Text>

        <Text style={styles.subtitulo}>
          Sistema de Gerenciamento HVAC{"\n"}Campus Universitário
        </Text>
      </View>

      <View style={styles.formulario}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={(text) => {
            setNome(text);
            setErro("");
          }}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErro("");
          }}
          placeholder="admin@ifnmg.edu.br"
          placeholderTextColor="rgba(0, 0, 0, 0.35)"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={(text) => {
            setSenha(text);
            setErro("");
          }}
          placeholder="••••••••"
          placeholderTextColor="rgba(0, 0, 0, 0.35)"
          secureTextEntry
        />

        <Text style={styles.label}>Confirmar Senha</Text>
        <TextInput
          style={styles.input}
          value={confirmarSenha}
          onChangeText={(text) => {
            setConfirmarSenha(text);
            setErro("");
          }}
          placeholder="••••••••"
          placeholderTextColor="rgba(0, 0, 0, 0.35)"
          secureTextEntry
        />

        {erro !== "" && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {erro}
          </Text>
        )}

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={cadastrar}
        >
          <Text style={styles.textoBotaoSecundario}>
            Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  cabecalho: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconeContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#059669",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 4, 
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  iconeTexto: {
    fontSize: 32,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subtitulo: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  formulario: {
    width: "100%",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "9e9198",
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#0f172a",
  },
  botaoPrincipal: {
    backgroundColor: "#059669",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  textoBotaoPrincipal: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divisorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  linhaDivisora: {
    flex: 1,
    height: 1,
    backgroundColor: "#e2e8f0",
  },
  textoDivisor: {
    marginHorizontal: 8,
    color: "#64748b",
    fontSize: 14,
  },
  botaoSecundario: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  textoBotaoSecundario: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "500",
  },
});
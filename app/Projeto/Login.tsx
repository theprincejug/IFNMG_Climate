import { login } from "@/src/api/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, senha);

      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error && error.cause === "InvalidLoginCredentials") {
        setErro(error.message);
      } else {
        setErro("Ocorreu um erro ao tentar fazer login. Aguarde enquanto resolvemos o problema.");
      }
    }
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
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="admin@ifnmg.edu.br"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="••••••••"
          secureTextEntry
        />

        {erro && <Text style={styles.mensagemErro}>{erro}</Text>}

        <TouchableOpacity style={styles.botaoPrincipal} onPress={handleLogin}>
          <Text style={styles.textoBotaoPrincipal}>Entrar</Text>
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
  mensagemErro: {
    color: "#059669",
    fontWeight: "bold",
    marginBottom: 16
  },
});

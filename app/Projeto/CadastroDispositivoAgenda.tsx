import { useState } from "react";
import { router } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export default function CadastroDispositivoAgenda() {
  const [nome, setNome] = useState("");
  const [horario, setHorario] = useState("");
  const [erro, setErro] = useState("");
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

  const diasSemana = [
  { label: "Dom", value: "Dom" },
  { label: "Seg", value: "Seg" },
  { label: "Ter", value: "Ter" },
  { label: "Qua", value: "Qua" },
  { label: "Qui", value: "Qui" },
  { label: "Sex", value: "Sex" },
  { label: "Sáb", value: "Sáb" },
];

  const toggleDia = (dia: string) => {
  setDiasSelecionados((prev) =>
    prev.includes(dia)
      ? prev.filter((d) => d !== dia)
      : [...prev, dia]
  );
};

  const cadastrar = () => {
    if (!nome.trim() || !horario.trim()) {
      setErro("Preencha o nome e o horário.");
      return;
    }

    const novoDispositivo = {
      nome,
      horario,
      dias: diasSelecionados,
    };

    console.log("Dispositivo agendado:", novoDispositivo);

    setNome("");
    setHorario("");
    setDiasSelecionados([]);
    setErro("");

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agendar Dispositivo</Text>

      <Text style={styles.label}>Nome do Dispositivo</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          setErro("");
        }}
        placeholder="Ex.: Ar-condicionado Sala 101"
        placeholderTextColor="rgba(0,0,0,0.35)"
      />

      <Text style={styles.label}>Horário</Text>
      <TextInput
        style={styles.input}
        value={horario}
        onChangeText={(text) => {
          setHorario(text);
          setErro("");
        }}
        placeholder="Ex.: 08:00"
        placeholderTextColor="rgba(0,0,0,0.35)"
      />

      {/* DIAS DA SEMANA */}
      <Text style={styles.label}>Dias da Semana</Text>

      <View style={styles.diasContainer}>
        {diasSemana.map((dia) => {
            const selecionado = diasSelecionados.includes(dia.value);

            return (
            <TouchableOpacity
                key={dia.value}
                style={[
                styles.diaItem,
                selecionado && styles.diaSelecionado,
                ]}
                onPress={() => toggleDia(dia.value)}
            >
                <Text
                style={[
                    styles.diaTexto,
                    selecionado && styles.diaTextoSelecionado,
                ]}
                >
                {dia.label}
                </Text>
            </TouchableOpacity>
            );
        })}
        </View>

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Agendar Dispositivo</Text>
      </TouchableOpacity>
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
    fontSize: 26,
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
    marginBottom: 15,
  },

  erro: {
    color: "red",
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  diasContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
},

diaItem: {
  width: 38,
  height: 38,
  borderRadius: 19,
  backgroundColor: "#e2e8f0",
  justifyContent: "center",
  alignItems: "center",
},

diaSelecionado: {
  backgroundColor: "#10b981",
},

diaTexto: {
  fontWeight: "600",
  color: "#334155",
},

diaTextoSelecionado: {
  color: "#fff",
},
});
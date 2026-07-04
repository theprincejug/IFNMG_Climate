import { router } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator, ScrollView, StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { supabase } from "@/lib/supabase";

export default function CadastroDispositivoAgenda() {
  const [horario, setHorario] = useState("");
  const [erro, setErro] = useState("");

  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [dispositivoSelecionado, setDispositivoSelecionado] = useState<any>(null);
  const [mostrarDispositivos, setMostrarDispositivos] = useState(false);
  const [dispositivosDisponiveis, setDispositivosDisponiveis] = useState<any[]>([]);
  const [carregandoDispositivos, setCarregandoDispositivos] = useState(false);

  const [regra, setRegra] = useState("ligar");
  const [temperatura, setTemperatura] = useState("");
  const [ativo, setAtivo] = useState(true);

  const diasSemana = [
    { label: "Dom", value: "Dom" },
    { label: "Seg", value: "Seg" },
    { label: "Ter", value: "Ter" },
    { label: "Qua", value: "Qua" },
    { label: "Qui", value: "Qui" },
    { label: "Sex", value: "Sex" },
    { label: "Sáb", value: "Sáb" },
  ];

  useEffect(() => {
    buscarDispositivos();
  }, []);

  const buscarDispositivos = async () => {
    setCarregandoDispositivos(true);

    const { data, error } = await supabase
      .from("dispositivos")
      .select("id, nome");

    if (error) {
      console.log(error);
      setCarregandoDispositivos(false);
      return;
    }

    setDispositivosDisponiveis(data || []);
    setCarregandoDispositivos(false);
  };

  const toggleDia = (dia: string) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  };

  const cadastrar = async () => {
    if (!dispositivoSelecionado) {
      setErro("Selecione um dispositivo.");
      return;
    }

    if (!horario.trim()) {
      setErro("Preencha o horário.");
      return;
    }

    if (diasSelecionados.length === 0) {
      setErro("Selecione pelo menos um dia.");
      return;
    }

    const { error } = await supabase.from("agendas").insert({
      dispositivo_id: dispositivoSelecionado.id,
      horario: horario.trim(),
      dias_semana: diasSelecionados.join(","),

      regra: regra,
      ativo: ativo,

      temperatura:
        regra === "ajustar_temperatura"
          ? Number(temperatura)
          : null,
    });

    if (error) {
      console.log(error);
      setErro(error.message);
      return;
    }

    setErro("");
    setHorario("");
    setDiasSelecionados([]);
    setDispositivoSelecionado(null);
    setRegra("ligar");
    setTemperatura("");
    setAtivo(true);

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Agendar Dispositivo</Text>

      {/* SELECT DISPOSITIVO */}
      <TouchableOpacity
        style={styles.inputSelect}
        activeOpacity={0.8}
        onPress={() => setMostrarDispositivos(!mostrarDispositivos)}
        disabled={carregandoDispositivos}
      >
        {carregandoDispositivos ? (
          <ActivityIndicator size="small" color="#059669" />
        ) : (
          <>
            <Text
              style={{
                color: dispositivoSelecionado ? "#0f172a" : "rgba(0,0,0,0.35)",
                fontSize: 16,
              }}
            >
              {dispositivoSelecionado
                ? dispositivoSelecionado.nome
                : "Selecione o dispositivo..."}
            </Text>

            <ChevronDown color="#64748b" size={20} />
          </>
        )}
      </TouchableOpacity>

      {mostrarDispositivos && dispositivosDisponiveis.length > 0 && (
        <View style={styles.dropdownContainer}>
          {dispositivosDisponiveis.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.dropdownItem}
              onPress={() => {
                setDispositivoSelecionado(item);
                setMostrarDispositivos(false);
              }}
            >
              <Text style={{ fontSize: 16, color: "#0f172a" }}>
                {item.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* REGRA */}
<Text style={styles.label}>Regra</Text>

<View style={styles.regrasContainer}>
  {[
    { label: "Ligar", value: "ligar" },
    { label: "Desligar", value: "desligar" },
    { label: "Temperatura", value: "ajustar_temperatura" },
  ].map((item) => {
    const isActive = regra === item.value;

    return (
      <TouchableOpacity
        key={item.value}
        style={[
          styles.regraItem,
          isActive && styles.regraAtiva,
        ]}
        onPress={() => setRegra(item.value)}
      >
        <Text
          style={[
            styles.regraTexto,
            isActive && styles.regraTextoAtivo,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>

{regra === "ajustar_temperatura" && (
  <>
    <Text style={styles.label}>Temperatura</Text>
    <TextInput
      style={styles.input}
      value={temperatura}
      onChangeText={setTemperatura}
      placeholder="Ex: 22"
      keyboardType="numeric"
    />
  </>
)}
      {/* HORÁRIO */}
      <Text style={styles.label}>Horário</Text>
      <TextInput
        style={styles.input}
        value={horario}
        onChangeText={setHorario}
        placeholder="Ex.: 08:00"
      />

      {/* DIAS */}
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

      {/* ATIVO */}
      <TouchableOpacity
        style={[
          styles.inputSelect,
          ativo ? { borderColor: "#10b981" } : { borderColor: "#ef4444" },
        ]}
        onPress={() => setAtivo(!ativo)}
      >
        <Text style={{ fontSize: 16 }}>
          {ativo ? "Ativo" : "Inativo"}
        </Text>
      </TouchableOpacity>

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      {/* BOTÃO */}
      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Agendar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#334155",
  },

  selectBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },

  option: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f1f5f9",
  },

  optionAtiva: {
    backgroundColor: "#10b981",
  },

  texto: {
    color: "#0f172a",
  },

  textoAtivo: {
    color: "#fff",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
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

  erro: {
    color: "red",
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },

  inputSelect: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    marginBottom: 15,
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  regrasContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
  gap: 8,
},

regraItem: {
  flex: 1,
  paddingVertical: 12,
  borderRadius: 10,
  backgroundColor: "#f1f5f9",
  borderWidth: 1,
  borderColor: "#e2e8f0",
  alignItems: "center",
},

regraAtiva: {
  backgroundColor: "#10b981",
  borderColor: "#10b981",
},

regraTexto: {
  color: "#0f172a",
  fontWeight: "600",
},

regraTextoAtivo: {
  color: "#fff",
},
});
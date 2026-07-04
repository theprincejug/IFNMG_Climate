import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";

import { supabase } from "@/lib/supabase";

interface Agenda {
  id: string;
  horario: string;
  ativo: boolean;
  regra: string;
  dias_semana: string;
  temperatura?: number;
  dispositivos: {
    nome: string;
  };
}

export default function Agenda() {
  const router = useRouter();
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarAgendas();
  }, []);

  const buscarAgendas = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("agendas")
      .select(`
        id,
        horario,
        ativo,
        regra,
        dias_semana,
        temperatura,
        dispositivos ( nome )
      `);

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setAgendas(data || []);
    setLoading(false);
  };

  const toggleAtivo = async (id: string, valorAtual: boolean) => {
    const novoValor = !valorAtual;

    const { error } = await supabase
      .from("agendas")
      .update({ ativo: novoValor })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    setAgendas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ativo: novoValor } : item
      )
    );
  };

  const formatarAcao = (item: Agenda) => {
    if (item.regra === "ligar") return "Ligar Ar-condicionado";
    if (item.regra === "desligar") return "Desligar Ar-condicionado";
    if (item.regra === "ajustar_temperatura")
      return `Ajustar para ${item.temperatura}°C`;
    return "Ação";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Agenda</Text>
        <Text style={styles.subtitulo}>
          Controle os agendamentos automáticos
        </Text>
      </View>

      <View style={styles.card}>
        {agendas.length === 0 ? (
          <Text style={{ padding: 16, color: "#64748b" }}>
            Nenhuma agenda cadastrada
          </Text>
        ) : (
          agendas.map((item, index) => (
            <AgendaItem
              key={item.id}
              horario={item.horario}
              sala={item.dispositivos?.nome || "Dispositivo"}
              acao={formatarAcao(item)}
              dias={item.dias_semana}
              ativo={item.ativo}
              ultimo={index === agendas.length - 1}
              onToggle={() => toggleAtivo(item.id, item.ativo)}
            />
          ))
        )}
      </View>

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => router.push("/Projeto/CadastroDispositivoAgenda")}
      >
        <Text style={styles.botaoTexto}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function AgendaItem({
  sala,
  horario,
  acao,
  dias,
  ativo,
  ultimo = false,
  onToggle,
}: any) {
  return (
    <TouchableOpacity
      style={[styles.item, !ultimo && styles.bordaInferior]}
    >
      <View>
        <View style={styles.horarioContainer}>
          <Text>🕒</Text>
          <Text style={styles.horario}>{horario}</Text>
        </View>

        <Text style={styles.dias}>{dias}</Text>

        <Text style={styles.nomeSala}>{sala}</Text>
        <Text style={styles.acao}>{acao}</Text>
      </View>

      <View style={styles.acoes}>
        <Switch
          value={ativo}
          onValueChange={onToggle}
          trackColor={{
            false: "#cbd5e1",
            true: "#10b981",
          }}
          thumbColor="#fff"
        />
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

  card: {
    marginHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },

  bordaInferior: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  horarioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  relogio: {
    fontSize: 18,
    marginRight: 6,
    color: "#0f172a",
  },

  horario: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },

  dias: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 6,
  },

  nomeSala: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },

  acao: {
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

  botaoAdicionar: {
    backgroundColor: "#10b981",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});



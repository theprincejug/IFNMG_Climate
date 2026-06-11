import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";

export default function Agenda() {
  const [agenda101, setAgenda101] = useState(true);
  const [agenda201, setAgenda201] = useState(false);
  const [agendaLab, setAgendaLab] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Agenda</Text>
        <Text style={styles.subtitulo}>
          Controle os agendamentos automáticos
        </Text>
      </View>

      <View style={styles.card}>
        <AgendaItem
          sala="Sala 101"
          horario="07:00"
          acao="Ligar Ar-condicionado"
          ativo={agenda101}
          setAtivo={setAgenda101}
        />

        <AgendaItem
          sala="Sala 201"
          horario="18:00"
          acao="Desligar Ar-condicionado"
          ativo={agenda201}
          setAtivo={setAgenda201}
        />

        <AgendaItem
          sala="Laboratório 01"
          horario="08:00"
          acao="Ligar Ar-condicionado"
          ativo={agendaLab}
          setAtivo={setAgendaLab}
          ultimo
        />
      </View>

      {/* Botão flutuante de adicionar */}
      <TouchableOpacity style={styles.botaoAdicionar}>
        <Text style={styles.botaoTexto}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

interface AgendaItemProps {
  sala: string;
  horario: string;
  acao: string;
  ativo: boolean;
  setAtivo: React.Dispatch<React.SetStateAction<boolean>>;
  ultimo?: boolean;
}

function AgendaItem({
  sala,
  horario,
  acao,
  ativo,
  setAtivo,
  ultimo = false,
}: AgendaItemProps) {
  return (
    <TouchableOpacity
      style={[styles.item, !ultimo && styles.bordaInferior]}
    >
      <View>
        <View style={styles.horarioContainer}>
          <Text style={styles.relogio}>🕒</Text>
          <Text style={styles.horario}>{horario}</Text>
        </View>

        <Text style={styles.dias}>D S T Q Q S S</Text>

        <Text style={styles.nomeSala}>{sala}</Text>
        <Text style={styles.acao}>{acao}</Text>
      </View>

      <View style={styles.acoes}>
        <Switch
          value={ativo}
          onValueChange={setAtivo}
          trackColor={{
            false: "#cbd5e1",
            true: "#10b981",
          }}
          thumbColor="#fff"
        />
        <Text style={styles.seta}>›</Text>
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



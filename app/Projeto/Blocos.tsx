import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";

import { supabase } from "@/lib/supabase";

// Interfaces para tipagem do TypeScript
interface Dispositivo {
  id: string;
  nome: string;
  temperatura: string;
  ligado: boolean;
}

interface Bloco {
  id: string;
  nome: string;
  dispositivos: Dispositivo[]; // Lista de salas/dispositivos dentro do bloco
}

export default function Blocos() {
  const router = useRouter();
  const [blocos, setBlocos] = useState<Bloco[]>([]);

  // Estados antigos (mantidos para não quebrar o bloco fixo se precisar)
  const [sala101, setSala101] = useState(true);
  const [sala102, setSala102] = useState(true);
  const [sala103, setSala103] = useState(false);

  useEffect(() => {
    const buscarBlocos = async () => {
      const { data, error }: { data: Bloco[] | null; error: any } = await supabase
        .from("blocos")
        .select(`
          id,
          nome,
          dispositivos!left (
            id,
            nome,
            temperatura,
            estado
          )
        `);
  
      if (error) {
        console.log("Erro ao buscar blocos:", error);
        return;
      }

      
      setBlocos(data || []);
    };
    
    buscarBlocos();
  }, []);
  
  console.log("BLOCOS DATA:", blocos);

  // Função para alternar o Switch na lista dinâmica do Supabase
  const alternarDispositivo = async (blocoId: string, dispositivoId: string, valorAtual: boolean) => {
    const novoValor = !valorAtual;

    // 1. Atualiza no banco de dados (ajuste o nome da tabela se necessário)
    const { error } = await supabase
      .from("dispositivos")
      .update({ ligado: novoValor })
      .eq("id", dispositivoId);

    if (error) {
      console.log("Erro ao atualizar dispositivo:", error);
      return;
    }

    // 2. Atualiza no estado local para refletir na tela imediatamente
    setBlocos((blocosAnteriores) =>
      blocosAnteriores.map((bloco) => {
        if (bloco.id !== blocoId) return bloco;

        return {
          ...bloco,
          dispositivos: bloco.dispositivos.map((disp) =>
            disp.id === dispositivoId ? { ...disp, ligado: novoValor } : disp
          ),
        };
      })
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Blocos e Dispositivos</Text>
        <Text style={styles.subtitulo}>
          Selecione um dispositivo para controlar
        </Text>
      </View>

      {/* BOTÕES */}
      <View style={styles.containerBotoes}>
        <TouchableOpacity
          style={styles.botaoPrimario}
          onPress={() => router.push("/Projeto/CadastrarBloco")}
        >
          <Text style={styles.textoPrimario}>+ Bloco</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => router.push("/Projeto/CadastrarDispositivos")}
        >
          <Text style={styles.textoSecundario}>+ Dispositivo</Text>
        </TouchableOpacity>
      </View>

      {/* BLOCOS DINÂMICOS DO SUPABASE */}
      {blocos.map((bloco) => (
        <View key={bloco.id} style={styles.blocoContainer}>
          <Text style={styles.blocoTitulo}>{bloco.nome}</Text>

          <View style={styles.card}>
            {bloco.dispositivos && bloco.dispositivos.length > 0 ? (
              bloco.dispositivos.map((disp) => (
                <SalaItem
                  key={disp.id}
                  nome={disp.nome}
                  temperatura={disp.temperatura || "N/A"}
                  ligado={disp.ligado}
                  setLigado={() => alternarDispositivo(bloco.id, disp.id, disp.ligado)}
                />
              ))
            ) : (
              <Text style={{ padding: 16, color: "#64748b" }}>
                Nenhum dispositivo carregado ainda
              </Text>
            )}
          </View>
        </View>
      ))}

    </ScrollView>
  );
}

/* ================= ITEM ================= */

interface SalaItemProps {
  nome: string;
  temperatura: string;
  ligado: boolean;
  setLigado: (valor: boolean) => void;
}

function SalaItem({ nome, temperatura, ligado, setLigado }: SalaItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.salaItem}>
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

        <TouchableOpacity onPress={() => router.push("/controleSala")}>
          <Text style={styles.seta}>›</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  header: {
    padding: 24,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
  },

  subtitulo: {
    marginTop: 6,
    color: "#64748b",
  },

  containerBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 20,
  },

  botaoPrimario: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },

  botaoSecundario: {
    flex: 1,
    backgroundColor: "#e2e8f0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  textoPrimario: {
    color: "#fff",
    fontWeight: "bold",
  },

  textoSecundario: {
    color: "#0f172a",
    fontWeight: "bold",
  },

  blocoContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },

  blocoTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
  },

  salaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  nomeSala: {
    fontSize: 16,
    fontWeight: "600",
  },

  temperatura: {
    color: "#64748b",
  },

  acoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  seta: {
    fontSize: 22,
    color: "#94a3b8",
    marginLeft: 10,
  },
});
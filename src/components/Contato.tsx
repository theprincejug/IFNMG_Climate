import { View, StyleSheet, Text } from "react-native";
import Avatar from "./Avatar";
import { ContatoType } from "@/src/tipos/Types";

type ContatoProps = {
  contato: ContatoType;
};

export default function Contato({ contato }: ContatoProps) {
  return (
    <View style={styles.container1}>
      <Avatar />
      <View style={styles.container2}>
        <Text style={styles.nome}>{contato.nome}</Text>
        <Text style={styles.telefone}>
          {contato.telefone}
          {!contato.telefone && "Telefone não disponível"}
        </Text>
        <Text>{contato.online ? "Online" : "Offline"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row",
    gap: 10,
    padding: 4,
  },
  container2: {
    gap: 5,
    justifyContent: "center",
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
  },
  telefone: {
    fontSize: 18,
    color: "gray",
  },
});

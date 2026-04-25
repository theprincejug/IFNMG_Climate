import { StyleSheet, Text } from "react-native";
export default function VezJogadorJogoDaVelha() {
  return (
        <Text style={styles.turnText}>Vez: Jogador 1</Text>
  );
}
const styles = StyleSheet.create({
   turnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },

});

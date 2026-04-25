import { StyleSheet, Text, View } from "react-native";
export default function PlacarJogoDaVelha() {
  return (
        <View style={styles.scoreCard}>
          <View style={styles.playerScore}>
            <Text style={[styles.icon, styles.xIcon]}>✖</Text>
            <Text style={styles.scoreText}>01</Text>
          </View>
          <View style={styles.playerScore}>
            <Text style={[styles.icon, styles.oIcon]}>⭘</Text>
            <Text style={styles.scoreText}>01</Text>
          </View>
        </View>
  );
}
const styles = StyleSheet.create({
 scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  playerScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  icon: {
    fontSize: 40,
    marginRight: 10,
    fontWeight: 'bold',
  },
  xIcon: {
    color: '#FF6B6B', 
  },
  oIcon: {
    color: '#8ce95a', 
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
});

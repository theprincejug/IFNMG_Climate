import { StyleSheet, Text, View } from "react-native";
export default function CronometroJogoDaVelha() {
  return (
      <View style={styles.timerCard}>
          <Text style={styles.timerText}>0:05</Text>
        </View>

  );
}
const styles = StyleSheet.create({
   timerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  timerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

});

import { StyleSheet, TouchableOpacity, View } from "react-native";
export default function TabuleiroJogoDaVelha() {
  return (

 <View style={styles.boardCard}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.cell, styles.borderRight, styles.borderBottom]} />
            <TouchableOpacity style={[styles.cell, styles.borderRight, styles.borderBottom]} />
            <TouchableOpacity style={[styles.cell, styles.borderBottom]} />
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.cell, styles.borderRight, styles.borderBottom]} />
            <TouchableOpacity style={[styles.cell, styles.borderRight, styles.borderBottom]} />
            <TouchableOpacity style={[styles.cell, styles.borderBottom]} />
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.cell, styles.borderRight]} />
            <TouchableOpacity style={[styles.cell, styles.borderRight]} />
            <TouchableOpacity style={styles.cell} />
          </View>
        </View>  );
}
const styles = StyleSheet.create({
   boardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    width: 300,
    height: 300,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderRight: {
    borderRightWidth: 2,
    borderRightColor: '#E0E0E0', 
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
  },

});

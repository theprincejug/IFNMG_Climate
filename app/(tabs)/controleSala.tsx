// import { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Switch,
// } from "react-native";
import ControleSala from "../Projeto/ControleSala";

export default function TelaControleSala() {
  // const [ligado, setLigado] = useState(true);
  // const [temperatura, setTemperatura] = useState(22);
  
  return <ControleSala />;}
//     <View style={styles.container}>
//       <Text style={styles.titulo}>Sala 101</Text>

//       <View style={styles.card}>
//         <Text style={styles.label}>Temperatura Atual</Text>
//         <Text style={styles.tempAtual}>22°C</Text>
//       </View>

//       <View style={styles.cardLinha}>
//         <Text style={styles.label}>Ar-condicionado</Text>

//         <Switch
//           value={ligado}
//           onValueChange={setLigado}
//           trackColor={{
//             false: "#cbd5e1",
//             true: "#10b981",
//           }}
//         />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.label}>
//           Temperatura Desejada
//         </Text>

//         <View style={styles.tempContainer}>
//           <TouchableOpacity
//             style={styles.botao}
//             onPress={() => setTemperatura(temperatura - 1)}
//           >
//             <Text style={styles.botaoTexto}>−</Text>
//           </TouchableOpacity>

//           <Text style={styles.tempDesejada}>
//             {temperatura}°C
//           </Text>

//           <TouchableOpacity
//             style={styles.botao}
//             onPress={() => setTemperatura(temperatura + 1)}
//           >
//             <Text style={styles.botaoTexto}>+</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fafc",
//     padding: 24,
//   },

//   titulo: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#0f172a",
//     marginBottom: 20,
//     marginTop: 50,
//   },

//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     padding: 20,
//     marginBottom: 16,
//   },

//   cardLinha: {
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     padding: 20,
//     marginBottom: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   label: {
//     color: "#64748b",
//     marginBottom: 8,
//   },

//   tempAtual: {
//     fontSize: 42,
//     fontWeight: "bold",
//     color: "#10b981",
//   },

//   tempContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },

//   tempDesejada: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#0f172a",
//   },

//   botao: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#10b981",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   botaoTexto: {
//     color: "#fff",
//     fontSize: 28,
//     fontWeight: "bold",
//   },

// });
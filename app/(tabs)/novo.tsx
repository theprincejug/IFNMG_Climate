import { useState } from "react";
import { View, Text, Button } from "react-native";


export default function NovoPage() {

    const [contador, setContador] = useState(0);

    function incrementar() {
        setContador(contador + 1);
        console.log(`Counter: ${contador}`);
    }

  return (
    <View style={{ flex: 1}}>
      <Text>Contador: {contador}</Text>
      <Button title="Clique aqui mermao!" onPress={incrementar}  />
    </View>
  );
}
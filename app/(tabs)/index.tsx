// import Contato from '@/components/Contato';
// import { getContatos } from '@/src/api/contatosApi';
import React from "react";
import Cabecalho from "@/components/Cabecalho";
import Dashboard from "@/components/Dashboard";

export default function index() {
  // const contatos = getContatos();

  return (
    // <ScrollView>
    //   <Text>Index</Text>
    //    {contatos.map((contato, index) => (
    //     <Contato key={index} contato={contato} />
    //   ))}
    // </ScrollView>

    // <View style={{ flex: 1 }}>
    //   <Button title="Adicionar Contato" onPress={funcaoTeste1} />
    //   <FlatList
    //     data={contatos}
    //     renderItem={(({item, index}) => <Contato contato={item} key={index}/>)}
    //   />
    // </View>
      <>
        <Cabecalho />
        <Dashboard />
      </>
  );
}

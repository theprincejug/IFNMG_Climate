// import Contato from '@/components/Contato';
import Login from '@/components/Login';
// import { getContatos } from '@/src/api/contatosApi';
import React from 'react';

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
    
    <Login />
  );
}
  
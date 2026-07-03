import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useRouter } from "expo-router";
import { LogOut, Bell } from 'lucide-react-native';
import { logout } from '@/src/api/auth';

export default function Cabecalho() {
  const router = useRouter();

  const [erro, setErro] = React.useState("");

  const handleLogout = async () => {
    try {
      await logout();

      router.push("/login");
    } catch (error: unknown) {
      setErro("Ocorreu Um Erro Ao Fazer Logout");

      setTimeout(() => {
        setErro("");
      }, 5000);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoIcone}
        onPress={handleLogout}
      >
        <LogOut color="#64748b" size={24} />
      </TouchableOpacity>

      <View style={styles.centro}>
      {!erro ? (
        <>
          <Text style={styles.titulo}>IFNMG Campus</Text>
          <Text style={styles.subtitulo}>Sistema de Controle HVAC</Text>
        </>
      ) : (<Text style={styles.mensagemErro}>{erro}</Text>)}
      </View>

      <TouchableOpacity style={styles.botaoIcone} activeOpacity={0.7}>
        <Bell color="#64748b" size={24} />
        <View style={styles.indicadorVerde} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  botaoIcone: {
    padding: 8,
    position: 'relative',
  },
  centro: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitulo: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  indicadorVerde: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 10,
    height: 10,
    backgroundColor: '#10b981',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  mensagemErro: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  }
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from "expo-router";
import { LogOut, Bell } from 'lucide-react-native';

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      {/* Botão Sair */}
      <TouchableOpacity
        style={styles.botaoIcone}
        onPress={() => router.push("/Projeto/Login")}
      >
        <LogOut color="#64748b" size={24} />
      </TouchableOpacity>

      {/* Textos Centrais */}
      <View style={styles.centro}>
        <Text style={styles.titulo}>IFNMG Campus</Text>
        <Text style={styles.subtitulo}>Sistema de Controle HVAC</Text>
      </View>

      {/* Botão Notificação */}
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
    paddingTop: 48, // Espaçamento para a barra de status do celular
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9', // Linha sutil separando o cabeçalho
  },
  botaoIcone: {
    padding: 8,
    position: 'relative', // Necessário para posicionar a bolinha verde
  },
  centro: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b', // Azul muito escuro/quase preto
  },
  subtitulo: {
    fontSize: 12,
    color: '#64748b', // Cinza médio
    marginTop: 2,
  },
  indicadorVerde: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 10,
    height: 10,
    backgroundColor: '#10b981', // Verde do seu layout
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ffffff', // Bordinha branca para destacar
  },
});
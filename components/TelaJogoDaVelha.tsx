import CronometroJogoDaVelha from '@/components/CronometroJogoDaVelha';
import PlacarJogoDaVelha from '@/components/PlacarJogoDaVelha';
import TabuleiroJogoDaVelha from '@/components/TabuleiroJogoDaVelha';
import VezJogadorJogoDaVelha from '@/components/VezJogadorJogoDaVelha';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

export default function TelaJogoDaVelha() {
  return (
    <View
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <PlacarJogoDaVelha />
         <CronometroJogoDaVelha />
          <VezJogadorJogoDaVelha />
        <TabuleiroJogoDaVelha />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1aabee',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cardShadow: {
    backgroundColor: '#282189ff',
    borderRadius: 20,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
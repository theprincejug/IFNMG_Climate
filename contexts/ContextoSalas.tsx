import React, { createContext, useState, ReactNode } from 'react';

// Tipagem da Sala
export type Sala = {
  id: number;
  nome: string;
  temperatura: number;
  status: string;
  consumo: string;
  ligado: boolean;
};

// Dados Iniciais
const salasIniciais: Sala[] = [
  { id: 1, nome: 'Bloco A - Sala 101', temperatura: 22, status: 'Esfriar', consumo: '~ 850W', ligado: true },
  { id: 2, nome: 'Bloco B - Sala 201', temperatura: 19, status: 'Aquecer', consumo: '~ 920W', ligado: true },
  { id: 3, nome: 'Bloco C - Lab 301', temperatura: 24, status: 'Esfriar', consumo: '~ 1100W', ligado: true },
];

export const ContextoSalas = createContext<any>(null);

export function ProvedorSalas({ children }: { children: ReactNode }) {
  const [salas, setSalas] = useState<Sala[]>(salasIniciais);

  // Função que a tela de Controle vai chamar para atualizar o Dashboard
  const atualizarTemperatura = (id: number, novaTemp: number) => {
    setSalas(salasAtuais => 
      salasAtuais.map(sala => 
        sala.id === id ? { ...sala, temperatura: novaTemp } : sala
      )
    );
  };

  return (
    <ContextoSalas.Provider value={{ salas, atualizarTemperatura }}>
      {children}
    </ContextoSalas.Provider>
  );
}
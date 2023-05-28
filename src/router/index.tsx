import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Pesquisas from '../pages/Pesquisas';
import PesquisaVerMais from '../pages/PesquisasVerMais';
import { createStackNavigator } from '@react-navigation/stack';

type StackParams = {
  Pesquisas : undefined,
  PesquisaVerMais: IProdutos,
}

export interface IProdutos {
  produtos: [],
  prazo: string;
  id: string;
  pesquisaId: string;
}

export interface IPrazo {
  prazo: string
}

export interface IPesquisaID {
  idPesquisa: string
}

export interface IPesquisa {
  id: string,
  lojas: number,
  dateIni: string,
  dateFin: string,
  categoria: string,
  produtos: [],
  respostas: [],
}

export default function Router() {

  const Stack = createStackNavigator<StackParams>();

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Pesquisas" component={Pesquisas} options={{ headerShown: false }} />
        <Stack.Screen name="PesquisaVerMais" component={PesquisaVerMais} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PesquisaVerMais from './src/components/card-PesquisaVerMais';
import Pesquisas from './src/pages/Pesquisas';
import Menu from './src/components/menuBottom';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
       <Menu/>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});

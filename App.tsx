import React from 'react';
<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PesquisaVerMais from './src/components/card-PesquisaVerMais';
import Pesquisas from './src/pages/Pesquisas';
import Menu from './src/components/menuBottom';
=======
import Router from './src/router';
import { AuthContextProvedor } from './src/context/auth';
>>>>>>> c6f53d91951f41f0f596a72163e5b60d87c43566

export default function App() {

  

  return (
<<<<<<< HEAD
       <Menu/>
=======
    <AuthContextProvedor>
      <Router/>
    </AuthContextProvedor>
>>>>>>> c6f53d91951f41f0f596a72163e5b60d87c43566
  );
}

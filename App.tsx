
import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PesquisaVerMais from './src/components/card-PesquisaVerMais';
import Pesquisas from './src/pages/Pesquisas';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Pesquisas" component={Pesquisas} options={{ headerShown: false }}/>
        <Stack.Screen name="PesquisaVerMais" component={PesquisaVerMais} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {

  },
});

<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Card from './src/components/card-PesquisaVerMais';
=======
import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PesquisaVerMais from './src/components/card-PesquisaVerMais';
import Pesquisas from './src/pages/Pesquisas';
>>>>>>> f8f11139e2843718a0e1fb5329de90f6d1598efb

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Card/>
    </View>
=======
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Pesquisas" component={Pesquisas} options={{ headerShown: false }}/>
        <Stack.Screen name="PesquisaVerMais" component={PesquisaVerMais} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> f8f11139e2843718a0e1fb5329de90f6d1598efb
  );
}

const styles = StyleSheet.create({
  container: {

  },
});

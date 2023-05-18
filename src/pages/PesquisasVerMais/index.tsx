import React from 'react'
import { View, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import Card from '../../components/card-PesquisaVerMais'

export default function PesquisaVerMais() {
  return (
    <View style={styles.container}>
        <Header text="Detalhes da pesquisa" />
        <Card />
        <View style={styles.cardFundoBranco}>
          
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  cardFundoBranco: {
    height: '63%',
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 100,
  }
})
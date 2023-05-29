import React, { useContext, useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import { View, StyleSheet } from 'react-native'
import { IPesquisa, IProdutos } from '../../router';
import { StackNavigationProp } from '@react-navigation/stack';

type StackParams = {
    Loading: undefined,
    Pesquisas: undefined,
    PesquisaVerMais: IProdutos
}

type NavigationProps = StackNavigationProp<StackParams, "Loading">

export type ScreenProps = {
    navigation: NavigationProps,
    render: IPesquisa,
}

export default function Loading({ navigation }: ScreenProps) {

    if(Location.name === "Loading") {
        setTimeout(() => {
            navigation.navigate("Pesquisas")
        }, 4500)
    }

    return (
        <View style={styles.animacao}>
            <Animatable.Text style={styles.texto} animation="pulse" iterationCount={5} direction="alternate">Cima baixo</Animatable.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    animacao: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {

    }
})

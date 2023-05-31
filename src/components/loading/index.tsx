import React, { useContext, useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import { View, StyleSheet, Text } from 'react-native'

export default function Loading() {

   

    return (
        <View style={styles.container}>
            <Text style={styles.texto} >Sem pesquisas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 19,

    }
})

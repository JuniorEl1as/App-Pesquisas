import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default function CardProdutos({ item }) {

    return (
        <>
            <TouchableOpacity style={styles.botao} >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.nomeProduto}>{item.nome}</Text>
                        <Text style={styles.descricaoProduto}>Exemplo descrição produto</Text>
                    </View>
                    <View>
                        <Text>SVG</Text>
                    </View>

                </View>
            </TouchableOpacity>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
       
    },
    nomeProduto: {
        color: "#0054A6",
        fontSize: 20
    },
    descricaoProduto: {
        color: "#808080",
        fontSize: 20
    },
    botao: {

    }

})

import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function CardPesquisas() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() =>  navigation.navigate("PesquisaVerMais")}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.pesquisa}>Pesquisa</Text>
                        <Text style={styles.texto}>Status :</Text>
                        <Text style={styles.texto}>Prazo :</Text>
                    </View>
                    <View>
                        <Text style={styles.texto}>RX</Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 1,
        width: '90%',
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    card: {
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pesquisa: {
        color: '#0054A6',
        fontSize: 18,
        fontWeight: 'bold'
    },
    texto: {
        fontSize: 18,
    }
})


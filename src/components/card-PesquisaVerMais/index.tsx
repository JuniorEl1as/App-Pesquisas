import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = () => {
    return (
        <View>
            <View style={styles.card}>
                <Text style={styles.titulo}>Pesquisa</Text>
                <Text style={styles.texto}>Status:</Text>
                <Text style={styles.texto}>Aberta</Text>
                <Text style={styles.texto}>Prazo:</Text>
            </View>
            <View>

            </View>
        </View>
            
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 16,
        padding: 16,
        width: 330,
        height: 120,
        margin: 20
    },
    titulo: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 19,
        lineHeight: 22,
        color: '#0054A6',
        margin: 1,
    },
    texto: {
        fontSize: 19,
    }
});

export default Card;
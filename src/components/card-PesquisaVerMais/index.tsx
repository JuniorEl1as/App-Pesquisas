<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = () => {
    const handleCardPress = () => {
        console.log('Card pressionado!');
    };

    return (
        // <TouchableOpacity onPress={handleCardPress}>
            <View style={styles.card}>
                <Text style={styles.titulo}>Pesquisa</Text>
                <Text style={styles.descricao}>Status:</Text>
                <Text style={styles.status}>Aberta</Text>
                <Text style={styles.prazo}>Prazo:</Text>
                <Text style={styles.data}>99/99 até 99/99</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 4,
        marginBottom: 16,
        padding: 16,
        width: 330,
        height: 120,

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
    descricao: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: '#252525',
        position: 'absolute',
        left: 8,
        top: 37,
        margin: 8,
    },
    status: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: '#1F8F39',
        position: 'absolute',
        left: 66,
        top: 37,
        margin: 8,
    },
    prazo: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: '#252525',
        position: 'absolute',
        left: 8,
        top: 60,
        margin: 10,
    },
    data: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
        position: 'absolute',
        left: 66,
        top: 60,
        margin: 10,
    },
});

export default Card;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.texto}>Status :</Text>
                <Text style={styles.texto}>Loja :</Text>
                <Text style={styles.texto}>Prazo :</Text>
            </View>
            <View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        position: 'absolute',
        top: 90,
        
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        width: 340,
        height: 120,
        margin: 20,
        elevation: 10
    },
    texto: {
        fontSize: 19,
    },
    }
);

export default Card;
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Menu = () => {
    return (
        <View style={styles.container}>

            <View style={styles.icones}>
                <Image source={require('../Icons/home-black.png')} />
                <Text>Início</Text>
            </View>

            <View style={styles.icones}>
                <Image source={require('../Icons/vendas.png')} />
                <Text>Vendas</Text>
            </View>

            <View style={styles.icones}>
                <Image source={require('../Icons/dicas.png')} />
                <Text>Dicas</Text>
            </View>

            <View style={styles.icones}>
                <Image source={require('../Icons/satisfacao.png')} />
                <Text>Satisfação</Text>
            </View>

            <View style={styles.icones}>
                <Image source={require('../Icons/menu.png')} />
                <Text>Menu</Text>
            </View>

        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 16,
        width: 350,
        height: 100,
        left: 15,
        top: 150,
        justifyContent: 'space-between',
        flexDirection: 'row',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)', // Cor da borda semitransparente
        borderRadius: 8, // Raio de curvatura da borda
    },
    icones: {
        position: 'relative',
        width: 'auto',
        height: 'auto',
        top: 2,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 150,
        marginHorizontal: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});



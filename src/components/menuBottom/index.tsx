import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Menu = () => {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.icones}>
                <Image source={require('../Icons/home-black.png')} />
                <Text>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.icones}>
                <Image source={require('../Icons/vendas.png')} />
                <Text>Vendas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.icones}>
                <Image source={require('../Icons/dicas.png')} />
                <Text>Dicas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.icones}>
                <Image source={require('../Icons/satisfacao.png')} />
                <Text>Satisfação</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.icones}>
                <Image source={require('../Icons/menu.png')} />
                <Text>Menu</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 16,
        width: '100%',
        height: 80,
        top: 690,
        justifyContent: 'space-between',
        flexDirection: 'row',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
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



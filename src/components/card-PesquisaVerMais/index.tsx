import moment from 'moment';
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/auth';

const Card = ({ item }) => {

    const { myLoja}: any = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.texto}>Status : </Text>
                <Text style={styles.texto}>Loja : {myLoja.nomeFilial}</Text>
                <Text style={styles.texto}>Prazo : {moment(item).format('DD/MM/YYYY')}</Text>
            </View>
            <View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
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
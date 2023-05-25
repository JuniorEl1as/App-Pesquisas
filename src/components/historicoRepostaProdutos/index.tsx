import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons'

const ModalFormHistorico = ({ isVisibleHistorico, onCloseHistorico }) => {

    const ok = () => {
        onCloseHistorico()
    };

    return (
        <Modal isVisible={isVisibleHistorico} onBackdropPress={onCloseHistorico}>
            <View style={styles.container}>
                <View style={styles.titulo}>
                    <Text style={styles.text}>Histórico</Text>
                    <TouchableOpacity onPress={() => onCloseHistorico()}>
                        <AntDesign name="closecircleo" size={30} color="black" style={styles.close} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>ajdnjsdbnakdbakhdba</Text>
                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    },
    titulo: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        height: 450,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    botao: {
        backgroundColor: 'green',
        height: 60,
        justifyContent: 'center',
    },
    close: {
        color: "red",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default ModalFormHistorico;
import React, { useContext, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, StatusBar, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Header from '../../components/Header'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';

export default function Pesquisas() {
    const {pesquisaLoja}: any = useContext(AuthContext);

    const [selectedValue, setSelectedValue] = useState('');

    const navigation:any = useNavigation();

    const CardPesquisas = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("PesquisaVerMais")}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.pesquisa}>Pesquisa</Text>
                            <Text style={styles.texto}>Prazo : {item.dateFin}</Text>
                            <Text style={styles.texto}>Quantidade de produtos : {item.produtos.length}</Text>
                            <Text style={styles.texto}>Status : </Text>
                            <Text style={styles.texto}></Text>
                        </View>
                        <View>
                            <Text style={styles.texto}></Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <StatusBar />
            <View>
                <Header text="Pesquisas" />
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(value: string) => setSelectedValue(value)}
                >
                    <Picker.Item key={1} label="RX Marca" value="RX Marca" />
                    <Picker.Item key={2} label="OTC Genéricos" value="Genéricos" />
                    <Picker.Item key={3} label="OTC Infantil" value="Infantil" />
                </Picker>
                <FlatList  style={{height: 600}}
                    data={pesquisaLoja}
                    renderItem={CardPesquisas}
                    keyExtractor={dados => dados.id}
                />
            </View>
        </SafeAreaView>

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

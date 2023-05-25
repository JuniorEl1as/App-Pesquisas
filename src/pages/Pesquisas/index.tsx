import React, { useContext, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, StatusBar, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Header from '../../components/Header'
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/auth';
import Menu from '../../components/menuBottom';
import { IProdutos } from '../../router';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';

type StackParams = {
    Pesquisas: undefined,
    PesquisaVerMais: IProdutos
}

type NavigationProps = StackNavigationProp<StackParams, "Pesquisas">

export type ScreenProps = {
    navigation: NavigationProps
}

export default function Pesquisas({ navigation }: ScreenProps) {
    const { pesquisaLoja, selectedValue, setSelectedValue, setPesquisaLoja }: any = useContext(AuthContext);
    const { pesquisaLojaFilter, setPesquisaLojaFilter, myLoja }: any = useContext(AuthContext);

    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();
    // const dataFormatada = `20/05/2023`;
    const dataFormatada = `${dia}/${mes}/${ano}`;

    function FiltrandoPesquisas(value: string) {
        setSelectedValue(value)
        if (value != "Todas") {
            console.log(value)
            let armazenaDados = pesquisaLoja.filter((pesquisa) => pesquisa.categoria === value)
            console.log(armazenaDados)
            setPesquisaLojaFilter(armazenaDados)
        } else {
            setPesquisaLojaFilter(pesquisaLoja)
            console.log(pesquisaLojaFilter)
        }

    }

    const CardPesquisas = ({ item }) => {



        return (
            <TouchableOpacity onPress={() => navigation.navigate("PesquisaVerMais", {produtos: item.produtos, prazo: item.dateFin, id: item.id, pesquisaId: item.id })}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.pesquisa}>Pesquisa aberta</Text>
                            <Text style={styles.texto}>Prazo : {moment(item.dateFin).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.texto}>Quantidade de produtos : {item.produtos.length}</Text>
                            <Text style={styles.texto}>Status : </Text>
                            <Text style={styles.texto}>Categoria : {item.categoria}</Text>
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
            <View>
                <StatusBar />
                <View>
                    <Header text="Pesquisas" />
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(value: string) => FiltrandoPesquisas(value)}
                    >
                        <Picker.Item key={4} label="Todas" value="Todas" />
                        <Picker.Item key={1} label="RX Marca" value="RX Marca" />
                        <Picker.Item key={2} label="RX Genérico" value="RX Genérico" />
                        <Picker.Item key={3} label="OTC" value="OTC" />
                        <Picker.Item key={4} label="Marca Própria" value="Marca Própria" />
                    </Picker>
                    <FlatList style={{ height: 500, marginBottom: 10 }}
                        data={pesquisaLojaFilter}
                        renderItem={CardPesquisas}
                        keyExtractor={pesquisaLojaFilter => pesquisaLojaFilter.id}
                    />
                </View>
                <Text style={styles.myLoja}>Pesquisas da loja {myLoja.nomeFilial} </Text>
                <Menu />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderColor: '#0054A6',
        borderWidth: 1,
        width: '90%',
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 5,
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
    },
    dash: {
        position: 'absolute',
        bottom: 0
    },
    myLoja: {
        marginLeft: '15%'
    }
})

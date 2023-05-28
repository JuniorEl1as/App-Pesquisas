import React, { useContext } from 'react'
import { FlatList, SafeAreaView, StyleSheet, StatusBar, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Header from '../../components/Header'
import { Picker } from '@react-native-picker/picker';
import { AuthContext, IRespostaPesquisa } from '../../context/auth';
import Menu from '../../components/menuBottom';
import { IPesquisa, IProdutos } from '../../router';
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
    const { pesquisaLoja, selectedValue, setSelectedValue, respostasPesquisas }: any = useContext(AuthContext);
    const { pesquisaLojaFilter, setPesquisaLojaFilter, myLoja, status, setStatus }: any = useContext(AuthContext);


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

    const idRespostasTrue = respostasPesquisas.map((resposta: IRespostaPesquisa) => resposta.pequisaId)

    function abrirVerMais(produtos : [], prazo: string, id: string, pesquisaId: string) {
        navigation.navigate("PesquisaVerMais", { produtos, prazo, id, pesquisaId })
    }


    const CardPesquisas = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => abrirVerMais(item.produtos, item.dateFin, item.id, item.id)}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.pesquisa}>Pesquisa aberta</Text>
                            <Text style={styles.texto}>Prazo : {moment(item.dateFin).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.texto}>Quantidade de produtos : {item.produtos.length}</Text>

                            {idRespostasTrue.includes(item.id) === true ?
                                <Text style={styles.texto}>Status : <Text style={{ color: "green" }}>Conluida</Text></Text>
                                :
                                status === true ? <Text style={styles.texto}>Status : <Text style={{ color: "red" }}>Em andamento</Text></Text> :
                                <Text style={styles.texto}>Status : <Text style={{ color: "red" }}>Nova</Text></Text>
                            }

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
                        keyExtractor={pesquisaLojaFilter => pesquisaLojaFilter.id}
                        renderItem={CardPesquisas}
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

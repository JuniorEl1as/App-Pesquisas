import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Text, View, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../../context/auth';
import Menu from '../../components/menuBottom';
import { IPesquisa, IProdutos } from '../../router';
import { StackNavigationProp } from '@react-navigation/stack';
import { CardPesquisas } from '../../components/cardPesquisas';
import Loading from '../../components/loading';

type StackParams = {
    Pesquisas: undefined,
    PesquisaVerMais: IProdutos,
}

type NavigationProps = StackNavigationProp<StackParams, "Pesquisas">

export type ScreenProps = {
    navigation: NavigationProps,
    render: IPesquisa,
}

export default function Pesquisas({ navigation }: ScreenProps) {
    const { pesquisaLoja, selectedValue, setSelectedValue }: any = useContext(AuthContext);
    const { pesquisaLojaFilter, setPesquisaLojaFilter, myLoja }: any = useContext(AuthContext);
   
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
                    <ScrollView style={{maxHeight: 500, height: 500}}>

                        {                           
                            pesquisaLojaFilter.map( (pesquisa : IPesquisa ) => {
                                return <CardPesquisas key={pesquisa.id} navigation={navigation} render={pesquisa}/>
                            }) 
                        }

                    </ScrollView> 
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
        marginLeft: '15%',
    }
})

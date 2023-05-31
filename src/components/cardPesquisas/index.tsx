import React, { useContext, useState } from "react"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import { StackNavigationProp } from '@react-navigation/stack';
import { IPesquisa, IProdutos } from "../../router";
import moment from "moment";
import { AuthContext, IRespostaPesquisa } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type StackParams = {
    Pesquisas: undefined,
    PesquisaVerMais: IProdutos
}

type NavigationProps = StackNavigationProp<StackParams, "Pesquisas">

export type ScreenProps = {
    navigation: NavigationProps,
    render: IPesquisa,
}

export const CardPesquisas = ({ navigation, render }: ScreenProps) => {

    const {respostasPesquisas, loading }: any = useContext(AuthContext);
    const [status, setStatus] = useState<boolean>(false);
    const [statusSave, setStatusSave] = useState<string>();

    async function SalvarStatus(resposta: string) {
        await AsyncStorage.setItem("@Status", resposta)
        BuscarStatus()
    }

    async function BuscarStatus() {
        const response = await AsyncStorage.getItem("@Status")
        const objeto = JSON.stringify(response);
        if (objeto) {
            setStatusSave( objeto)
            setStatus(true)
        }
    }

    const idRespostasTrue = respostasPesquisas.map((resposta: IRespostaPesquisa) => resposta.pequisaId)

    function abrirVerMais(produtos : [], prazo: string, id: string, pesquisaId: string, statusSave: string, status: boolean) {
        navigation.navigate("PesquisaVerMais", { produtos, prazo, id, pesquisaId, statusSave, status })
        SalvarStatus("Click")
    }

    return (
        
        <TouchableOpacity key={render.id} onPress={() => abrirVerMais(render.produtos, render.dateFin, render.id, render.id, statusSave, status)}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.pesquisa}>{render.titulo}</Text>
                        <Text style={styles.texto}>Prazo : {moment(render.dateFin).format('DD/MM/YYYY')}</Text>
                        <Text style={styles.texto}>Quantidade de produtos : {render.produtos.length}</Text>

                        {idRespostasTrue.includes(render.id) === true ?
                            <Text style={styles.texto}>Status : <Text style={{ color: "green" }}>Conluida</Text></Text>
                            :
                            statusSave || status === true ? <Text style={styles.texto}>Status : <Text style={{ color: "#FFC700" }}>Em andamento</Text></Text> :
                            <Text style={styles.texto}>Status : <Text style={{ color: "#ED1C24" }}>Nova</Text></Text>
                        }

                        <Text style={styles.texto}>Categoria : {render.categoria}</Text>
                    </View>
                    <View>
                        <Text style={styles.texto}></Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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

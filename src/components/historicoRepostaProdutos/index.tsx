import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ListRenderItemInfo, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons'
import { AuthContext } from '../../context/auth';
import { IResposta } from '../modal';
import { IPesquisa } from '../../router';
import { FontAwesome } from '@expo/vector-icons';

const ModalFormHistorico = ({ isVisibleHistorico, pesquisaId }) => {

    const { setVisivilidadeHistorico, dadosStorage, ProdutoIdparaHistorico, pesquisaLoja, setDadosStorage } = useContext(AuthContext);
    const [categoria, setCategoria] = useState<string>()

    const resposta: [] = dadosStorage.filter((resposta: IResposta) => resposta.pesquisaId === pesquisaId)
    const respostaFilter = resposta.filter((resposta: IResposta) => resposta.id === ProdutoIdparaHistorico)

    useEffect(() => {
        setTimeout(async () => {
            const temp: IPesquisa = await pesquisaLoja.filter((pesquisa: IPesquisa) => pesquisa.id === pesquisaId)
            setCategoria(temp[0].categoria)
        })
    }, [])

    function ExcluirResposta(value: string) {
        setDadosStorage(dadosStorage.filter((resposta: IResposta) => resposta.idResposta != value))
    }

    const ConfirmarExcluirResposta = ( value: string) => {
        Alert.alert("Aviso", "Desejar excluir essa resposta?", [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    ExcluirResposta(value)
                }
            },
        ]);
    }

    return (
        <Modal isVisible={isVisibleHistorico} >
            <View style={styles.container}>

                <View style={styles.titulo}>
                    <Text style={styles.text}>Histórico</Text>
                    <TouchableOpacity onPress={() => setVisivilidadeHistorico(false)}>
                        <AntDesign name="closecircleo" size={30} color="black" style={styles.close} />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 570 }}>
                    <FlatList style={{ height: 500 }}
                        data={respostaFilter}
                        keyExtractor={(item) => item.idResposta}
                        renderItem={(item: ListRenderItemInfo<IResposta>) => {
                            return (
                                <View style={styles.caixaRenderIte}>
                                    <View>
                                        <Text style={{ fontSize: 18, marginTop: 5, marginBottom: 5 }}>{item.item.nomeProduto.substring(0, 20) + "..."}</Text>
                                        <View style={styles.precos}>
                                            <Text style={styles.texto}>Valor : {item.item.precoRegular}</Text>
                                            {categoria === "RX Marca" || categoria === "RX Genérico" ?
                                                <Text style={styles.texto}>Promocional: {item.item.precoPromocao}</Text>
                                                :
                                                <Text style={styles.texto}>Pague e leve: {item.item.precoPagueLeve}</Text>
                                            }
                                        </View>
                                        <Text style={styles.texto}>Loja : {item.item.lojaVisitada}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => ConfirmarExcluirResposta(item.item.idResposta)}>
                                        <FontAwesome name="trash-o" size={30} color="black" />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: 630,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10
    },
    titulo: {
        backgroundColor: 'white',
        borderRadius: 10,
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
    },
    precos: {
        display: "flex",
        flexDirection: "column",
    },
    texto: {
        fontSize: 17,
        marginRight: 10
    },
    caixaRenderIte: {
        borderWidth: 2,
        borderColor: "#0054A6",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
});

export default ModalFormHistorico;
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, } from 'react-native';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface IResposta {
    id: string;
    nomeProduto: string;
    lojaVisitada: string;
    precoRegular: number;
    precoPagueLeve: number;
    precoPromocao: number;
    pesquisaId: string;
}

const ModalForm = ({ isVisible, onClose, }) => {
    const { produtoID, nomeProduto, produtoCategoria, pesquisaID, precoRegular, setPrecoRegular }: any = useContext(AuthContext);
    const { dadosStorage, setDadosStorage }: any = useContext(AuthContext);
    const { PrecoPg, setprecoPg, PrecoPromocional, setPrecoPromocional, lojaPesquisada, setLojaPesquisada }: any = useContext(AuthContext);
    const [precoRegularComparacao, setPrecoRegularComparacao] = useState<string>('')
    const [precoPgComparacao, setPrecoPgComparacao] = useState<string>('')
    const [precoPromocionalComparacao, setPrecoPromocionalComparacao] = useState<string>('')
    const [checkboxproduto, setCheckboxProduto] = useState('unchecked')

    class FormularioResposta {
        id: string;
        nomeProduto: string;
        lojaVisitada: string;
        precoRegular: number;
        precoPagueLeve: number;
        precoPromocao: number;
        pesquisaId: string;
        constructor(id: string, nome: string, precoRegular: number, precoPagueLeve: number, lojaVisitada: string, precoPromocional: number, pesquisaId: string) {
            this.id = id;
            this.nomeProduto = nome;
            this.lojaVisitada = lojaVisitada;
            this.precoRegular = precoRegular;
            this.precoPagueLeve = precoPagueLeve;
            this.precoPromocao = precoPromocional;
            this.pesquisaId = pesquisaId;
        }
    }

    async function SaveAsyncStorage(resposta: string) {
        await AsyncStorage.setItem("@AppPesquisas", resposta)
        GetAsyncStorage()
    }

    async function GetAsyncStorage() {
        const response = await AsyncStorage.getItem("@AppPesquisas")
        const objeto = JSON.parse(response);
        if (objeto) {
            setDadosStorage([...dadosStorage, objeto])
        }
    }

    const handleConfirm = () => {
        if (precoRegularComparacao.length < 2) {
            createTwoButtonAlert("Campo vazio", "Informe o preço regular")
        } else if (precoPgComparacao.length < 2 && precoPromocionalComparacao.length < 2) {
            createTwoButtonAlert("Campo vazio", "Informe o preço promocional ou pague e leve")
        } else if (lojaPesquisada.length == 0) {
            createTwoButtonAlert("Campo vazio", "Informe o nome da loja")
        } else if (lojaPesquisada.length < 4) {
            createTwoButtonAlert("Nome da loja inválido", "Informe o nome da loja")
        }
        else {
            const objeto = new FormularioResposta(produtoID, nomeProduto, precoRegular, PrecoPg, lojaPesquisada, PrecoPromocional, pesquisaID);
            let objetoString = JSON.stringify(objeto)
            SaveAsyncStorage(objetoString)
            onClose()
            createTwoButtonAlert("Sucesso", "Resposta adicionada com sucesso!")
            console.log(` Dados do Async Storage ${dadosStorage}`)
        }
    }

    const createTwoButtonAlert = (alerta: string, mensagem: string) =>
        Alert.alert(alerta, mensagem, [
            { text: 'OK' },
        ]
        );

    function mudarPrecoRegular(value: string) {
        setPrecoRegularComparacao(value)
        const temporaria = parseFloat(value);
        setPrecoRegular(temporaria)
    }

    function mudarPrecoPromocional(value: string) {
        setPrecoPromocionalComparacao(value)
        const numero = parseFloat(value);
        setPrecoPromocional(numero)
    }

    function mudarPrecoPg(value: string) {
        setPrecoPgComparacao(value)
        const numero = parseFloat(value);
        setprecoPg(numero)
    }

    function Checkboxproduto() {
        setCheckboxProduto('checkd')
    }

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onClose()}>
                    <AntDesign name="closecircleo" size={30} color="black" style={styles.close} />
                </TouchableOpacity>
                <TextInput
                    label="Preço regular"
                    keyboardType='decimal-pad'
                    onChangeText={text => mudarPrecoRegular(text)} style={styles.campoTexto}
                />
                {produtoCategoria === "RX Marca" || produtoCategoria === "RX Genérico" ? <TextInput
                    label="Preço promocional"
                    keyboardType='numeric'
                    onChangeText={text => mudarPrecoPromocional(text)}
                    style={styles.campoTexto}
                /> : <TextInput
                    label="Preço pague e leve"
                    keyboardType='decimal-pad'
                    value={PrecoPg.toString()}
                    onChangeText={text => mudarPrecoPg(text)}
                    style={styles.campoTexto}
                />}
                <TextInput
                    label="Loja pesquisada"
                    onChangeText={text => setLojaPesquisada(text)}
                    style={styles.campoTexto}
                />
                <View style={styles.secaoCheckBox}>
                   
                    <Text>Produto não encontrado</Text>
                </View>
                <View style={styles.secaocamera}>
                    <SimpleLineIcons name="camera" size={30} style={styles.camera} />
                    <Text>Enviar foto</Text>
                </View>
                <Button mode="contained" style={styles.botao} onPress={handleConfirm}>
                    Confirmar
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        height: 550,
    },
    campoTexto: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
    },
    botao: {
        backgroundColor: 'green',
        height: 60,
        justifyContent: 'center',
    },
    camera: {
        color: "black",
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5,
        marginRight: 15
    },
    close: {
        marginLeft: 280,
        color: "red",
    },
    secaocamera: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 10
    },
    secaoCheckBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 7,
        marginTop: 15
    }
});

export default ModalForm;
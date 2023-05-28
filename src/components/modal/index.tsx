import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Switch } from 'react-native';
import Cameraprodutos from '../camera';
import { Picker } from '@react-native-picker/picker';

export interface IResposta {
    id: string;
    nomeProduto: string;
    lojaVisitada: string;
    precoRegular: number;
    precoPagueLeve: number;
    precoPromocao: number;
    pesquisaId: string;
    idResposta: string;
}

const ModalForm = ({ isVisible, onClose, }) => {
    const { produtoID, nomeProduto, produtoCategoria, pesquisaID, precoRegular, setPrecoRegular }: any = useContext(AuthContext);
    const { dadosStorage, setDadosStorage, setmodalCamera }: any = useContext(AuthContext);
    const { PrecoPg, setprecoPg, PrecoPromocional, setPrecoPromocional, lojaPesquisada, setLojaPesquisada }: any = useContext(AuthContext);
    const [precoRegularComparacao, setPrecoRegularComparacao] = useState<string>('')
    const [precoPgComparacao, setPrecoPgComparacao] = useState<string>('')
    const [precoPromocionalComparacao, setPrecoPromocionalComparacao] = useState<string>('')
    const [produtoNãoEncontrado, setProdutoNaoEncontrado] = useState<boolean>()
    const [textoLabel, setTextoLabel] = useState<string>()
    const [textoLabelPrecoPG, setTextoLabelPrecoPG] = useState<string>()
    const [textoLabelPromocional, setTextoLabelPromocional] = useState<string>()
    const [textoLabelLoja, setTextoLabelLoja] = useState<string>()
    const [selecaoLoja, setSelecaoLoja] = useState('Informe a loja');

    class FormularioResposta {
        id: string;
        nomeProduto: string;
        lojaVisitada: string;
        precoRegular: number;
        precoPagueLeve: number;
        precoPromocao: number;
        pesquisaId: string;
        idResposta: string;
        constructor(id: string, nome: string, precoRegular: number, precoPagueLeve: number, lojaVisitada: string, precoPromocional: number, pesquisaId: string, idresposta: string) {
            this.id = id;
            this.nomeProduto = nome;
            this.lojaVisitada = lojaVisitada;
            this.precoRegular = precoRegular;
            this.precoPagueLeve = precoPagueLeve;
            this.precoPromocao = precoPromocional;
            this.pesquisaId = pesquisaId;
            this.idResposta = idresposta;
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

    const ComfirmRespostaProduto = () => {
        if (precoRegularComparacao.length < 2) {
            alertPersonalizado("Campo vazio", "Informe o preço regular")
        } else if (precoPgComparacao.length < 2 && precoPromocionalComparacao.length < 2) {
            alertPersonalizado("Campo vazio", "Informe o preço promocional ou pague e leve")
        } else if (lojaPesquisada.length == 0) {
            alertPersonalizado("Campo vazio", "Informe o nome da loja")
        } else if (lojaPesquisada.length < 4) {
            alertPersonalizado("Nome da loja inválido", "Informe o nome da loja")
        }
        else {
            ConfirmacaoDeRespostaProduto("Aviso", "Deseja confirmar a resposta do produto?")
        }
    }

    function zerarEstadosDeComparacao() {
        setPrecoRegularComparacao("")
        setPrecoPgComparacao("")
        setPrecoPromocionalComparacao("")
        setLojaPesquisada("")
    }

    function LimparLabelFormulario() {
        setTextoLabelLoja("")
        setTextoLabelPrecoPG("")
        setTextoLabel("")
        setTextoLabelPromocional("")
        setSelecaoLoja("")
    }

    function ProdutonaoEncontradoCheck() {
        setTextoLabel("")
        setTextoLabelPrecoPG("")
        setTextoLabelPromocional("")
    }

    function adicionarTextoComparacao() {
        setPrecoRegularComparacao("AA")
        setPrecoPromocionalComparacao("AA")
        setPrecoPgComparacao("AA")
    }

    function zerarEstadosPrecos() {
        setprecoPg(0)
        setPrecoRegular(0)
        setPrecoPromocional(0)
    }

    const alertPersonalizado = (alerta: string, mensagem: string) =>
        Alert.alert(alerta, mensagem, [
            { text: 'OK' },
        ]
        );

    const ConfirmacaoDeRespostaProduto = (alerta: string, mensagem: string) => {
        const idResposta = Date.now().toString();
        Alert.alert(alerta, mensagem, [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    const objeto = new FormularioResposta(produtoID, nomeProduto, precoRegular, PrecoPg, lojaPesquisada, PrecoPromocional, pesquisaID, idResposta);
                    let objetoString = JSON.stringify(objeto)
                    SaveAsyncStorage(objetoString)
                    onClose()
                    alertPersonalizado("Sucesso", "Resposta adicionada com sucesso!")
                    zerarEstadosDeComparacao()
                    LimparLabelFormulario()
                    setProdutoNaoEncontrado(false)

                }
            },
        ]
        );
    }

    function mudarPrecoRegular(value: string) {
        setPrecoRegularComparacao(value)
        const temporaria = parseFloat(value);
        setPrecoRegular(temporaria)
        setTextoLabel(value)
    }

    function mudarPrecoPromocional(value: string) {
        setPrecoPromocionalComparacao(value)
        const numero = parseFloat(value);
        setPrecoPromocional(numero)
        setTextoLabelPromocional(value)
    }

    function mudarPrecoPg(value: string) {
        setPrecoPgComparacao(value)
        const numero = parseFloat(value);
        setprecoPg(numero)
        setTextoLabelPrecoPG(value)
    }

    function capturarLojaPesquisada(value: string) {
        setLojaPesquisada(value)
        setSelecaoLoja(value)
    }

    const Checkboxproduto = () => {
        setProdutoNaoEncontrado(true)
        adicionarTextoComparacao()
        ProdutonaoEncontradoCheck()
        zerarEstadosPrecos()
        if (produtoNãoEncontrado) {
            setProdutoNaoEncontrado(false)
            setPrecoRegularComparacao("")
            setPrecoPromocionalComparacao("")
            setPrecoPgComparacao("")
            LimparLabelFormulario()
            zerarEstadosDeComparacao()
        }
    }

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
             
            <View style={styles.container}>
               <Cameraprodutos />
                <TouchableOpacity onPress={() => onClose()} style={{ marginLeft: "90%", position: 'absolute', top: 15, zIndex: 1 }}>
                    <AntDesign name="closecircleo" size={30} color="black" style={styles.close} />
                </TouchableOpacity>
                <TextInput
                    label="Preço regular"
                    keyboardType='decimal-pad'
                    onChangeText={text => mudarPrecoRegular(text)} style={styles.campoTexto}
                    disabled={produtoNãoEncontrado}
                    value={textoLabel}
                />
                {produtoCategoria === "RX Marca" || produtoCategoria === "RX Genérico" ? <TextInput
                    label="Preço promocional"
                    keyboardType='numeric'
                    onChangeText={text => mudarPrecoPromocional(text)}
                    style={styles.campoTexto}
                    disabled={produtoNãoEncontrado}
                    value={textoLabelPromocional}
                /> : <TextInput
                    label="Preço pague e leve"
                    keyboardType='decimal-pad'
                    onChangeText={text => mudarPrecoPg(text)}
                    style={styles.campoTexto}
                    disabled={produtoNãoEncontrado}
                    value={textoLabelPrecoPG}
                />}

                <Picker
                    selectedValue={selecaoLoja}
                    onValueChange={(item) => capturarLojaPesquisada(item)}
                >
                    <Picker.Item key={0} label="Informe a loja" value="" />
                    <Picker.Item key={1} label="Concorrente 1" value="Concorrente 1" />
                    <Picker.Item key={2} label="Concorrente 2" value="Concorrente 2" />
                    <Picker.Item key={3} label="Concorrente 3" value="Concorrente 3" />
                </Picker>

                <View style={styles.secaoCheckBox}>
                    <Switch
                        value={produtoNãoEncontrado}
                        onValueChange={Checkboxproduto}
                    />
                    <Text>Produto não encontrado</Text>
                </View>
                <TouchableOpacity style={styles.secaocamera} onPress={() => setmodalCamera(true)}>
                    <SimpleLineIcons name="camera" size={30} style={styles.camera} />
                    <Text>Enviar foto</Text>
                </TouchableOpacity>
                <Button mode="contained" style={styles.botao} onPress={ComfirmRespostaProduto}>
                    Confirmar
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 470,
        paddingTop: 10,
        paddingLeft: 12,
        paddingRight: 12
    },
    campoTexto: {
        backgroundColor: 'white',
        padding: 13,
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
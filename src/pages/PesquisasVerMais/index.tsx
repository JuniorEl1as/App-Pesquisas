import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList, ListRenderItemInfo } from 'react-native'
import Header from '../../components/Header'
import Card from '../../components/card-PesquisaVerMais'
import Menu from '../../components/menuBottom'
import ModalForm, { IResposta } from '../../components/modal'
import { AuthContext } from '../../context/auth'
import { IProdutos } from '../../router'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ModalFormHistorico from '../../components/historicoRepostaProdutos'

type StackParams = {
  Pesquisas: undefined,
  PesquisaVerMais: IProdutos
}

interface produtos {
  id: string;
  nome: string;
  categoria: string;
}

interface prazo {
  dateFin: string;
}

type NavigationProps2 = StackNavigationProp<StackParams, "PesquisaVerMais">

type RouteProps = RouteProp<StackParams, "PesquisaVerMais">

type ScreenProps2 = {
  navigation: NavigationProps2
  route: RouteProps
}

interface IRespostaPesquisa {
  codigoLoja: string,
  formularioCategoria: string,
  formularioRespondido: true,
  formularioRespostas: [],
  pequisaId: string,
}

export default function PesquisaVerMais({ route }: ScreenProps2) {
  const { produtos, prazo, pesquisaId } = route.params
  const { visibilidadeModal, setVisibilidadeModal }: any = useContext(AuthContext);
  const { visibilidadeModalHistorico, setVisibilidadeModalHistorico }: any = useContext(AuthContext);
  const { setNomeProduto, setPesquisaID, pesquisaID, produtoCategoria }: any = useContext(AuthContext);
  const { setProdutoID, setProdutoCategoria, dadosStorage }: any = useContext(AuthContext);
  const url = 'https://pmenosapi-production-efe6.up.railway.app/Pesquisa/Resposta';


  function PegarIDNome(nome: string, id: string, categoria: string, pesquisaId: string) {
    setVisibilidadeModal(true)
    setNomeProduto(nome)
    setProdutoID(id)
    setProdutoCategoria(categoria)
    setPesquisaID(pesquisaId)
  }

  function goHistorico () {
    setVisibilidadeModalHistorico(true)
  }

  function onClose() {
    setVisibilidadeModal(false)
  }

  function onCloseHistorico() {
    setVisibilidadeModalHistorico(false)
  }

  function EnviarResposta(idPesquisa: string, codigoLoja: string, formularioCategoria: string) {

    const dadosRespostas: [] = dadosStorage.filter( (resposta: IResposta) => resposta.pesquisaId == idPesquisa)
    console.log(dadosRespostas)

    const data: IRespostaPesquisa = {
      codigoLoja: codigoLoja,
      formularioCategoria: formularioCategoria,
      formularioRespondido: true,
      formularioRespostas: dadosRespostas,
      pequisaId: idPesquisa,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, options)
      .then(response => response.text())
      .then(data => {
        console.log('Resposta do servidor:', data);
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
      }
    );

  }

  return (
    <View style={styles.container}>
      <Header text="Detalhes da pesquisa" />
      <Card item={prazo} />
      <View style={styles.cardFundoBranco}>
        <FlatList
          data={produtos}
          renderItem={(item: ListRenderItemInfo<produtos>) => {
            return (
              <View style={styles.container2}>

                <View style={{ height: 45, paddingLeft: 10 }}>
                  <Text style={styles.nomeProduto}>{item.item.nome}</Text>
                </View>
                <View style={styles.botoes}>
                  <View >
                    <TouchableOpacity style={styles.botaoAndTexto} onPress={() => PegarIDNome(item.item.nome, item.item.id, item.item.categoria, pesquisaId)}>
                      <Ionicons name="add-circle" size={40} color="#0054A6" style={{ marginRight: 5 }} />
                      <Text style={{ fontSize: 16 }}>Adicionar resposta</Text>
                    </TouchableOpacity>
                  </View>
                  <View >
                  </View>
                </View>
              </View>
            )
          }}
        />
        <ModalForm isVisible={visibilidadeModal} onClose={onClose} />
        <ModalFormHistorico isVisibleHistorico={visibilidadeModalHistorico} onCloseHistorico={onCloseHistorico} />
        <TouchableOpacity style={styles.button} onPress={() => EnviarResposta(pesquisaID, "3", produtoCategoria)}>
          <Text style={styles.buttonText}>Concluir pesquisa</Text>
        </TouchableOpacity>
      </View>
      <Menu />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  cardFundoBranco: {
    display: 'flex',
    height: '90%',
    width: '95%',
    backgroundColor: '#fff',
    marginTop: 120,
    alignItems: 'center',
    maxHeight: 460,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0054A6',
    width: 200,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
  },
  container2: {
    height: 110,
    padding: 9,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    borderRadius: 5,
    paddingRight: 10,
    borderColor: "#0054A6",
    borderWidth: 1,
    marginBottom: 10,
  },
  nomeProduto: {
    color: "#0054A6",
    fontSize: 17
  },
  botoes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  botaoAndTexto: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  }
})


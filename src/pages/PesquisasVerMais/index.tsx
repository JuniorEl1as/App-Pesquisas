import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, ListRenderItemInfo, Alert } from 'react-native';
import Header from '../../components/Header';
import Card from '../../components/card-PesquisaVerMais';
import Menu from '../../components/menuBottom'
import ModalForm, { IResposta } from '../../components/modal';
import { AuthContext } from '../../context/auth';
import { IProdutos } from '../../router';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ModalFormHistorico from '../../components/historicoRepostaProdutos';
import { MaterialIcons } from '@expo/vector-icons';

type StackParams = {
  Pesquisas: undefined,
  PesquisaVerMais: IProdutos
}

interface produtos {
  id: string;
  nome: string;
  categoria: string;
}

type NavigationProps2 = StackNavigationProp<StackParams, "PesquisaVerMais">

type RouteProps = RouteProp<StackParams, "PesquisaVerMais">

type ScreenProps2 = {
  navigation: NavigationProps2,
  route: RouteProps,
  statusSave: string,
}

interface IRespostaPesquisa {
  codigoLoja: string,
  CategoriaFormulario : string,
  formularioRespondido: true,
  formularioRespostas: [],
  pequisaId: string,
}

export default function PesquisaVerMais({ route }: ScreenProps2) {
  const { produtos, prazo, pesquisaId, id, statusSave, status } = route.params
  const { visibilidadeModal, setVisibilidadeModal, setProdutoIdparaHistorico }: any = useContext(AuthContext);
  const { setNomeProduto, setPesquisaID, pesquisaID, produtoCategoria }: any = useContext(AuthContext);
  const { setProdutoID, setProdutoCategoria, dadosStorage }: any = useContext(AuthContext);
  const { VisivilidadeHistorico, setVisivilidadeHistorico } = useContext(AuthContext);
  const url = 'https://pmenosapi-production-efe6.up.railway.app/Agile/Cadastrar/Resposta';

  function PegarIDNome(nome: string, id: string, categoria: string, pesquisaId: string) {
    setVisibilidadeModal(true)
    setNomeProduto(nome)
    setProdutoID(id)
    setProdutoCategoria(categoria)
    setPesquisaID(pesquisaId)
  }

  const alertaNaTela = (alerta: string, mensagem: string) =>
    Alert.alert(alerta, mensagem, [
      { text: 'OK' },
    ]
    );

  function onClose() {
    setVisibilidadeModal(false)
  }

  function EnviarResposta(idPesquisa: string, codigoLoja: string, formularioCategoria: string) {

    Alert.alert('Deseja concluir a pesquisa?', 'Ao concluir uma pesquisa você não poderá respondê-la novamente!', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar', onPress: () => {
          const dadosRespostas: [] = dadosStorage.filter((resposta: IResposta) => resposta.pesquisaId == idPesquisa)
         

          const data: IRespostaPesquisa = {
            codigoLoja: codigoLoja,
            CategoriaFormulario : formularioCategoria,
            formularioRespondido: true,
            formularioRespostas: dadosRespostas,
            pequisaId: idPesquisa,
          }

          if(data.formularioRespostas.length == 0){
            alertaNaTela("Aviso", "Responda pelo menos um produto")
          } else {
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
                alertaNaTela("Aviso", data)
              })
              .catch(error => {
                console.error('Erro na solicitação:', error);
              }
              );
              console.log(data);
          }
        }
      },
    ]);
  }

  function CapturarIdResposta(id: string) {
    setVisivilidadeHistorico(true)
    setProdutoIdparaHistorico(id)
  }

  return (
    <View style={styles.container}>
      <Header text="Detalhes da pesquisa" />
      <Card item={prazo} statusSave={statusSave} pesquisaId={pesquisaId} status={status} />
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
                    <TouchableOpacity onPress={() => CapturarIdResposta(item.item.id)}>
                      <MaterialIcons name="history" size={40} color="#0054A6" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
          }}
        />
        <ModalFormHistorico isVisibleHistorico={VisivilidadeHistorico} pesquisaId={pesquisaId} />

        <ModalForm isVisible={visibilidadeModal} onClose={onClose} />
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


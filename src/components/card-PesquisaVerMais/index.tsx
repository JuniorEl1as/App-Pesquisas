import moment from 'moment';
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext, IRespostaPesquisa } from '../../context/auth';

const Card = ({ item, status, pesquisaId }) => {
    const {respostasPesquisas }: any = useContext(AuthContext);
    const { myLoja }: any = useContext(AuthContext);

    const idRespostasTrue = respostasPesquisas.map((resposta: IRespostaPesquisa) => resposta.pequisaId)

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View>
                {idRespostasTrue.includes(pesquisaId) === true ?
                            <Text style={styles.texto}>Status : <Text style={{ color: "green" }}>Conluida</Text></Text>
                            :
                            status === true ? <Text style={styles.texto}>Status : <Text style={{ color: "#FFC700" }}>Em andamento</Text></Text> :
                            <Text style={styles.texto}>Status : <Text style={{ color: "#ED1C24" }}>Nova</Text></Text>
                        }
                    <Text style={styles.texto}>Loja : {myLoja.nomeFilial}</Text>
                    <Text style={styles.texto}>Prazo : {moment(item).format('DD/MM/YYYY')}</Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        width: 340,
        height: 120,
        margin: 20,
        elevation: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    texto: {
        fontSize: 19,
    },
}
)

export default Card;
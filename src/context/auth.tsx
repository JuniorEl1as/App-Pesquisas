import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export interface IResumo {
  id: string,
  loja: [],
  dateIni: string,
  dateFin: string,
  produtos: []
}

export interface IRespostaPesquisa {
  id: string;
  codigoloja: string;
  formularioCategoria: string;
  formularioRespondido: boolean;
  formularioRespostas: [];
  pequisaId: string;
}

const AuthContextProvedor = ({ children }) => {
  const [visibilidadeModal, setVisibilidadeModal] = useState<Boolean>()
  const [visibilidadeModalHistorico, setVisibilidadeModalHistorico] = useState<Boolean>()
  const [count, setCount] = useState(0);
  const [pesquisas, setPesquisas] = useState([])
  const [dateFin, setDateFin] = useState('')
  const [pesquisaLoja, setPesquisaLoja] = useState([]);
  const [pesquisaLojaFilter, setPesquisaLojaFilter] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [produtoID, setProdutoID] = useState('');
  const [produtoCategoria, setProdutoCategoria] = useState('');
  const [pesquisaID, setPesquisaID] = useState('');
  const [respostaForm, setrespostaForm] = useState([]);
  const [dadosStorage, setDadosStorage] = useState([]);
  const [precoRegular, setPrecoRegular] = useState(0);
  const [PrecoPg, setprecoPg] = useState(0);
  const [PrecoPromocional, setPrecoPromocional] = useState(0);
  const [lojaPesquisada, setLojaPesquisada] = useState('');
  const [modalCamera, setmodalCamera] = useState<boolean>();
  const [status, setStatus] = useState<boolean>();
  const [VisivilidadeHistorico, setVisivilidadeHistorico] = useState<boolean>();
  const [ProdutoIdparaHistorico, setProdutoIdparaHistorico] = useState<string>();
  const [respostasPesquisas, setrespostasPesquisas] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pmenosapi-production-efe6.up.railway.app/Agile/Pesquisas');
        const respostas = await axios.get('https://pmenosapi-production-efe6.up.railway.app/Agile/Repostas');
        setPesquisas(response.data);
        setrespostasPesquisas(respostas.data)
        filtro();
        setCount(1)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [count])

  const myLoja = {
    codigo: 3,
    codigoDeposito: 1,
    nomeFilial: "FOR03-Abolicao-CE",
    situacao: null,
    siglaUF: "CE",
    uf: "CE",
    regional: 3,
  }

  const filtro = () => {
    const lojaFiltrada = pesquisas.filter(pesquisa => pesquisa.lojas.includes(myLoja.codigo))
    const temp = pesquisas.map((pesquisa) => pesquisa.lojas === myLoja.codigo);
    setPesquisaLoja(lojaFiltrada)
    setPesquisaLojaFilter(lojaFiltrada)
  }

  return (
    <AuthContext.Provider
      value={{
        respostasPesquisas,
        setrespostasPesquisas,
        ProdutoIdparaHistorico,
        setProdutoIdparaHistorico,
        VisivilidadeHistorico,
        setVisivilidadeHistorico,
        status,
        setStatus,
        modalCamera,
        setmodalCamera,
        lojaPesquisada,
        setLojaPesquisada,
        PrecoPromocional,
        setPrecoPromocional,
        PrecoPg, setprecoPg,
        precoRegular,
        setPrecoRegular,
        dadosStorage,
        setDadosStorage,
        respostaForm,
        setrespostaForm,
        pesquisaID,
        setPesquisaID,
        myLoja,
        produtoCategoria,
        setProdutoCategoria,
        produtoID,
        setProdutoID,
        nomeProduto,
        setNomeProduto,
        pesquisaLojaFilter,
        selectedValue,
        setSelectedValue,
        setPesquisaLoja,
        setPesquisaLojaFilter,
        pesquisas,
        pesquisaLoja,
        dateFin,
        setDateFin,
        visibilidadeModal,
        setVisibilidadeModal,
        visibilidadeModalHistorico,
        setVisibilidadeModalHistorico
      }}>

      {children}

    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvedor };
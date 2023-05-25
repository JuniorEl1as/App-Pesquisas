import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext(undefined);

export interface IResumo {
  id: string,
  loja: [],
  dateIni: string,
  dateFin: string,
  produtos: []
}

const AuthContextProvedor = ({ children }) => {
  const [visibilidadeModal, setVisibilidadeModal] = useState<Boolean>()
  const [visibilidadeModalHistorico, setVisibilidadeModalHistorico] = useState<Boolean>()
  const [dados, setDados] = useState();
  const [count, setCount] = useState(0);
  const [pesquisas, setPesquisas] = useState([]);
  const [dateFin, setDateFin] = useState();
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
  const [PrecoPg, setprecoPg] = useState('');
  const [PrecoPromocional, setPrecoPromocional] = useState(0);
  const [lojaPesquisada, setLojaPesquisada] = useState('');

  useEffect(() => {
    if(count === 0) {
      fetch("https://pmenosapi-production-efe6.up.railway.app/Pesquisa/todos")
      .then((response: Response) => response.json())
      .then((data: IResumo[]) => {
        setPesquisas(data);
        filtro();
        setCount(1)
      })
      .catch((error: Error) => {  
        console.error(error);
      });
    } else if(count === 1) {
      filtro();
      setCount(3)
    } else {
      return
    }
  }, [count]); 

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
    const temp = pesquisas.map((pesquisa) =>  pesquisa.lojas === myLoja.codigo); 
    setPesquisaLoja(lojaFiltrada)
    setPesquisaLojaFilter(lojaFiltrada)
  }

  return (
    <AuthContext.Provider 
    value={{
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
      dados, 
      setDados, 
      pesquisas, 
      pesquisaLoja, 
      dateFin, 
      setDateFin, 
      visibilidadeModal, 
      setVisibilidadeModal, 
      visibilidadeModalHistorico, 
      setVisibilidadeModalHistorico }}>

      {children}
      
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvedor };
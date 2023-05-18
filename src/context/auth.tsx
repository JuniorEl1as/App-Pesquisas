import React, { createContext, useEffect, useState } from 'react';
import resumo from './resumos.json'
import { Text } from 'react-native';

const AuthContext = createContext([]);

export interface IResumo {
  id: string,
  loja: [],
  dateIni: string,
  dateFin: string,
  produtos: []
}

const pesquisaSelecioanada = {
  dateIni: "",
  dateFin: "",
  respostas: "",
}

const AuthContextProvedor = ({ children }) => {
  const [dados, setDados] = useState();
  const [count, setCount] = useState(0);
  const [pesquisas, setPesquisas] = useState([]);
  const [pesquisaLoja, setPesquisaLoja] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState({});
  const [pesquisaFiltro, setPesquisaFiltro] = useState({});
  const [dateIni, setDateIni] = useState();
  const [dateFin, setDateFin] = useState();
  const [produtos, setProdutos] = useState();
  const [respostas, setRespostas] = useState();
  
  useEffect(() => {
    if(count === 0) {
      fetch("https://pmenosapi-production.up.railway.app/Pessoa/todos")
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
  
  const filtro = () => {
    const temp = pesquisas.map((pesquisa) =>  pesquisa); 
    setPesquisaLoja(temp)
  }

  console.log(pesquisaLoja)

  return (
    <AuthContext.Provider value={{ dados, setDados, pesquisas, pesquisaLoja }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvedor };
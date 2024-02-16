import GlobalStyle from "./styles/Global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from './components/Grid.js'
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";

const Container = styled.div `
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2 ``;

function App() {
  const [saldo, setSaldo] = useState([])
  const [ganhos, setGanhos] = useState([])
  const [despesas, setDespesas] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getSaldo = async () => {
    try {
      const res = await axios.get('http://localhost:8800/saldo')
      setSaldo(res.data)
    }
    catch (error) {
      toast.error(error)
    }
  }
  const getGanhos = async () => {
    try {
      const res = await axios.get('http://localhost:8800/ganhos')
      setGanhos(res.data)
    }
    catch (error) {
      toast.error(error)
    }
  }
  const getDespesas = async () => {
    try {
      const res = await axios.get('http://localhost:8800/despesas')
      setDespesas(res.data)
    }
    catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getSaldo()
    getGanhos()
    getDespesas()
  }, [setSaldo, setGanhos, setDespesas])

  return (
    <div className="App">
      <Container>
        <Title>Gerenciador Financeiro</Title>
        <Form onEdit={onEdit}
              setOnEdit={setOnEdit}
              getGanhos={getGanhos}
        />
        <Grid saldo={saldo}
              ganhos={ganhos}
              despesas={despesas}
              setGanhos={setGanhos}
              setOnEdit={setOnEdit}
        />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION_BOTTOM_LEFT} />
      <GlobalStyle/>
    </div>
  );
}

export default App;

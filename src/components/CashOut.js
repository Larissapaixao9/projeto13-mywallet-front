import React,{ useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components'
import axios from 'axios'
import userContext from '../contexts/UserCoontext'

export default function CashOut() {
  const navigate=useNavigate()
  const [loading,setLoading]=React.useState(false)
  const [cash,setCash]=React.useState({
    value:"-",
    description:""
  })

  const { config, setUserdata } = useContext(userContext)

  //função que envia post da saida para o banco de dados
  function sendFinanceTrack(e){
    e.preventDefault();
    
    const promise=axios.post("http://localhost:7980/home",cash,config)
    promise.then((response)=>{
      console.log('cadastro feito com sucesso')
      console.log(response.data)
      setUserdata(response.data)
      navigate('/home')
    })

    promise.catch(err=>{
      console.log(err)
    })
  }

  return (
    <Container>
      <Header>Nova saida</Header>
      <Form onSubmit={sendFinanceTrack}>
        <Input
          type="text"
          placeholder="Valor com sinal negativo"
          name="value"
          value={cash.value}
         onChange={(e)=>setCash({ ...cash, value:e.target.value })}
        />
        <Input
          type="text"
          placeholder="Descrição"
          name="description"
          value={cash.description}
          onChange={(e)=>setCash({ ...cash, description:e.target.value })}
        />

        <Button type="submit" >
          {loading ? (
            <ThreeDots
              type="ThreeDots"
              color="#FFFFFF"
              height={50}
              width={50}
            />
          ) : (
            `Salvar saida`
          )}
        </Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #8C11BE;
  height: 100vh;
  gap: 4px;
`;

const Header = styled.header`
    padding-left: 20px;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    
    align-self: flex-start;
  `;

const Button = styled.button`
  width: 340px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4.5px;
  
  cursor: pointer;
  pointer-events: ${(props) => props.disabled ? "none" : "all"};
  opacity: ${(props) => props.disabled ? 0.7 : 1};
  
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  
  background: #A328D6;
;
  color: #FFFFFF;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 30px 0 25px;
`;

const Input = styled.input`
  width: 340px;
  height: 55px;
  margin-bottom: 6px;
  padding: 10px;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  
  font-size: 20px;
  line-height: 25px;
  pointer-events: ${(props) => props.disabled ? "none" : "all"};
  
  background-color: ${(props) => props.disabled ? "#F2F2F2" : "#FFFFFF"};
  color: ${(props) => props.disabled ? "#AFAFAF" : "#000000"};
  &::placeholder{
    color: #000000;
  }
`;


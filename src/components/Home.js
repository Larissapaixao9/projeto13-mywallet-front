import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import exit from '../img/exit.png'
import Minus from '../img/Minus.png'
import Plus from '../img/Plus.png'
import { ThreeDots } from "react-loader-spinner";


import axios from 'axios'
import userContext from '../contexts/UserCoontext'
export default function Home(){

    const navigate=useNavigate()

    const { userData, setUserdata, config, token } = useContext(userContext)
    const [cashflowData,setCashflowData]=React.useState([])
    const [mytotal,setMytotal]=React.useState([])
    const context=useContext(userContext)
    
    //const token = localStorage.getItem("token");
    
   
    const { name } = userData
    
    console.log(name)

    function exitApp() {
        localStorage.removeItem("token");
        navigate("/");
    }
    
    //dando Get na rota Home p/ obter os dados do usuario
    useEffect(() => {
        const promise = axios.get("http://localhost:7980/home", 
        {
        headers: {
            "Authorization": `Bearer ${token}`
            }
        });
        promise.then((response) => {
            const data=response.data; 
            console.log('funfou a requisição da rota home')
            const { userPosts } =data
            let sum=0;
            console.log(data)
            
            setCashflowData([...data]);
            

            //realiza a soma dos valores
            data.forEach((item)=>{
              sum+=item.value
            })
            setMytotal(sum)
            
            console.log(`ver soma ${mytotal}`)
           
        })
        promise.catch((err) => {
            console.log("erro", err.response.status);
        })
    }, [])

    return(
        <HomeStyle>
            <Header > 
            <ContainerMenu>
                <div>Olá, {name}</div>
                <img src={exit} onClick={exitApp}/>
                </ContainerMenu>
            </Header>

            <Whitebox  >
        {cashflowData.length===0 ? 
        <h4>Não há registros de entrada ou saída</h4> 
            : 
            (<Flex2 >
            {cashflowData.map((item)=><ShowcashFlow {...item} />)}
            
            
             <SpanSaldo > SALDO<span style={{ color: mytotal<0 ? "red" : "green"}}>{mytotal}</span> </SpanSaldo></Flex2>)
            
        
        }
            </Whitebox>

            <ContainerEntries>
        <Button to="/cashin">
          <In>
            <img src={Plus} alt="erro"></img>
            <NewEntrie>Nova entrada</NewEntrie>
          </In>
        </Button>
        <Button to="/cashout">
          <Out>
            <img src={Minus} alt="erro"></img>
            <NewEntrie>Nova saída</NewEntrie>
          </Out>
        </Button>
      </ContainerEntries>
        </HomeStyle>
    )
    function ShowcashFlow(props){
        let somar=0;
        const arr=[];
        const { value, description, now } = props
        arr.push(value)
        return(
            <Flex>
                    <Flexnowdescription>
                        <SpanNow>{now}</SpanNow>
                        <Span>{description}</Span>
                    </Flexnowdescription>
                    <SpanValue align="right" style={{ color: value<0 ? "red" : "green"}} >
                    {value}
                     </SpanValue>
                     <span>

                     </span>
            </Flex>
        )
    }
}

const Flex=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    color:black;
`
const Span=styled.div`
    color:black;
`
const SpanNow=styled.div`
    color:#C6C6C6;
`

const SpanSaldo=styled.span`
   
    text-align:left;
    margin-top:30%;

    span{
      text-align:right;
      margin-left:65%;
    }
`
const SpanValue=styled.span`
    align-items:right;
    margin-left:46%;
`

const HomeStyle=styled.div`
    *box-sizing:border-box;
    background-color:#A328D6;
    color:#FFF;
    width: 100vw;
    height: 100vh;
   

`
const Header=styled.div`
    

    display:flex;
    justify-content:space-between
    align-items:center;
    padding:25px;


    section{
        margin:0 auto;

        img{
            postion: fixed;
            top: 10px;
            right:5px;
        }
    }
    img{
        cursor:pointer;
        postion: fixed;
        top: 10px;
        right:5px;
    }
`

const Whitebox=styled.div`
    height:50%;
    width:80%;
    background-color:#FFF;
    margin:0 auto;
    padding:12px;
    text-align:center;
    h4{
        color:#868686;
        margin:0% auto;
    }
    color:black;
`

const Flexnowdescription=styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    gap: 10px;
`
const ContainerMenu = styled.div`
  width: 90%;
  height: 70px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer=styled.div`

    display:flex;
    justify-content: space-between
    align-items:center;
    
    div{
        color:#FFF;
       border:1px solid #FFF;
    }
`
const Flex2=styled.div`
    display:flex;
    flex-direction:column
`


const ContainerEntries = styled.div`
  width: 90%;
  height: 130px;

  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8c11be;
  gap: 15px;
  positions:fixed;
  margin: 5px auto
`;

const In = styled.div`
  height: 114px;
  width: 155px;
  border-radius: 5px;
  background: #a328d6;
  
  img {
    margin-top: 10px;
    margin-left: 10px;
  }
  @media screen and (max-width: 376px){
    height: 100px;
    width: 130px;
  }
`;
const Out = styled.div`
  height: 114px;
  width: 155px;
  border-radius: 5px;
  background: #a328d6;
  img {
    margin-top: 10px;
    margin-left: 10px;
  }
  @media screen and (max-width: 376px){
    height: 100px;
    width: 130px;
  }
`;

const NewEntrie = styled.p`
  font-family: Raleway;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
  color: #ffffff;
  height: 40px;
  width: 64px;
  margin-top: 30px;
  margin-left: 10px;
  margin-bottom: 10px;
  @media screen and (max-width: 376px){
    padding-bottom: 20px;
  }
`;




const Button = styled(Link)`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
  padding: 10px;
  
  background: #A328D6;
  border-radius: 5px;
  
`;
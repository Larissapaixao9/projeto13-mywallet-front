import React from 'react'
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Signin from './Signin';

function Signup() {

    const navigate=useNavigate()
const [loading,setLoading]=React.useState(false)
const [userLogpData,setUserLogupData]=React.useState({
    name:"",
    email:"",
    password:"",
    confirm:""
})
function userSignup(e){
    e.preventDefault()
    setLoading(true)

  const promise=axios.post('http://localhost:7979/logup', userLogpData);
  promise.then((response)=>{
      console.log(response.data)
      const logupinfos=response.data;
        navigate('/')
  })

  promise.catch((err)=>{
    alert('Não foi possivel fazer login. Tente novamente');
    console.log(err)
    setLoading(false)
})

}

  return (
    <Stylelognup>
    <h1>MyWallet</h1>
    <form onSubmit={userSignup}>
        <input placeholder='nome' type='text' value={userLogpData.name}
         onChange={(e)=>setUserLogupData(
             {...userLogpData, 
             name:e.target.value})}/>

        <input placeholder='email' type='text' value={userLogpData.email}
        onChange={(e)=>{
            setUserLogupData({...userLogpData, email:e.target.value})
        }}/>

        <input placeholder='senha' id="password" type='password' value={userLogpData.password}
        onChange={
            (e)=>{
                setUserLogupData({...userLogpData, password:e.target.value})
            }
        }/>

        <input placeholder='confirmar senha' id="password" type='password' value={userLogpData.confirm}
        onChange={
            (e)=>{
            setUserLogupData({...userLogpData, confirm:e.target.value})}
        }
        />
        <button type='submit'>{loading ? <ThreeDots color='#FFF' class='ponto' height='13px' width='51px' margin='0 auto'/> : <div>Cadastrar</div>}  </button>
    </form>
    <Link to='/'>
        <h3>Já possui uma conta? Entre agora!</h3>
    </Link>
</Stylelognup>
  )
}

export default Signup




const Stylelognup=styled.div`
    *box-sizing:border-box;
    background-color:#A328D6;
    color:#FFF;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width: 100vw;
    height: 100vh;
    div{
        color:white;
        align-items:center;
        text-align:center;
    }
    ThreeDots{
        align-items:center;
        text-align:center;
    }

    h3{
        color:#FFF;
        text-decoration:none;
    }
    form{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
    }
    input{
        width:40vh;
        margin-top:1vh;
        margin-bottom:1vh;
        padding:1vh;
    }
    button{
        width:40vh;
        background-color: #000;
        padding:1vh;
        border-radius:5px;
        margin-top:0.5vh;
        cursor:pointer;
        align-items:center;
        text-align:center;
        display:flex;
        justify-content:center;

    }

`
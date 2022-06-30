import axios from 'axios';
import React from 'react'
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Signup from './Signup';

export default function Signin() {
    const [loading,setLoading]=React.useState(false)

    function userLogin(){
        setLoading(true);
    }
  return (
   
    <StyleloginPage>
        <h1>MyWallet</h1>
        <form onSubmit={userLogin}>
            <input placeholder='email' type='text'/>
            <input placeholder='senha' id="password" type='password'/>
            <button type='submit'>{loading ? <ThreeDots color='#FFF' class='ponto' height='13px' width='51px' margin='0 auto'/> : <div>Entrar</div>}  </button>
        </form>
        <Link to='/signup'>
            <h3>Primeira vez? Cadastre-se!</h3>
        </Link>
    </StyleloginPage>
  )
}





const StyleloginPage=styled.div`
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
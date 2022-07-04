import axios from 'axios';
import React, { useContext } from 'react'
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components'
import Signup from './Signup';
import userContext from '../contexts/UserCoontext'
import home from './Home'


export default function Signin() {
    const navigate=useNavigate()
    const context=useContext(userContext)


    const [loading,setLoading]=React.useState(false)
    const [userLoginData,setUserLoginData]=React.useState(
        {
            email:"",
            password:""
        }
    )

    function userLogin(e){
        e.preventDefault()
        setLoading(true);
        const promise=axios.post("http://localhost:7980/login", userLoginData);
        promise.then((response)=>{
            const apiData=response.data
            console.log(apiData)
            const { token } = apiData
            localStorage.setItem('token',token)
            context.setToken(token)
            context.setUserdata(apiData);
           

                if(token){
                    navigate('/home')
                }
              
      
        })

        promise.catch((response)=>{
            alert('Não foi possivel fazer login. Tente novamente');
            setLoading(false)
        })
    }
  return (
   
    <StyleloginPage>
        <h1>MyWallet</h1>
        <form onSubmit={userLogin}>
            <input placeholder='email' value={userLoginData.email} type='text' onChange={(e)=>setUserLoginData({...userLoginData, email:e.target.value})}/>
            <input placeholder='senha' value={userLoginData.password} id="password" type='password' onChange={(e)=>setUserLoginData({ ...userLoginData, password:e.target.value })}/>
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
        padding: 10px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 30px 0 25px;
`;
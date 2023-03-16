import React from 'react'
import background from '../../assets/images/signbackground.jpeg';
import { FormBackground, FormBody, FormButton, FormContainer, HeaderContainer, InputWrapper } from './AuthForm.style';
import {BsFillPersonFill } from 'react-icons/bs'
import { useRouter } from 'next/router';

type Props = {
  type: string
}


function AuthForm({type}: Props) {
  const register =  type==='Sign In'? 'Register' : 'Sign in';
  const link = type==='Sign In'? '/signup' : '/signin';
  const router = useRouter();

  const handleClick=(data: any)=>{
    router.push(data)
  }

  return (
    <>
    <FormBackground img={background.src}>
      <FormContainer>
          <HeaderContainer> 
            <BsFillPersonFill size={30} style={{verticalAlign:'middle', marginRight:'0.2rem'}}/> {type}
          </HeaderContainer>
          <FormBody> 
            <InputWrapper type="email" name="email"placeholder="Enter Email Address"/>
            <InputWrapper type="password" name="password"placeholder="Enter Password"/>
          </FormBody>
          <FormButton>{type} </FormButton>
          <div style={{cursor:'pointer'}} onClick={()=>handleClick(link)}>{register}&rarr;</div>
      </FormContainer>
    </FormBackground>
    </>
  )
}

export default AuthForm
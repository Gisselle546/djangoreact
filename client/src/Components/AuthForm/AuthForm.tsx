import React from 'react'
import background from '../../assets/images/signbackground.jpeg';
import { FormBackground, FormBody, FormButton, FormContainer, HeaderContainer, InputWrapper } from './AuthForm.style';
import {BsFillPersonFill } from 'react-icons/bs'
import { useRouter } from 'next/router';
import { useAppDispatch } from  '../../redux/hooks';
import { registerUser, loginUser } from '@/redux/reducer/userSlice';

import * as Yup from 'yup';
import {useFormik} from 'formik';

type Props = {
  type: string
}


function AuthForm({type}: Props) {
  const register =  type==='Sign In'? 'Register' : 'Sign in';
  const link = type==='Sign In'? '/signup' : '/signin';
  const router = useRouter();
  const dispatch = useAppDispatch();
 


  const handleClick=(data: any)=>{
    router.push(data)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    validationSchema: Yup.object({
        email: Yup.string()
                  .email('Invalid email address')
                  .required('Email is required'), 
        password: Yup.string()
                     .required('Password is required')
    }),
    onSubmit: async values => {
      const auth: any  = type==='Sign In'?  loginUser(values) : registerUser(values) 
      dispatch(auth)
      router.push('/');
    },
  });

  return (
    <>
    <FormBackground img={background.src}>
      <form onSubmit={formik.handleSubmit}>
      <FormContainer>
          <HeaderContainer> 
            <BsFillPersonFill size={30} style={{verticalAlign:'middle', marginRight:'0.2rem'}}/> {type}
          </HeaderContainer>
         
          <FormBody> 
            <InputWrapper type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Enter Email Address"/>
            <InputWrapper type="password" name="password" value={formik.values.password} onChange={formik.handleChange}placeholder="Enter Password"/>
          </FormBody>
          <FormButton type='submit'>{type} </FormButton>
          <div style={{cursor:'pointer'}} onClick={()=>handleClick(link)}>{register}&rarr;</div>
        
      </FormContainer>
      </form>
    </FormBackground>
    </>
  )
}

export default AuthForm
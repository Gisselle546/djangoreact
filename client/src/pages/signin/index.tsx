import React from 'react'
import AuthForm from '@/Components/AuthForm/AuthForm'
import { PageTemplate } from '@/templates/PageTemplate'

function Signin() {
  return (
    <PageTemplate >
         <AuthForm type={'Sign In'}/>
    </PageTemplate>
  
  )
}

export default Signin;
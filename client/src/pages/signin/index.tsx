import React from 'react'
import AuthForm from '@/Components/AuthForm/AuthForm'
import { PageTemplate } from '@/templates/PageTemplate'

function Signin() {
  return (
    <PageTemplate type='auth'>
         <AuthForm/>
    </PageTemplate>
  
  )
}

export default Signin
import React from 'react'
import AuthForm from '@/Components/AuthForm/AuthForm'
import { PageTemplate } from '@/templates/PageTemplate'

function Signup() {
    return (
        <PageTemplate>
             <AuthForm type={'Register'}/>
        </PageTemplate>
      
      )
}

export default Signup
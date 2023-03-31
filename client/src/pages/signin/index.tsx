import React from 'react'
import { PageTemplate } from '@/templates/PageTemplate'
import dynamic from 'next/dynamic';

const AuthForm = dynamic(() => import('@/Components/AuthForm/AuthForm'), {
  ssr: false
});


function Signin() {
  return (
    <PageTemplate >
         <AuthForm type={'Sign In'}/>
    </PageTemplate>
  
  )
}

export default Signin;
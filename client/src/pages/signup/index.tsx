import React from 'react'
import { PageTemplate } from '@/templates/PageTemplate'
import dynamic from 'next/dynamic';


const AuthForm = dynamic(() => import('@/Components/AuthForm/AuthForm'), {
  ssr: false
});

function Signup() {
    return (
        <PageTemplate>
             <AuthForm type={'Register'}/>
        </PageTemplate>
      
      )
}

export default Signup
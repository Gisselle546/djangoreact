import { PageTemplate } from '@/templates/PageTemplate'
import { useRouter } from 'next/router'
import React from 'react'

function ProductDetail() {
    const router = useRouter()
    const { id } = router.query
    
  return (
    <>
        <PageTemplate>
        Product {id}
        </PageTemplate>
    </>
  )
}

export default ProductDetail
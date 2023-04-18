import React, { ReactNode } from 'react';
import styled from 'styled-components';


import dynamic from 'next/dynamic';

type PageTemplateProps = { 
    type?: 'default' | 'home',
    children: ReactNode
}

const Container = styled.div`
   
    display: flex;
   
   
`;

const SideBarWrapper = styled.div`
    width: 7rem;
    @media (max-width: 900px) {
        width:0rem;
     }

`

const ChildrenWrapper = styled.div`
    flex: 1;

`
const Header = dynamic(() => import('../Components/Header/Header'), {
  ssr: false
});

const SideBar = dynamic(()=> import('../Components/SideBar/SideBar'), {
 ssr: false
});


export const PageTemplate = ({type = 'default', children}: PageTemplateProps) =>{
    let shouldRenderHeader;
    if (typeof window !== "undefined") {
      shouldRenderHeader = window.matchMedia('(max-width: 768px)').matches;
    }

    switch(type){
        case 'home':
            return (
    
            <Container>
                <SideBarWrapper>
                    <SideBar/>
                </SideBarWrapper>
                <ChildrenWrapper>
                {shouldRenderHeader && <Header />}
                    {children}
                </ChildrenWrapper>
            </Container>
        )
    }

    return(
        <>
            
        <Header/>
        <>{children}</>
    </>
    )

}
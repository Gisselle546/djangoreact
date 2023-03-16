import React, { ReactNode } from 'react';
import styled from 'styled-components';
import SideBar from '@/Components/SideBar/SideBar';
import Header from '@/Components/Header/Header';

type PageTemplateProps = { 
    type?: 'default' | 'auth',
    children: ReactNode
}

const Container = styled.div`
   
    display: flex;
   
   
`;

const SideBarWrapper = styled.div`
    width: 7rem;
`

const ChildrenWrapper = styled.div`
    flex: 1;

`

export const PageTemplate = ({type = 'default', children}: PageTemplateProps) =>{

    switch(type){
        case 'auth':
            return (
            <>
            
                <Header/>
                <>{children}</>
            </>
            )
    }

    return(
       <Container>
            <SideBarWrapper>
                <SideBar/>
            </SideBarWrapper>
            <ChildrenWrapper>
                 {children}
            </ChildrenWrapper>
       </Container>
    )

}

/**
 * Fix all the page template
 * 
 */
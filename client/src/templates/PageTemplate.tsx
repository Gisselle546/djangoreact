import React, { ReactNode } from 'react';
import styled from 'styled-components';

type PageTemplateProps = { 
    type?: 'default' | 'auth',
    children: ReactNode
}

const ContainerTest = styled.div`
    height: 20rem;
    background-color: red;

`;

export const PageTemplate = ({type = 'default', children}: PageTemplateProps) =>{

    switch(type){
        case 'auth':
            <>
                <h1>hi</h1>
                <>{children}</>
            </>
    }

    return(
        <ContainerTest>
             {children}
        </ContainerTest>
    )

}

/**
 * Fix all the page template
 * 
 */
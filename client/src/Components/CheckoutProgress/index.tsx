import React from 'react'
import styled from 'styled-components'

type Props = {
    step: any;
    loggedIn: any
}

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;

const NavItem = styled.div`
  margin-right: 1rem;
  text-align: center;
`;

const NavLink = styled.a<{isActive: any, disabled?:any}>`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#000' : '#6c757d')};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  text-decoration: none;
`;

function CheckoutProgress({ step, loggedIn }: Props) {
  return (
    <>
    <NavContainer>
      <NavItem>
        <NavLink isActive={step === 1} >
          Login
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          isActive={step === 2}
          disabled={!loggedIn}
        >
          Shipping
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          isActive={step === 3}
          disabled={step < 3}

        >
          Payment
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          isActive={step === 4}
          disabled={step < 4}
        >
          Place Order
        </NavLink>
      </NavItem>
    </NavContainer>
    </>
  )
}

export default CheckoutProgress
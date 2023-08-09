"use client";
import Link from 'next/link'
import { styled } from 'styled-components'
import Center from './Center';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const StyledHeader = styled.header`
    background-color: #222;
    position: fixed;
    top: 0;
    width: 100%;
`;

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 500;
`;

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const StyledNav = styled.nav`
    display: flex;
    gap: 15px;
`;

const NavLink = styled(Link)`
    color: #aaa;
    text-decoration: none;
`;

function Header() {
    const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
        <Center>
            <NavWrapper>
                <Logo href={'/'}>E-ecommerce</Logo>
                <StyledNav>
                    <NavLink href={'/'}>Home</NavLink>
                    <NavLink href={'/products'}>Products</NavLink>
                    <NavLink href={'/categories'}>Categories</NavLink>
                    <NavLink href={'/account'}>Account</NavLink>
                    <NavLink href={'/cart'}>Cart ({ cartProducts.length })</NavLink>
                </StyledNav>
            </NavWrapper>
        </Center>
    </StyledHeader>
  )
}

export default Header
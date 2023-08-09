"use client";
import React, { useContext } from 'react'
import { styled } from 'styled-components'
import Button from './Button'
import { CartContext } from '@/context/CartContext';
// import { useSearchParams } from 'next/navigation'

const CartImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #aaa;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 80%;
    max-height: 90px;
  }
`
const TableCell = styled.td`
  padding: 10px 0;
  border-top: 1px solid #aaa;
`
const StyledQuantity = styled.span`
  margin: 0 5px;
`

function Cart({product, cartProducts}) {
  console.log(window.location.href)
  const {addCartProduct, removeCartProduct} = useContext(CartContext);
  const quantity = cartProducts.filter(id => id === product._id).length

  return (
    <tr>
      <TableCell>
        <CartImageContainer>
          <img src={product.images[0]} alt='Cart Image' />
        </CartImageContainer>
        {product.title}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => removeCartProduct(product._id)}
          white='true' size='l'>-</Button>
          <StyledQuantity>
          {quantity}
          </StyledQuantity>
        <Button
          onClick={() => addCartProduct(product._id)}
          white='true'>+</Button>
      </TableCell>
      <TableCell>${product.price * quantity}</TableCell>
    </tr>
  )

}

export default Cart
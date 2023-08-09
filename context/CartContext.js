"use client"
import { createContext, useEffect, useState } from "react"

export const CartContext = createContext({});

function CartContextProvider({children}) {
    const [ cartProducts, setCartProducts] = useState([]);

    const ls = typeof window !== 'undefined' ? window.localStorage : null

    const addCartProduct = (productId) => {
      setCartProducts(prev => [...prev, productId])
    }

    const removeCartProduct = (productId) => {
      setCartProducts(prev => {
        const pos = prev.indexOf(productId);
        console.log(pos, prev)

        if(pos !== -1) {
            return prev.filter((val, i) => i !== pos)
        }
        return prev
      })
    }

    const clearCartProduct = () => {
      ls.clear();
      setCartProducts([]);
    }

    useEffect(() => {
      if(cartProducts.length > 0) {
        ls.setItem('cart', JSON.stringify(cartProducts))
      }
    }, [cartProducts])

    useEffect(() => {
      if(ls && ls.getItem('cart')) {
        setCartProducts(JSON.parse(ls.getItem('cart')))
      }
    }, [])


  return (
    <CartContext.Provider value={{cartProducts, setCartProducts, addCartProduct, removeCartProduct, clearCartProduct}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
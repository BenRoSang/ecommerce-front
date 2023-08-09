"use client";

import Center from './Center';
import Button from './Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import axios from 'axios';
import { css, styled } from 'styled-components';
import Cart from './Cart';
import Input from './Input';
import SpaceForNav from './SpaceForNav';
//Validation
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    city: yup.string().required(),
    postal: yup.number().integer().required(),
    address: yup.string().required(),
    country: yup.string().required()
}).required();

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    gap: 30px;
    margin-top: 30px;
`
const Box = styled.div`
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    ${props => props.size && css`
        max-height: ${props.size};
    `}
`
const CenterText = styled.div`
    text-align: center;
`
const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    th {
        text-align: left;
        font-weight: 300;
        text-transform: uppercase;
        font-size: .8rem;
    }
    td, th {
        padding: 5px;
    }
`
const Styledbutton = styled.div`
    margin-top: 10px;
    text-align: center;
    button {
        width: 100%;
        justify-content: center;
        padding: 6px 12px;
    }
`
const CityHolder = styled.div`
    display: flex;
    gap: 5px;
    div {
        display: flex;
        flex-direction: column;
    }
`
const CenterDiv = styled.div`
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 8px;
  margin-top: 4rem;
  p {
    font-size: 1.2rem;
    padding: 2rem 0;
  }
`
const ErrorMessage = styled.div`
    font-size: .8rem;
    color: #f74f95;
    text-transform: capitalize;
`

function CartComponent() {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const refs = useRef();

    const { cartProducts, clearCartProduct } = useContext(CartContext);
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [postal, setPostal] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {

        const fetchProduct = async(ids) => {
            const data = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ids: ids})
            })
            const json = await data.json();
            setProducts(json.data)
        }
        if(cartProducts.length > 0) {
            fetchProduct(cartProducts);
        }else{
            setProducts([])
        }

    }, [cartProducts])

    useEffect(() => {
        const getWindow = typeof window !== 'undefined' ? window.location.href : null;
        if(getWindow && getWindow.includes('success')) {
            setIsSuccess(!isSuccess)
            clearCartProduct();
        }
    }, [])

    let totalPrice = 0
    for(const id of cartProducts) {
        const price = products.find(p => p._id === id)?.price || 0;
        totalPrice += price
    }

    const CartSubmitHandler = async(data) => {
        console.log(data)
        // const res = await axios.post('http://localhost:3001/api/cart',
        //             JSON.stringify({name, email, city, postal, address, country, cartProducts})
        //         )
        // window.location = res.data.session.url

    }

    if(isSuccess) {
        return (
            <>
                <SpaceForNav />
                <Center>
                    <CenterDiv>
                    <p>Thanks you for your orders!</p>
                    </CenterDiv>
                </Center>
            </>
        )
    }else{
        return (
            <Center>
                <ColumnWrapper>
                    { products.length > 0 ? (
                        <>
                            <Box>
                                <h2>Your Cart</h2>
                                <StyledTable>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((product, i) => (
                                                <Cart key={i} product={product} cartProducts={cartProducts} />
                                            ))
                                        }
                                        <tr>
                                            <td></td>
                                            <td>Total</td>
                                            <td>${totalPrice}</td>
                                        </tr>
                                    </tbody>
                                </StyledTable>
                            </Box>
                            <Box size='290px'>
                                <h2>Order Information</h2>
                                <form onSubmit={handleSubmit(CartSubmitHandler)} className='cart-form' method='post' action='/api/checkout'>
                                    <input {...register('name')} placeholder='Name'/>
                                    <ErrorMessage>{errors.name && errors.name.message}</ErrorMessage>
                                    <input {...register('email')} placeholder='Email'/>
                                    <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
                                    <CityHolder>
                                        <div>
                                            <input {...register('city')} placeholder='City'/>
                                            <ErrorMessage>{errors.city && errors.city.message}</ErrorMessage>
                                        </div>
                                        <div>
                                            <input {...register('postal')} placeholder='Postal'/>
                                            <ErrorMessage>{errors.postal && errors.postal.message}</ErrorMessage>
                                        </div>
                                    </CityHolder>
                                    <input {...register('address')} placeholder='Address'/>
                                    <ErrorMessage>{errors.address && errors.address.message}</ErrorMessage>
                                    <input {...register('country')} placeholder='Country'/>
                                    <ErrorMessage>{errors.country && errors.country.message}</ErrorMessage>
                                    <Styledbutton>
                                        <Button type='submit' primary='true'>Continue to Payment</Button>
                                    </Styledbutton>
                                </form>
                            </Box>
                        </>
                    ) : (
                        <CenterText>
                            <h2>Your cart is Empty!</h2>
                        </CenterText>
                    )}

                </ColumnWrapper>
            </Center>
        )
    }
}

export default CartComponent
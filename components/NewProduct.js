"use client";

import { styled } from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

export const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding-top: 20px;
    margin-top: 1rem;
    margin-bottom: 3rem;
`

const NewProductTitle = styled.h2`
    font-weight: 1.2.rem;
    margin-top: 2rem;
`

function NewProduct({products}) {

    return (
        <Center>
            <NewProductTitle>Latest Products</NewProductTitle>
            <ProductsGrid>
                {products.length > 0 &&  products.map((product, i) => (
                    <ProductBox key={i} product={product} />
                ))}
            </ProductsGrid>
        </Center>
    )
}

export default NewProduct
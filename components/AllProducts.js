"use client";
import React from 'react'
import Center from './Center'
import { ProductsGrid } from './NewProduct';
import ProductBox from './ProductBox';
import { styled } from 'styled-components';
import SpaceForNav from './SpaceForNav';

function AllProducts({products}) {
  return (
        <Center>
            <ProductsGrid>
                {/* {products.length > 0 &&  products.map((product, i) => (
                    <ProductBox key={i} product={product} />
                ))} */}
            </ProductsGrid>
        </Center>
  )
}

export default AllProducts
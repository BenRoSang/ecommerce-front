"use client";

import { styled } from "styled-components";
import Center from "../Center";
import { useEffect, useState } from "react";
import axios from "axios";
import AllProducts from "../AllProducts";
import CenterText from "../CenterText";

const CategoryWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
`

const StyledPadding = styled.div`
    padding: 0 20px;
`
const TextCenter = styled.p`
    font-size: 1.2rem;
    font-weight: 400;
    margin: 20px 0;
    padding-left: 20px;
`

function Categories({categories}) {
    const [activeCategory, setActiveCategory] = useState(categories[0].categoryName)
    const [activeCategoryId, setActiveCategoryId] = useState(categories[0]._id)
    const [products, setProducts] = useState([]);
    const [isData, setIsData] = useState(false)

    const ButtonHandler = (name, id) => {
        setActiveCategory(name)
        setActiveCategoryId(id)
    }

    useEffect(() => {
        const GetProductByCategory = async() => {
            
            const data = await axios.get(`${process.env.DOMAIN}/api/categories/${activeCategoryId}`)

            if(data.data.status !== 1) {
                setIsData(false)
                setProducts([])
                return
            }
            setIsData(true)
            setProducts(data.data.data);
        }
        GetProductByCategory();
    }, [activeCategoryId])

    return (
        <Center>
            <StyledPadding>
                <CenterText>Category</CenterText>
                <CategoryWrapper>
                    { categories.length > 0 && categories.map((category, i) => (
                        <div key={i}>
                            <button
                                className={category.categoryName === activeCategory? 'active' : 'un-active'}
                                onClick={() => ButtonHandler(category.categoryName, category._id)}
                                >{category.categoryName}</button>
                        </div>
                    )) }
                </CategoryWrapper>
            </StyledPadding>
            { isData && products.length > 0 && <AllProducts products={products} />}
            { !isData && (
                <TextCenter>No Product Found!</TextCenter>
            )}
        </Center>
    )
}

export default Categories
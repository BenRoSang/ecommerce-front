import { styled } from "styled-components"
import Button from "./Button"
import { useContext } from "react"
import { CartContext } from "@/context/CartContext"

const ProductWrapper = styled.div`
    border: 1px solid #aaa;
    border-radius: 8px;
`

const Box = styled.div`
    background-color: #fff;
    padding: 10px;
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    img {
        max-width: 100%;
        max-height: 150px;
    }
`
const ProductInfo = styled.div`
    padding: 10px;
    p{
        font-weight: normal;
        font-size: .85rem;
    }
`

const ProductPriceInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
        font-size: 1.1rem;
        font-weight: bolder;
    }
`

function ProductBox({product}) {
    const {addCartProduct} = useContext(CartContext);
    return (
        <ProductWrapper>
            <Box>
                <div>
                    <img src={product.images[0]} />
                </div>
            </Box>
            <ProductInfo>
                <p>{product.title}</p>
                <ProductPriceInfo>
                    <p>${product.price}</p>
                    <Button primary='true'
                        onClick={() => addCartProduct(product._id)}
                    >
                        Add to Cart
                    </Button>
                </ProductPriceInfo>
            </ProductInfo>
        </ProductWrapper>
    )
}

export default ProductBox

import AllProducts from "@/components/AllProducts"
import CenterText from "@/components/CenterText"
import SpaceForNav from "@/components/SpaceForNav"
import axios from "axios"

const GetProducts = async() => {
    const products = await axios.get(`${process.env.DOMAIN}/api/products`)
    return products.data.data
}

async function page() {
    const products = await GetProducts();
    return (
        <>
        <SpaceForNav/>
        <AllProducts products={products} />
        </>
    )
}

export default page

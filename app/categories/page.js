// import Center from "@/components/Center"
import SpaceForNav from "@/components/SpaceForNav"
import Categories from "@/components/categories/Categories"
import { mongooseConnect } from "@/lib/mongoose"
import Category from "@/models/categoryModel"
import axios from "axios"

const GetCategories = async() => {
    await mongooseConnect();
    const data = await axios.get(`${process.env.DOMAIN}/api/categories`);
    return data.data.categories
}

async function page() {
    const categories = await GetCategories();
  return (
    <>
        <SpaceForNav />
        <Categories categories={categories} />
    </>
  )
}

export default page
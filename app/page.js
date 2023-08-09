import Banner from "@/components/Banner";
import NewProduct from "@/components/NewProduct";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/productModel";

const GetProductById = async() => {
  try {
    const id = '64cb3bdba11916f221f46e66';
    await mongooseConnect();
    const product = await Product.findById({_id: id});
    return product;
  } catch (error) {
    throw new Error(error)
  }
}

const GetProductListSort = async() => {
  try {
    await mongooseConnect();
    const products = await Product.find().sort('-_id').limit(9).exec();
    return products;

  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export default async function Home() {
  const product = await JSON.parse(JSON.stringify(await GetProductById()));
  const products = await JSON.parse(JSON.stringify(await GetProductListSort()));
  console.log(products)
  return (
    <>
      <Banner product={product} />
      <NewProduct products={products} />
    </>
  )
}

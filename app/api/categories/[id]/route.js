import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/productModel";
import mongoose, { isObjectIdOrHexString } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const {id} = params;
    await mongooseConnect();
    const data = await Product.find({categoryId: id})
     if(data.length > 0) {
         return NextResponse.json({data, status: 1})
    }
    return NextResponse.json({message: 'No Product Found', status: 0})
}
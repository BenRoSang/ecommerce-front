import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/productModel";

const { NextResponse } = require("next/server");

export async function POST(request) {
    const {ids} = await request.json();
    await mongooseConnect();
    const data = await Product.find({_id: ids})
    return NextResponse.json({data})
}

export async function GET() {
    try {
        await mongooseConnect();
        const data = await Product.find();
        return NextResponse.json({data});
    } catch (error) {
        throw new Error('Failed to get Products',error)
    }
    
}
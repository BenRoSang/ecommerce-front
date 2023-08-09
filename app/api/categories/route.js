import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";


export async function GET() {
    await mongooseConnect();
    const categories = await Category.find();
    return NextResponse.json({categories});
}
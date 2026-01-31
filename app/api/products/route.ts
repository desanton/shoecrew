import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const isNewArrival = searchParams.get("isNewArrival");
    const isTrending = searchParams.get("isTrending");

    let query = `SELECT * FROM "Product"`;
    const conditions: string[] = [];

    if (category) {
      conditions.push(`category = '${category}'`);
    }
    if (isNewArrival === "true") {
      conditions.push(`"isNewArrival" = true`);
    }
    if (isTrending === "true") {
      conditions.push(`"isTrending" = true`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY "createdAt" DESC`;

    const products = await sql(query);

    // Transform priceCents to dollars for frontend
    const transformedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.discountedPriceCents 
        ? product.discountedPriceCents / 100 
        : product.priceCents / 100,
      originalPrice: product.discountedPriceCents 
        ? product.priceCents / 100 
        : null,
      discount: product.discountPercent,
      rating: Math.floor(product.rating),
      reviews: product.reviewCount,
      image: product.imagePath,
      imageTransform: product.imageTransform,
      category: product.category,
      isTrending: product.isTrending,
      isNewArrival: product.isNewArrival,
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

import { getSql } from "@/lib/db";
import { NextResponse } from "next/server";

interface ProductRow {
  id: string;
  name: string;
  priceCents: number;
  discountedPriceCents: number | null;
  discountPercent: number | null;
  stars: number;
  reviewCount: number;
  imageFileName: string;
  isNewArrival: boolean;
  isTrending: boolean;
  sortOrder: number;
}

export async function GET(request: Request) {
  try {
    const sql = getSql();
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter");

    let products: ProductRow[];

    if (filter === "new") {
      products = await sql`SELECT * FROM "Product" WHERE "isNewArrival" = true ORDER BY "sortOrder" ASC`;
    } else if (filter === "trending") {
      products = await sql`SELECT * FROM "Product" WHERE "isTrending" = true ORDER BY "sortOrder" ASC`;
    } else {
      products = await sql`SELECT * FROM "Product" ORDER BY "sortOrder" ASC`;
    }

    const transformedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
      discountedPriceCents: product.discountedPriceCents,
      discountPercent: product.discountPercent,
      stars: product.stars,
      reviewCount: product.reviewCount,
      image: `/products/${product.imageFileName}`,
      isNewArrival: product.isNewArrival,
      isTrending: product.isTrending,
      sortOrder: product.sortOrder,
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

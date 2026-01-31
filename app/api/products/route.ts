import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter");
    const limit = searchParams.get("limit");

    let query = `SELECT * FROM "Product"`;
    const conditions: string[] = [];

    if (filter === "new") {
      conditions.push(`"isNewArrival" = true`);
    } else if (filter === "trending") {
      conditions.push(`"isTrending" = true`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    query += ` ORDER BY "sortOrder" ASC`;

    if (limit) {
      query += ` LIMIT ${parseInt(limit, 10)}`;
    }

    const products = await sql(query);

    const transformedProducts = products.map((product: Record<string, unknown>) => ({
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

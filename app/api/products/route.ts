import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where = category ? { category } : {};

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Transform priceCents to dollars for frontend
    const transformedProducts = products.map((product) => ({
      ...product,
      price: product.priceCents / 100,
      discountedPrice: product.discountedPriceCents
        ? product.discountedPriceCents / 100
        : null,
      discountPercentage: product.discountedPriceCents
        ? Math.round(
            ((product.priceCents - product.discountedPriceCents) /
              product.priceCents) *
              100
          )
        : null,
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

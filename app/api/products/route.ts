import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter");
    const limit = searchParams.get("limit");

    const where: { isNewArrival?: boolean; isTrending?: boolean } = {};

    if (filter === "new") {
      where.isNewArrival = true;
    } else if (filter === "trending") {
      where.isTrending = true;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      ...(limit ? { take: parseInt(limit, 10) } : {}),
    });

    const transformedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      priceCents: product.priceCents,
      discountedPriceCents: product.discountedPriceCents,
      discountPercent: product.discountPercent,
      stars: product.stars,
      reviewCount: product.reviewCount,
      image: `/products/${product.imageFileName}`,
      imageTransform: product.imageTransform,
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

import { auth } from "@/auth";
import { getSql } from "@/lib/db";
import { findSimilarProducts } from "@/lib/similarity";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// GET /api/recommendations - Get similar products based on user's favorites
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sql = getSql();
    const userId = session.user.id;

    // Get all favorited product IDs for the user
    const favorites = await sql`SELECT "productId" FROM "Favorite" WHERE "userId" = ${userId}`;
    const favoritedIds = favorites.map((f: { productId: string }) => f.productId);

    if (favoritedIds.length === 0) {
      return NextResponse.json([]);
    }

    // Get favorited products
    const favoritedProducts = await sql`SELECT * FROM "Product" WHERE id = ANY(${favoritedIds}::TEXT[]) ORDER BY "sortOrder" ASC`;

    // Get all products
    const allProducts = await sql`SELECT * FROM "Product" ORDER BY "sortOrder" ASC`;

    // Extract names for similarity calculation
    const favoritedNames = favoritedProducts.map(
      (p: { name: string }) => p.name
    );
    const availableProductsForSimilarity = allProducts.map(
      (p: { id: string; name: string }) => ({ id: p.id, name: p.name })
    );

    // Find similar products
    const similarProductIds = findSimilarProducts(
      favoritedNames,
      availableProductsForSimilarity,
      3,
      new Set(favoritedIds)
    );

    if (similarProductIds.length === 0) {
      return NextResponse.json([]);
    }

    // Get full product details for similar products
    const similarProductDetails = await Promise.all(
      similarProductIds.map(async (sim) => {
        const products = await sql`SELECT * FROM "Product" WHERE id = ${sim.id}`;
        return products[0];
      })
    );

    // Transform products for response
    const transformedProducts = similarProductDetails.map((product) => ({
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
    console.error("GET /api/recommendations failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}

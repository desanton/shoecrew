import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);
const USER_ID = "guest";

// GET /api/favorites - Get all favorites for guest user
export async function GET() {
  try {
    const favorites = await sql`
      SELECT f.*, p.* 
      FROM "Favorite" f 
      JOIN "Product" p ON f."productId" = p.id 
      WHERE f."userId" = ${USER_ID}
      ORDER BY f."createdAt" DESC
    `;

    // Transform to product format with isFavorited flag
    const transformedFavorites = favorites.map((row) => ({
      id: row.productId,
      name: row.name,
      price: row.discountedPriceCents 
        ? row.discountedPriceCents / 100 
        : row.priceCents / 100,
      originalPrice: row.discountedPriceCents 
        ? row.priceCents / 100 
        : null,
      discount: row.discountPercent,
      rating: Math.floor(row.rating),
      reviews: row.reviewCount,
      image: row.imagePath,
      isFavorited: true,
    }));

    return NextResponse.json(transformedFavorites);
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

// POST /api/favorites - Add a product to favorites
export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await sql`
      SELECT * FROM "Product" WHERE id = ${productId}
    `;

    if (product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Insert favorite (ignore if already exists)
    await sql`
      INSERT INTO "Favorite" ("userId", "productId")
      VALUES (${USER_ID}, ${productId})
      ON CONFLICT ("userId", "productId") DO NOTHING
    `;

    return NextResponse.json({ success: true, productId }, { status: 201 });
  } catch (error) {
    console.error("Failed to add favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

// DELETE /api/favorites - Remove a product from favorites
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM "Favorite" 
      WHERE "userId" = ${USER_ID} AND "productId" = ${productId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}

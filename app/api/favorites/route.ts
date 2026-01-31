import { auth } from "@/auth";
import { getSql } from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// GET /api/favorites - Get all favorite productIds for authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      console.log("GET: No session");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sql = getSql();
    const userId = session.user.id;
    const favorites = await sql`SELECT "productId" FROM "Favorite" WHERE "userId" = ${userId}`;

    // Return only productIds as string[]
    const productIds = favorites.map((f: { productId: string }) => f.productId);

    return NextResponse.json(productIds);
  } catch (error) {
    console.error("GET /api/favorites failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

// POST /api/favorites - Add a product to favorites
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    console.log("POST: session =", session);

    if (!session?.user?.id) {
      console.log("POST: No session or user ID");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sql = getSql();
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    // Check if product exists
    const products = await sql`SELECT id FROM "Product" WHERE id = ${productId}`;

    if (products.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const userId = session.user.id;

    // Use INSERT ... ON CONFLICT to handle upsert
    await sql`
      INSERT INTO "Favorite" ("userId", "productId")
      VALUES (${userId}, ${productId})
      ON CONFLICT ("userId", "productId") DO NOTHING
    `;

    return NextResponse.json({ success: true, productId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/favorites failed:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

// DELETE /api/favorites - Remove a product from favorites
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sql = getSql();
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    await sql`DELETE FROM "Favorite" WHERE "userId" = ${userId} AND "productId" = ${productId}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/favorites failed:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}

import { auth } from "@/auth";
import { getSql } from "@/lib/db";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// POST /api/favorites - Add a product to favorites
export async function POST(request: NextRequest) {
  console.log("POST /api/favorites called");
  
  let session;
  try {
    console.log("Attempting to get auth session...");
    session = await auth();
    console.log("Auth session retrieved:", session ? "exists" : "null");
  } catch (authError: any) {
    console.error("CRITICAL: Auth failed with error:", authError?.message, authError?.stack);
    return NextResponse.json(
      { error: `Auth error: ${authError?.message || "unknown"}` },
      { status: 401 }
    );
  }

  if (!session?.user?.id) {
    console.log("No user ID in session");
    return NextResponse.json(
      { error: "Unauthorized - no user ID" },
      { status: 401 }
    );
  }

  try {
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
      INSERT INTO "Favorite" ("id", "userId", "productId")
      VALUES (${crypto.randomUUID()}, ${userId}, ${productId})
      ON CONFLICT ("userId", "productId") DO NOTHING
    `;

    console.log("Successfully added favorite for user", userId);
    return NextResponse.json({ success: true, productId }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/favorites error:", error?.message, error?.stack);
    return NextResponse.json(
      { error: `Database error: ${error?.message || "unknown"}` },
      { status: 500 }
    );
  }
}

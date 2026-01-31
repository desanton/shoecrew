import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const USER_ID = "guest";

// GET /api/favorites - Get all favorites for guest user
export async function GET() {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: USER_ID },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(favorites);
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
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Create or find existing favorite (upsert-like behavior)
    const favorite = await prisma.favorite.upsert({
      where: {
        userId_productId: {
          userId: USER_ID,
          productId,
        },
      },
      update: {},
      create: {
        userId: USER_ID,
        productId,
      },
      include: { product: true },
    });

    return NextResponse.json(favorite, { status: 201 });
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

    await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: USER_ID,
          productId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to remove favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}

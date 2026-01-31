import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "HAVIT HV-G92 Gamepad",
    priceCents: 16000,
    discountedPriceCents: null,
    rating: 5,
    reviewCount: 88,
    imageUrl: "/products/shoe-1.png",
    category: "new-arrivals",
  },
  {
    name: "HAVIT HV-G92 Gamepad",
    priceCents: 16000,
    discountedPriceCents: null,
    rating: 5,
    reviewCount: 88,
    imageUrl: "/products/shoe-2.png",
    category: "new-arrivals",
  },
  {
    name: "HAVIT HV-G92 Gamepad",
    priceCents: 16000,
    discountedPriceCents: null,
    rating: 5,
    reviewCount: 88,
    imageUrl: "/products/shoe-3.png",
    category: "new-arrivals",
  },
  {
    name: "HAVIT HV-G92 Gamepad",
    priceCents: 96000,
    discountedPriceCents: 11600,
    rating: 4,
    reviewCount: 75,
    imageUrl: "/products/shoe-4.png",
    category: "trending",
  },
  {
    name: "HAVIT HV-G92 Gamepad",
    priceCents: 16000,
    discountedPriceCents: null,
    rating: 5,
    reviewCount: 88,
    imageUrl: "/products/shoe-5.png",
    category: "new-arrivals",
  },
  {
    name: "HAVIT HV-G92 Gamepad",
    priceCents: 98000,
    discountedPriceCents: 11600,
    rating: 5,
    reviewCount: 75,
    imageUrl: "/products/shoe-6.png",
    category: "trending",
  },
  {
    name: "HAVIT HV-G92 Gamepad",
    priceCents: 16000,
    discountedPriceCents: null,
    rating: 5,
    reviewCount: 88,
    imageUrl: "/products/shoe-7.png",
    category: "new-arrivals",
  },
  {
    name: "HAVIT HV-G92 Gamepad",
    priceCents: 96000,
    discountedPriceCents: 11600,
    rating: 4,
    reviewCount: 75,
    imageUrl: "/products/shoe-8.png",
    category: "trending",
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.favorite.deleteMany();
  await prisma.product.deleteMany();

  // Seed products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

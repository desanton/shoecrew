import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Nike Air Max Pulse",
    imageFileName: "shoe-1.png",
    priceCents: 16000,
    discountedPriceCents: null,
    discountPercent: null,
    stars: 5,
    reviewCount: 88,
    sortOrder: 1,
    isNewArrival: true,
    isTrending: false,
    imageTransform: null,
  },
  {
    name: "Adidas Ultraboost Light",
    imageFileName: "shoe-2.png",
    priceCents: 16000,
    discountedPriceCents: null,
    discountPercent: null,
    stars: 5,
    reviewCount: 88,
    sortOrder: 2,
    isNewArrival: true,
    isTrending: false,
    imageTransform: { rotationDeg: -20, scale: 1.1, shiftX: 10, shiftY: 0, mirrorX: false },
  },
  {
    name: "New Balance 550",
    imageFileName: "shoe-3.png",
    priceCents: 16000,
    discountedPriceCents: null,
    discountPercent: null,
    stars: 5,
    reviewCount: 88,
    sortOrder: 3,
    isNewArrival: true,
    isTrending: false,
    imageTransform: null,
  },
  {
    name: "Puma RS-X Reinvention",
    imageFileName: "shoe-4.png",
    priceCents: 11600,
    discountedPriceCents: 9600,
    discountPercent: 30,
    stars: 4,
    reviewCount: 75,
    sortOrder: 4,
    isNewArrival: true,
    isTrending: true,
    imageTransform: { rotationDeg: -10, scale: 1, shiftX: 0, shiftY: -5, mirrorX: true },
  },
  {
    name: "Asics Gel-Kayano 30",
    imageFileName: "shoe-5.png",
    priceCents: 16000,
    discountedPriceCents: null,
    discountPercent: null,
    stars: 5,
    reviewCount: 88,
    sortOrder: 5,
    isNewArrival: true,
    isTrending: false,
    imageTransform: null,
  },
  {
    name: "Reebok Classic Leather",
    imageFileName: "shoe-6.png",
    priceCents: 11600,
    discountedPriceCents: 9800,
    discountPercent: 35,
    stars: 5,
    reviewCount: 75,
    sortOrder: 6,
    isNewArrival: false,
    isTrending: true,
    imageTransform: null,
  },
  {
    name: "Saucony Shadow 6000",
    imageFileName: "shoe-7.png",
    priceCents: 16000,
    discountedPriceCents: null,
    discountPercent: null,
    stars: 5,
    reviewCount: 88,
    sortOrder: 7,
    isNewArrival: false,
    isTrending: true,
    imageTransform: null,
  },
  {
    name: "Brooks Ghost 15",
    imageFileName: "shoe-8.png",
    priceCents: 11600,
    discountedPriceCents: 9600,
    discountPercent: 35,
    stars: 4,
    reviewCount: 75,
    sortOrder: 8,
    isNewArrival: false,
    isTrending: true,
    imageTransform: null,
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing products
  await prisma.favorite.deleteMany();
  await prisma.product.deleteMany();

  // Create products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`Created ${products.length} products`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  isHovered?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: 160,
    rating: 5,
    reviews: 88,
    image: "/products/shoe-1.png",
  },
  {
    id: 2,
    name: "HAVIT HV-G92 Gamepad",
    price: 160,
    rating: 5,
    reviews: 88,
    image: "/products/shoe-2.png",
  },
  {
    id: 3,
    name: "HAVIT HV-G92 Gamepad",
    price: 160,
    rating: 5,
    reviews: 88,
    image: "/products/shoe-3.png",
  },
  {
    id: 4,
    name: "HAVIT HV-G92 Gamepad",
    price: 960,
    originalPrice: 1160,
    rating: 4,
    reviews: 75,
    image: "/products/shoe-4.png",
    discount: 30,
  },
  {
    id: 5,
    name: "HAVIT HV-G92 Gamepad",
    price: 160,
    rating: 5,
    reviews: 88,
    image: "/products/shoe-5.png",
  },
  {
    id: 6,
    name: "HAVIT HV-G92 Gamepad",
    price: 960,
    originalPrice: 1160,
    rating: 5,
    reviews: 75,
    image: "/products/shoe-6.png",
    discount: 35,
  },
  {
    id: 7,
    name: "HAVIT HV-G92 Gamepad",
    price: 160,
    rating: 5,
    reviews: 88,
    image: "/products/shoe-7.png",
  },
  {
    id: 8,
    name: "HAVIT HV-G92 Gamepad",
    price: 960,
    originalPrice: 1160,
    rating: 4,
    reviews: 75,
    image: "/products/shoe-8.png",
    discount: 35,
  },
];

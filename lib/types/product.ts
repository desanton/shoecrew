export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  rating: number;
  reviews: number;
  image: string;
  imageTransform?: Record<string, unknown> | null;
  category: string;
  isTrending: boolean;
  isNewArrival: boolean;
  isFavorited?: boolean;
}

export interface ImageTransform {
  rotationDeg?: number;
  scale?: number;
  shiftX?: number;
  shiftY?: number;
  mirrorX?: boolean;
}

export interface Product {
  id: string;
  name: string;
  priceCents: number;
  discountedPriceCents: number | null;
  discountPercent: number | null;
  stars: number;
  reviewCount: number;
  image: string;
  imageTransform: ImageTransform | null;
  isNewArrival: boolean;
  isTrending: boolean;
  sortOrder: number;
}

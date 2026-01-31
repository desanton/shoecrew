"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/types/product";

interface SimilarProductsProps {
  onFavoriteUpdate?: () => void;
}

export function SimilarProducts({ onFavoriteUpdate }: SimilarProductsProps) {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch similar products
  useEffect(() => {
    async function fetchSimilarProducts() {
      setLoading(true);
      try {
        const response = await fetch("/api/recommendations");
        if (response.status === 401) {
          setSimilarProducts([]);
          setLoading(false);
          return;
        }
        const data = await response.json();
        setSimilarProducts(data);
      } catch (error) {
        console.error("Failed to fetch similar products:", error);
        setSimilarProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSimilarProducts();
  }, []);

  // Fetch current favorites
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch("/api/favorites");
        if (response.status === 401) {
          setFavorites(new Set());
          return;
        }
        const productIds: string[] = await response.json();
        setFavorites(new Set(productIds));
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    }

    fetchFavorites();
  }, []);

  // Handle favorite toggle
  const handleFavoriteToggle = async (
    productId: string,
    isFavorited: boolean
  ) => {
    // Optimistic update
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (isFavorited) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });

    try {
      if (isFavorited) {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
      } else {
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
      }
      onFavoriteUpdate?.();
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Loading recommendations...</p>
      </div>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: "60px" }}>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: "28px",
          lineHeight: "40px",
          color: "#000000",
          marginBottom: "32px",
        }}
      >
        Similar Products
      </h2>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          gap: "20px",
        }}
      >
        {similarProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorited={favorites.has(product.id)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
}

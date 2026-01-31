"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { SimilarProducts } from "@/components/sections/SimilarProducts";
import type { Product } from "@/lib/types/product";

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch favorited products
  useEffect(() => {
    async function fetchFavoritedProducts() {
      if (status !== "authenticated") {
        setFavoriteProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Get favorited product IDs
        const favoritesResponse = await fetch("/api/favorites");
        if (favoritesResponse.status === 401) {
          setFavoriteProducts([]);
          setLoading(false);
          return;
        }

        const favoritedIds: string[] = await favoritesResponse.json();
        setFavorites(new Set(favoritedIds));

        if (favoritedIds.length === 0) {
          setFavoriteProducts([]);
          setLoading(false);
          return;
        }

        // Get all products
        const allProductsResponse = await fetch("/api/products");
        const allProducts: Product[] = await allProductsResponse.json();

        // Filter to only favorited products
        const favorited = allProducts.filter((p) =>
          favoritedIds.includes(p.id)
        );
        setFavoriteProducts(favorited);
      } catch (error) {
        console.error("Failed to fetch favorited products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavoritedProducts();
  }, [status, refreshKey]);

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
      // Refresh the page to update
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-page-bg)" }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "18px",
            color: "#000000",
          }}
        >
          Please sign in to view your favorites.
        </p>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--color-page-bg)", minHeight: "100vh" }}>
      <div
        className="mx-auto"
        style={{
          maxWidth: "1400px",
          padding: "60px 40px",
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "48px",
            color: "#000000",
            marginBottom: "8px",
          }}
        >
          My Favorites
        </h1>

        {loading ? (
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "16px",
              color: "#666666",
            }}
          >
            Loading...
          </p>
        ) : favoriteProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              paddingTop: "60px",
              paddingBottom: "60px",
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "18px",
                color: "#666666",
              }}
            >
              You haven't favorited any products yet.
            </p>
          </div>
        ) : (
          <>
            {/* Favorited Products Grid */}
            <div
              className="grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
                gap: "24px",
                marginBottom: "40px",
              }}
            >
              {favoriteProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorited={favorites.has(product.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>

            {/* Similar Products Section */}
            <SimilarProducts
              key={refreshKey}
              onFavoriteUpdate={() => setRefreshKey((prev) => prev + 1)}
            />
          </>
        )}
      </div>
    </main>
  );
}

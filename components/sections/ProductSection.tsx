"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/types/product";

export function ProductSection() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"new" | "trending">("new");
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch products based on active tab
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?filter=${activeTab}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeTab]);

  // Fetch favorites when logged in
  useEffect(() => {
    async function fetchFavorites() {
      if (status !== "authenticated") {
        setFavorites(new Set());
        return;
      }

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
        setFavorites(new Set());
      }
    }

    fetchFavorites();
  }, [status]);

  // Handle favorite toggle
  const handleFavoriteToggle = useCallback(
    async (productId: string, isFavorited: boolean) => {
      // If not logged in, prompt sign in
      if (status !== "authenticated") {
        signIn("google");
        return;
      }

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
          const response = await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to add favorite: ${response.status} - ${errorData.error}`);
          }
        } else {
          const response = await fetch("/api/favorites", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to remove favorite: ${response.status} - ${errorData.error}`);
          }
        }
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
        // Revert optimistic update on failure
        setFavorites((prev) => {
          const newSet = new Set(prev);
          if (isFavorited) {
            newSet.delete(productId);
          } else {
            newSet.add(productId);
          }
          return newSet;
        });
      }
    },
    [status]
  );

  // Split into rows of 4
  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);

  if (loading) {
    return (
      <section className="bg-page-bg">
        <div
          className="flex flex-col items-center justify-center mx-auto"
          style={{
            width: "1279px",
            maxWidth: "100%",
            padding: "0 43px",
            minHeight: "400px",
          }}
        >
          <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Loading products...
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-page-bg">
      <div
        className="flex flex-col items-start mx-auto"
        style={{
          width: "1279px",
          maxWidth: "100%",
          padding: "0 43px",
          gap: "85px",
        }}
      >
        {/* Tabs */}
        <div className="flex flex-row items-start" style={{ gap: "36px" }}>
          {/* New Arrivals Button */}
          <button
            onClick={() => setActiveTab("new")}
            className="flex flex-row justify-center items-center transition-all duration-200"
            style={{
              minWidth: "215px",
              height: "57px",
              padding: "16px 33px",
              background: activeTab === "new" ? "#4A4C6C" : "transparent",
              border:
                activeTab === "new"
                  ? "4px solid #7C7EA2"
                  : "3px solid #4A4C6C",
              borderRadius: "100px",
            }}
          >
            <span
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0.05em",
                color: activeTab === "new" ? "#FFFFFF" : "#4A4C6C",
              }}
            >
              NEW ARRIVALS
            </span>
          </button>

          {/* What's Trending Button */}
          <button
            onClick={() => setActiveTab("trending")}
            className="flex flex-row justify-center items-center transition-all duration-200"
            style={{
              minWidth: "250px",
              height: "57px",
              padding: "16px 33px",
              background: activeTab === "trending" ? "#9FA16D" : "transparent",
              border:
                activeTab === "trending"
                  ? "4px solid #BFC18D"
                  : "3px solid #9FA16D",
              borderRadius: "100px",
            }}
          >
            <span
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0.05em",
                color: activeTab === "trending" ? "#FFFFFF" : "#9FA16D",
              }}
            >
              {"WHAT'S TRENDING"}
            </span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex flex-col items-start" style={{ gap: "50px" }}>
          {/* First Row */}
          {firstRow.length > 0 && (
            <div className="flex flex-row items-end" style={{ gap: "66px" }}>
              {firstRow.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorited={favorites.has(product.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          )}

          {/* Second Row */}
          {secondRow.length > 0 && (
            <div className="flex flex-row items-end" style={{ gap: "66px" }}>
              {secondRow.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorited={favorites.has(product.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          )}

          {products.length === 0 && (
            <div className="flex items-center justify-center w-full py-8">
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#666",
                }}
              >
                No products found.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

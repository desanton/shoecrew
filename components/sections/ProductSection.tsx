"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/types/product";

export function ProductSection() {
  const [newArrivalsActive, setNewArrivalsActive] = useState(true);
  const [trendingActive, setTrendingActive] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Fetch favorites from API
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch("/api/favorites");
        const data = await response.json();
        const favoriteIds = new Set<string>(data.map((f: Product) => f.id));
        setFavorites(favoriteIds);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    }

    fetchFavorites();
  }, []);

  // Handle favorite toggle
  const handleFavoriteToggle = async (productId: string, isFavorited: boolean) => {
    try {
      if (isFavorited) {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId }),
        });
        setFavorites((prev) => new Set([...prev, productId]));
      } else {
        await fetch(`/api/favorites?productId=${productId}`, {
          method: "DELETE",
        });
        setFavorites((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  // Filter products based on active tabs
  const filteredProducts = products.filter((product) => {
    if (newArrivalsActive && trendingActive) {
      return product.isNewArrival || product.isTrending;
    }
    if (newArrivalsActive) {
      return product.isNewArrival;
    }
    if (trendingActive) {
      return product.isTrending;
    }
    return false;
  });

  // Split into rows of 4
  const firstRow = filteredProducts.slice(0, 4);
  const secondRow = filteredProducts.slice(4, 8);

  if (loading) {
    return (
      <section className="bg-page-bg">
        <div 
          className="flex flex-col items-center justify-center mx-auto"
          style={{ width: "1279px", maxWidth: "100%", padding: "0 43px", minHeight: "400px" }}
        >
          <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Loading products...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-page-bg">
      <div 
        className="flex flex-col items-start mx-auto"
        style={{ width: "1279px", maxWidth: "100%", padding: "0 43px", gap: "85px" }}
      >
        {/* Tabs */}
        <div 
          className="flex flex-row items-start"
          style={{ gap: "36px" }}
        >
          {/* New Arrivals Button */}
          <button
            onClick={() => setNewArrivalsActive(!newArrivalsActive)}
            className="flex flex-row justify-center items-center transition-all duration-200"
            style={{
              minWidth: "215px",
              height: "57px",
              padding: "16px 33px",
              background: newArrivalsActive ? "#4A4C6C" : "transparent",
              border: newArrivalsActive ? "4px solid #7C7EA2" : "3px solid #4A4C6C",
              borderRadius: "100px"
            }}
          >
            <span
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0.05em",
                color: newArrivalsActive ? "#FFFFFF" : "#4A4C6C"
              }}
            >
              NEW ARRIVALS
            </span>
          </button>

          {/* What's Trending Button */}
          <button
            onClick={() => setTrendingActive(!trendingActive)}
            className="flex flex-row justify-center items-center transition-all duration-200"
            style={{
              minWidth: "250px",
              height: "57px",
              padding: "16px 33px",
              background: trendingActive ? "#9FA16D" : "transparent",
              border: trendingActive ? "4px solid #BFC18D" : "3px solid #9FA16D",
              borderRadius: "100px"
            }}
          >
            <span
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "100%",
                letterSpacing: "0.05em",
                color: trendingActive ? "#FFFFFF" : "#9FA16D"
              }}
            >
              {"WHAT'S TRENDING"}
            </span>
          </button>
        </div>

        {/* Product Grid */}
        <div 
          className="flex flex-col items-start"
          style={{ gap: "50px" }}
        >
          {/* First Row */}
          {firstRow.length > 0 && (
            <div 
              className="flex flex-row items-end"
              style={{ gap: "66px" }}
            >
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
            <div 
              className="flex flex-row items-end"
              style={{ gap: "66px" }}
            >
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

          {filteredProducts.length === 0 && (
            <div className="flex items-center justify-center w-full py-8">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#666" }}>
                No products found. Select a filter above.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

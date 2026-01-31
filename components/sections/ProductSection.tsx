"use client";

import { useState } from "react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export function ProductSection() {
  const [newArrivalsActive, setNewArrivalsActive] = useState(true);
  const [trendingActive, setTrendingActive] = useState(true);

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
          <div 
            className="flex flex-row items-end"
            style={{ gap: "66px" }}
          >
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Second Row */}
          <div 
            className="flex flex-row items-end"
            style={{ gap: "66px" }}
          >
            {products.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

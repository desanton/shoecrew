"use client";

import { useState } from "react";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";

export function ProductSection() {
  const [activeTab, setActiveTab] = useState(0);

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
            onClick={() => setActiveTab(0)}
            className="flex flex-row justify-center items-center"
            style={{
              width: "215px",
              height: "57px",
              padding: "16px 33px",
              background: activeTab === 0 ? "#4A4C6C" : "transparent",
              border: activeTab === 0 ? "4px solid #7C7EA2" : "4px solid #4A4C6C",
              boxShadow: activeTab === 0 ? "0px 5px 8px rgba(74, 76, 108, 0.4)" : "none",
              borderRadius: "100px"
            }}
          >
            <span
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "25px",
                letterSpacing: "0.05em",
                textTransform: "capitalize",
                color: activeTab === 0 ? "#F4F4F4" : "#4A4C6C"
              }}
            >
              NEW ARRIVALS
            </span>
          </button>

          {/* What's Trending Button */}
          <button
            onClick={() => setActiveTab(1)}
            className="flex flex-row justify-center items-center"
            style={{
              width: "250px",
              height: "57px",
              padding: "16px 33px",
              background: activeTab === 1 ? "#77794E" : "transparent",
              border: activeTab === 1 ? "4px solid #9FA26D" : "4px solid #77794E",
              boxShadow: activeTab === 1 ? "0px 5px 8px rgba(119, 121, 78, 0.4)" : "none",
              borderRadius: "100px"
            }}
          >
            <span
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "25px",
                letterSpacing: "0.05em",
                textTransform: "capitalize",
                color: activeTab === 1 ? "#F4F4F4" : "#77794E"
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

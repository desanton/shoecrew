"use client";

import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-start"
      style={{ width: "270px", height: "350px", gap: "16px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          width: "270px", 
          height: "250px", 
          background: "var(--color-card-bg)",
          borderRadius: "4px"
        }}
      >
        {/* Discount Badge */}
        {product.discount && (
          <div 
            className="absolute flex flex-row justify-center items-center"
            style={{ 
              left: "12px", 
              top: "12px",
              padding: "4px 12px",
              background: "var(--color-discount)",
              borderRadius: "4px"
            }}
          >
            <span 
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "18px",
                color: "#FAFAFA"
              }}
            >
              -{product.discount}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          className="absolute"
          style={{ right: "12px", top: "12px", width: "34px", height: "34px" }}
        >
          <Heart 
            className="text-black" 
            style={{ width: "24px", height: "24px", margin: "5px" }}
            strokeWidth={1.5} 
          />
        </button>

        {/* Product Image */}
        <div 
          className="absolute"
          style={{ 
            width: "190px", 
            height: "180px", 
            left: "calc(50% - 190px/2)", 
            top: "calc(50% - 180px/2 - 20px)" 
          }}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={190}
            height={180}
            className="w-full h-full object-contain"
            style={{ 
              filter: "drop-shadow(6px 6px 4px rgba(0, 0, 0, 0.25))",
              transform: "rotate(-15deg)"
            }}
          />
        </div>

        {/* Add to Cart Button - Shows on hover for discounted items */}
        {product.discount && isHovered && (
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              left: "0%", 
              right: "0%", 
              bottom: "0px",
              height: "41px",
              background: "#000000",
              borderRadius: "0px 0px 4px 4px"
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#FFFFFF"
              }}
            >
              Add To Cart
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div 
        className="flex flex-col items-start"
        style={{ gap: "8px" }}
      >
        {/* Product Name */}
        <h3 
          style={{
            width: "181px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#000000"
          }}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div 
          className="flex flex-row items-start"
          style={{ gap: "12px" }}
        >
          {product.originalPrice ? (
            <>
              <span 
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "var(--color-discount)"
                }}
              >
                ${product.price}
              </span>
              <span 
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  textDecoration: "line-through",
                  color: "#000000",
                  opacity: 0.5
                }}
              >
                ${product.originalPrice}
              </span>
            </>
          ) : (
            <span 
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#000000",
                opacity: 0.5
              }}
            >
              ${product.price}
            </span>
          )}
        </div>

        {/* Rating */}
        <div 
          className="flex flex-row items-start"
          style={{ gap: "8px" }}
        >
          <div 
            className="flex flex-row items-start"
            style={{ width: "100px", height: "20px" }}
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                style={{ width: "20px", height: "20px" }}
                className={
                  i < product.rating
                    ? "text-star fill-star"
                    : "text-black/25 fill-black/25"
                }
              />
            ))}
          </div>
          <span 
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "21px",
              color: "#000000",
              opacity: 0.5
            }}
          >
            ({product.reviews})
          </span>
        </div>
      </div>
    </div>
  );
}

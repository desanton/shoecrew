"use client";

import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Women", href: "/women" },
  { name: "Men", href: "/men" },
  { name: "Kids", href: "/kids" },
  { name: "Classics", href: "/classics" },
  { name: "Sport", href: "/sport" },
  { name: "Sale", href: "/sale" },
];

export function Header() {
  return (
    <header className="bg-page-bg">
      <div 
        className="flex flex-row items-center justify-between mx-auto"
        style={{ 
          width: "1354px",
          maxWidth: "100%",
          height: "64.5px",
          padding: "20px 43px"
        }}
      >
        {/* Logo and Nav */}
        <div className="flex flex-row items-end gap-6">
          {/* Logo - 30x30 black square */}
          <Link href="/" className="flex items-center">
            <div 
              className="bg-dark"
              style={{ width: "30px", height: "30px" }}
            >
              {/* Bird icon placeholder */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="30" height="30" fill="#181818" />
                <path
                  d="M5 12L9 8L13 12L15 6L17 12L21 8L25 12L21 18H9L5 12Z"
                  fill="white"
                />
              </svg>
            </div>
          </Link>

          {/* Navigation */}
          <nav 
            className="hidden md:flex flex-row justify-center items-center"
            style={{ gap: "24px" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-dark hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "20px"
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Icons */}
        <div 
          className="flex flex-row items-start"
          style={{ gap: "24px" }}
        >
          <button 
            className="flex flex-col items-start justify-center"
            style={{ width: "24px", height: "24.5px", padding: "4px 3px" }}
          >
            <Heart 
              className="text-dark" 
              style={{ width: "18px", height: "16.5px" }}
              strokeWidth={1.5} 
            />
          </button>
          <button style={{ width: "24px", height: "24px" }}>
            <ShoppingCart 
              className="text-dark" 
              style={{ width: "24px", height: "24px" }}
              strokeWidth={1.5} 
            />
          </button>
          <button style={{ width: "24px", height: "24px" }}>
            <User 
              className="text-dark" 
              style={{ width: "24px", height: "24px" }}
              strokeWidth={1.5} 
            />
          </button>
        </div>
      </div>
    </header>
  );
}

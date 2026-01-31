"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@/components/ui/heart-icon";
import { AuthButton } from "@/components/auth/AuthButton";

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
          padding: "20px 43px",
        }}
      >
        {/* Logo and Nav */}
        <div className="flex flex-row items-end gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/ShoeCrewLogo.png"
              alt="ShoeCrew Logo"
              width={30}
              height={30}
              priority
            />
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
                  lineHeight: "20px",
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Icons and Auth */}
        <div className="flex flex-row items-center" style={{ gap: "24px" }}>
          <button
            className="flex items-center justify-center"
            style={{ width: "24px", height: "24.5px" }}
            aria-label="Wishlist"
          >
            <HeartIcon filled={false} width={18} height={16.5} />
          </button>
          <button style={{ width: "24px", height: "24px" }}>
            <ShoppingCart
              className="text-dark"
              style={{ width: "24px", height: "24px" }}
              strokeWidth={1.5}
            />
          </button>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}

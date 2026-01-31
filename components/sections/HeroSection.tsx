"use client";

import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-page-bg overflow-hidden">
      <div 
        className="relative mx-auto"
        style={{ width: "1090px", maxWidth: "100%", height: "578px" }}
      >
        {/* Background Text - SHOP ALL */}
        <div 
          className="absolute flex flex-row justify-center items-center"
          style={{ 
            width: "1090px", 
            height: "430px", 
            left: "calc(50% - 1090px/2)", 
            top: "98px" 
          }}
        >
          <h1 
            className="uppercase select-none pointer-events-none"
            style={{
              fontFamily: "'Teko', sans-serif",
              fontWeight: 700,
              fontSize: "300px",
              lineHeight: "430px",
              color: "rgba(74, 76, 108, 0.17)",
              textTransform: "uppercase"
            }}
          >
            SHOP ALL
          </h1>
        </div>

        {/* Adjustable Label - Top Left */}
        <div 
          className="absolute hero-adjustable"
          style={{ width: "120px", height: "34px", left: "209px", top: "37px" }}
        >
          <span 
            className="uppercase"
            style={{
              fontFamily: "'Teko', sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "34px",
              letterSpacing: "0.15em",
              color: "var(--color-dark)"
            }}
          >
            ADJUSTABLE
          </span>
        </div>

        {/* Shoe Image with Shadow */}
        <div 
          className="absolute hero-shoe"
          style={{ 
            width: "753px", 
            height: "552px", 
            left: "calc(50% - 753px/2 + 0.5px)", 
            top: "0px" 
          }}
        >
          <Image
            src="/hero-shoe.png"
            alt="Athletic shoe featuring adjustable fit and soft pad technology"
            width={753}
            height={552}
            className="w-full h-full object-contain"
            priority
            style={{ 
              filter: "drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.3))"
            }}
          />
        </div>

        {/* Shadow Ellipse */}
        <div 
          className="absolute"
          style={{ 
            width: "483px", 
            height: "52px", 
            left: "63px", 
            top: "526px",
            background: "rgba(0, 0, 0, 0.41)",
            filter: "blur(29.9px)",
            borderRadius: "50%"
          }}
        />

        {/* Soft Pad Label - Bottom Right */}
        <div 
          className="absolute hero-soft-pad"
          style={{ width: "91px", height: "34px", left: "876px", top: "469px" }}
        >
          <span 
            className="uppercase"
            style={{
              fontFamily: "'Teko', sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "34px",
              letterSpacing: "0.15em",
              color: "var(--color-dark)"
            }}
          >
            SOFT PAD
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Truck, Headphones, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    icon: Headphones,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: ShieldCheck,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-[#F4F4F4]">
      {/* Divider Line */}
      <div 
        className="mx-auto"
        style={{ 
          width: "1279px", 
          maxWidth: "calc(100% - 86px)",
          height: "1px", 
          background: "rgba(24, 24, 24, 0.33)" 
        }}
      />

      {/* Features Content */}
      <div 
        className="flex flex-row justify-center items-center mx-auto"
        style={{ 
          width: "1040px", 
          maxWidth: "100%",
          height: "161px",
          gap: "106px",
          padding: "0 43px",
          marginTop: "112px",
          marginBottom: "112px"
        }}
      >
        {features.map((feature) => (
          <div 
            key={feature.title} 
            className="flex flex-col items-center"
            style={{ gap: "24px" }}
          >
            {/* Icon Container - Double ring effect */}
            <div 
              className="relative"
              style={{ width: "80px", height: "80px" }}
            >
              {/* Outer ring with opacity */}
              <div 
                className="absolute rounded-full"
                style={{ 
                  left: "0%", 
                  right: "0%", 
                  top: "0%", 
                  bottom: "0%",
                  background: "#2F2E30",
                  opacity: 0.3
                }}
              />
              {/* Inner circle */}
              <div 
                className="absolute rounded-full flex items-center justify-center"
                style={{ 
                  left: "13.75%", 
                  right: "13.75%", 
                  top: "13.75%", 
                  bottom: "13.75%",
                  background: "#181818"
                }}
              >
                <feature.icon 
                  className="text-[#FAFAFA]" 
                  style={{ width: "40px", height: "40px" }}
                  strokeWidth={2} 
                />
              </div>
            </div>

            {/* Text Content */}
            <div 
              className="flex flex-col items-center"
              style={{ gap: "8px" }}
            >
              {/* Title */}
              <h3 
                className="text-center"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "28px",
                  color: "#181818"
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p 
                className="text-center"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "21px",
                  color: "#181818"
                }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

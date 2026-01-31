"use client";

export function PromoBanner() {
  return (
    <div 
      className="flex flex-row justify-center items-center w-full h-[41px] bg-promo-bg"
      style={{ padding: "12px 596px", gap: "10px" }}
    >
      <p 
        className="text-white text-center whitespace-nowrap"
        style={{ 
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "14px",
          lineHeight: "17px"
        }}
      >
        New here? Save 20% with code: YR24
      </p>
    </div>
  );
}

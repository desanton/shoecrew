"use client";

interface HeartIconProps {
  filled?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export function HeartIcon({ 
  filled = false, 
  width = 18, 
  height = 16.5,
  className = ""
}: HeartIconProps) {
  if (filled) {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M9 16.5C8.75 16.5 8.5 16.4 8.3 16.2C7.8 15.8 0 9.5 0 5.5C0 2.5 2.5 0 5.5 0C7 0 8.4 0.6 9 1.5C9.6 0.6 11 0 12.5 0C15.5 0 18 2.5 18 5.5C18 9.5 10.2 15.8 9.7 16.2C9.5 16.4 9.25 16.5 9 16.5Z"
          fill="#DB4444"
        />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.5 1C14.9853 1 17 3.01472 17 5.5C17 9.10652 10.0742 14.7333 9 15.6892C7.92578 14.7333 1 9.10652 1 5.5C1 3.01472 3.01472 1 5.5 1C6.81711 1 8.01379 1.60633 9 2.5C9.98621 1.60633 11.1829 1 12.5 1Z"
        stroke="#181818"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

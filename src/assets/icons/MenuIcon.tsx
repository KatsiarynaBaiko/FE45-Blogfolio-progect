import React from "react";

export const MenuIcon = ({
  width = "24",
  height = "24",
  stroke = "#FFFFFF",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L20 6M4 12H20M4 18H20"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
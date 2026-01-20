"use client";

import React from "react";

export function Button({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const base = "rounded px-4 py-2 font-medium transition-colors";
  const variants = {
    default: "bg-gray-800 text-white hover:bg-gray-900",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };
  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base",
    lg: "text-lg px-6 py-3",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

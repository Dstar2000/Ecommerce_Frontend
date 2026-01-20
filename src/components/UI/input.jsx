"use client";

import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
      {...props}
    />
  );
}

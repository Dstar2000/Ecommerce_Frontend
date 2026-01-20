"use client";

import React from "react";

export function Select({ children, value, onValueChange, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <>{placeholder}</>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

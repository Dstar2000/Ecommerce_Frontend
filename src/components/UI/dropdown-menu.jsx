"use client";
import { useState, useRef, useEffect } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ children }) {
  return children;
}

export function DropdownMenuContent({ children, align = "end" }) {
  return (
    <div
      className={`absolute z-50 mt-2 min-w-[160px] rounded-md border bg-white shadow-lg
      flex flex-col py-1 ${align === "end" ? "right-0" : "left-0"}`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

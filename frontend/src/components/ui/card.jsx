import React from "react";

export function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl shadow-md bg-white dark:bg-[#1e1e2f] text-black dark:text-white ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`px-6 pt-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-xl font-bold ${className}`}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`px-6 pb-6 ${className}`}>
      {children}
    </div>
  );
}

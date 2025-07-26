import React from "react";

export function ScrollArea({ children, className = "", style = {} }) {
  return (
    <div
      className={`overflow-y-auto rounded-lg border p-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent ${className}`}
      style={{
        maxHeight: "400px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

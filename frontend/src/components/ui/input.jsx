// frontend/src/components/ui/input.jsx
import React from "react";

export const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  );
};

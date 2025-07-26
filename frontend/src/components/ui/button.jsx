// src/components/ui/button.jsx
export function Button({ children, onClick, className = "", type = "button" }) {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg ${className}`}
      >
        {children}
      </button>
    );
  }
  
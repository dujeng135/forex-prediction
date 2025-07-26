// src/components/ui/progress.jsx

export function Progress({ value = 0, className = "" }) {
    return (
      <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`}>
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
  
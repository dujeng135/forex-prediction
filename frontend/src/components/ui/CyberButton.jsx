export default function CyberButton({ children, onClick, className = "", type = "button" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`
          relative inline-flex items-center justify-center
          px-6 py-2 rounded-xl
          bg-cyberAccent text-[#0f172a] font-poppins font-semibold
          shadow-[0_0_10px_#00ffd1,0_0_20px_#00ffd1]
          hover:bg-white hover:text-cyberAccent
          transition duration-200 ease-in-out
          ${className}
        `}
      >
        {children}
      </button>
    );
  }
  
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // 1. Import Auth Context

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout: authLogout } = useAuth(); // 2. Get user state and logout function
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, i) => sum + i.qty * i.price,
    0
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authLogout(); // 3. This clears user state in AuthContext and localStorage
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-green-700 px-6 py-3 flex items-center justify-between relative z-50">
      {/* LOGO */}
      <Link to="/" className="text-white font-bold text-xl">
        Susegad Fresh
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6 relative">
        {/* CART */}
        {totalItems > 0 && (
          <Link
            to="/cart"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            🛒 {totalItems} items ₹{totalPrice}
          </Link>
        )}

        {/* 4. Only show Profile/Dropdown if user is logged in */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-white text-green-700 font-bold flex items-center justify-center uppercase"
            >
              {user.name ? user.name[0] : "A"} 
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                >
                  Profile
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 hover:bg-gray-100 text-gray-700"
                >
                  Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* 5. Show Login link if user is NOT logged in */
          <Link 
            to="/login" 
            className="text-white hover:text-green-200 font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
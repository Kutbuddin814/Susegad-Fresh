import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();

  const [address, setAddress] = useState({
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [saveAddress, setSaveAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch profile & auto-fill address
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.address) {
          setAddress(res.data.address);
        }
      } catch (err) {
        console.log("No saved address found");
      }
    };

    fetchProfile();
  }, []);

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    if (!address.street || !address.city || !address.pincode) {
      alert("Please fill delivery address");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const orderRes = await api.post(
        "/orders",
        {
          items: cartItems.map((item) => ({
            productId: item._id,
            name: item.name,
            variant: item.variant,
            price: item.price,
            qty: item.qty,
          })),
          totalAmount: totalPrice,
          address,
          saveAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      clearCart();

      // ✅ Redirect to Order Success Page
      navigate("/order-success", {
        state: {
          orderId: orderRes.data._id,
          items: orderRes.data.items,
          totalAmount: orderRes.data.totalAmount,
        },
      });
    } catch (err) {
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {/* Address Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Phone"
            value={address.phone}
            onChange={(e) =>
              setAddress({ ...address, phone: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              setAddress({ ...address, city: e.target.value })
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Street Address"
            value={address.street}
            onChange={(e) =>
              setAddress({ ...address, street: e.target.value })
            }
            className="border p-2 rounded md:col-span-2"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>

        {/* Save Address */}
        <label className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={saveAddress}
            onChange={() => setSaveAddress(!saveAddress)}
          />
          Save this address to my profile
        </label>

        {/* Order Summary */}
        <div className="border-t pt-4 mb-6">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          {cartItems.map((item, i) => (
            <div key={i} className="flex justify-between text-sm mb-1">
              <span>
                {item.name} ({item.variant}) × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="flex justify-between font-bold mt-3">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>
    </div>
  );
};

export default Checkout;

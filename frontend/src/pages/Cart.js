import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, totalPrice, increaseQty, decreaseQty, removeFromCart } =
    useCart();

  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0) {
    return <div className="p-10 text-center">Your cart is empty</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="bg-white p-6 rounded-xl shadow flex justify-between items-center mb-4"
        >
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>₹{item.price}</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => decreaseQty(item._id)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => increaseQty(item._id)}>+</button>
          </div>

          <button
            className="text-red-600"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-8">
        <h2 className="text-2xl font-bold mb-4">Total: ₹{totalPrice}</h2>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 text-white px-8 py-3 rounded-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

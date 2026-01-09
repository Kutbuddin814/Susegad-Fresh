import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function VariantModal({ product, onClose }) {
  const { addToCart } = useCart();

  // ✅ Safe variants fallback
  const variants =
    product?.variants?.length > 0
      ? product.variants
      : [
          {
            label: "Default",
            price: product.price,
          },
        ];

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);

  // ✅ Set default variant safely
  useEffect(() => {
    if (variants?.length) {
      setSelectedVariant(variants[0]);
    }
  }, [product]);

  // ⛔ Prevent render until ready
  if (!product || !selectedVariant) return null;

  const totalPrice = selectedVariant.price * qty;

  const handleConfirm = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      image: product.image,
      variant: selectedVariant.label,
      price: selectedVariant.price,
      qty,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-5 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-4">
          {product.name}
        </h2>

        {/* VARIANTS */}
        <div className="space-y-3">
          {variants.map((v) => (
            <label
              key={v.label}
              className={`flex justify-between items-center border rounded-lg p-3 cursor-pointer
              ${
                selectedVariant.label === v.label
                  ? "border-green-600 bg-green-50"
                  : ""
              }`}
            >
              <div>
                <p className="font-medium">{v.label}</p>
                <p className="text-green-700">₹{v.price}</p>
              </div>
              <input
                type="radio"
                checked={selectedVariant.label === v.label}
                onChange={() => setSelectedVariant(v)}
              />
            </label>
          ))}
        </div>

        {/* QTY */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-3 py-1 border rounded"
            >
              −
            </button>
            <span>{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          <div className="font-bold text-lg">
            ₹{totalPrice}
          </div>
        </div>

        {/* CONFIRM */}
        <button
          onClick={handleConfirm}
          className="w-full mt-5 bg-green-600 text-white py-3 rounded-lg text-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();

  // Example variants (can come from backend later)
  const variants = product.variants || [
    { label: "500 ml", price: product.price },
    { label: "1 L", price: product.price * 2 }
  ];

  const [selected, setSelected] = useState(variants[0]);
  const [qty, setQty] = useState(1);

  const total = selected.price * qty;

  const handleConfirm = () => {
    addToCart({
      ...product,
      variant: selected.label,
      price: selected.price,
      qty
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
      <div className="bg-white w-full md:w-[420px] rounded-t-2xl p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">{product.name}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Variants */}
        <div className="space-y-2">
          {variants.map((v, i) => (
            <label
              key={i}
              className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer ${
                selected.label === v.label
                  ? "border-green-600 bg-green-50"
                  : ""
              }`}
            >
              <div>
                <p className="font-medium">{v.label}</p>
                <p className="text-sm text-gray-500">₹{v.price}</p>
              </div>
              <input
                type="radio"
                checked={selected.label === v.label}
                onChange={() => setSelected(v)}
              />
            </label>
          ))}
        </div>

        {/* Quantity */}
        <div className="flex justify-between items-center mt-4">
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

          <p className="font-bold">₹{total}</p>
        </div>

        {/* Confirm */}
        <button
          onClick={handleConfirm}
          className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

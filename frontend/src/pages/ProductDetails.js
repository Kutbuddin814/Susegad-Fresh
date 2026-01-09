import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow p-8">
        <img
          src={product.image}
          alt={product.name}
          className="h-96 w-full object-cover rounded-2xl"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-500 mb-2">{product.category}</p>
          <p className="text-3xl font-bold text-green-700 mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mb-8">
            Fresh and premium quality grocery item sourced from trusted suppliers.
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

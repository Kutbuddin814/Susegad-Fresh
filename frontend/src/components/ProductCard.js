import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  const variant = product.variants[0]; // default variant

  const cartItem = cartItems.find(
    (item) => item._id === product._id && item.variant === variant.label
  );

  return (
    <div className="bg-white rounded-xl p-4 shadow relative">
      <img
        src={product.image}
        alt={product.name}
        className="h-32 mx-auto object-contain"
      />

      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-green-700 font-bold">₹{variant.price}</p>

      {/* CART ACTION */}
      {cartItem ? (
        <div className="flex items-center justify-between mt-3 bg-green-100 rounded-lg px-3 py-1">
          <button
            onClick={() =>
              decreaseQty(product._id, variant.label)
            }
            className="px-2 font-bold"
          >
            –
          </button>

          <span className="font-semibold">{cartItem.qty}</span>

          <button
            onClick={() =>
              increaseQty(product._id, variant.label)
            }
            className="px-2 font-bold"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            addToCart({
              _id: product._id,
              name: product.name,
              price: variant.price,
              variant: variant.label,
            })
          }
          className="absolute bottom-4 right-4 bg-green-600 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl"
        >
          +
        </button>
      )}
    </div>
  );
};

export default ProductCard;

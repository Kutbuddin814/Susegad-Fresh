import { useEffect, useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import api from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  // Filter logic
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (p) => p.category === selectedCategory
        );

  return (
    <>
      <div className="px-6 py-10 space-y-20">

        {/* HERO */}
        <HeroCarousel />

        {/* CATEGORIES */}
        <section className="rounded-3xl bg-green-50 border border-green-200 p-10">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {/* ALL */}
            <CategoryCard
              title="All"
              image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              onClick={() => setSelectedCategory("All")}
              active={selectedCategory === "All"}
            />

            <CategoryCard
              title="Vegetables"
              image="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
              onClick={() => setSelectedCategory("Vegetables")}
              active={selectedCategory === "Vegetables"}
            />

            <CategoryCard
              title="Fruits"
              image="https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?auto=format&fit=crop&w=800&q=80"
              onClick={() => setSelectedCategory("Fruits")}
              active={selectedCategory === "Fruits"}
            />

            <CategoryCard
              title="Nuts"
              image="https://images.unsplash.com/photo-1592928302636-6f36c4c1c7a0?auto=format&fit=crop&w=800&q=80"
              onClick={() => setSelectedCategory("Nuts")}
              active={selectedCategory === "Nuts"}
            />

            <CategoryCard
              title="Daily Essentials"
              image="https://images.unsplash.com/photo-1581579185169-1c60b2e5f0c1?auto=format&fit=crop&w=800&q=80"
              onClick={() => setSelectedCategory("Daily Essentials")}
              active={selectedCategory === "Daily Essentials"}
            />
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="rounded-3xl bg-lime-50 border border-lime-200 p-10">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
            {selectedCategory === "All"
              ? "Popular Products"
              : `${selectedCategory}`}
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>

      </div>

      <Footer />
    </>
  );
}

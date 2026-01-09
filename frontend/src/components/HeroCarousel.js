import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
    title: "Fresh. Local. Susegad.",
    subtitle: "Handpicked fruits & vegetables from trusted farmers",
    button: "Explore Products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=1600&q=80",
    title: "Groceries Delivered Daily",
    subtitle: "Fast and reliable delivery at your doorstep",
    button: "Order Now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=1600&q=80",
    title: "Hygienic & Premium Quality",
    subtitle: "Carefully packed with safety and freshness",
    button: "Our Promise",
  },
  {
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1600&q=80",
    title: "Everything You Need, One Place",
    subtitle: "Vegetables, fruits, nuts & daily essentials",
    button: "Start Shopping",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-lg">

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=1600&q=80";
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="ml-8 md:ml-20 max-w-xl text-white">
              <h2 className="text-4xl md:text-5xl font-bold">
                {slide.title}
              </h2>
              <p className="mt-4 text-lg md:text-xl">
                {slide.subtitle}
              </p>
              <button className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg">
                {slide.button}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-4 py-2 rounded-full text-2xl"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-4 py-2 rounded-full text-2xl"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-green-500" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

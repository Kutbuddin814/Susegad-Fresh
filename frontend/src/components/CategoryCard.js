export default function CategoryCard({ title, image, onClick, active }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl overflow-hidden border transition
        ${active ? "border-green-600 ring-2 ring-green-400" : "border-transparent"}
        hover:shadow-lg bg-white`}
    >
      <img
        src={image}
        alt={title}
        className="h-32 w-full object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-green-800">
          {title}
        </h3>
      </div>
    </div>
  );
}

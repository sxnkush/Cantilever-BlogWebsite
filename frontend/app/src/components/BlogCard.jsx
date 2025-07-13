import { Link } from "react-router-dom";

export default function BlogCard({ title, excerpt, image, id, author, date }) {
  return (
    <div className="rounded-2xl border border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="relative">
        <img
          src={image}
          className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>
      </div>

      <div className="relative p-4 flex flex-col gap-3 bg-white">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p
          className="text-gray-700 text-sm"
          dangerouslySetInnerHTML={{ __html: excerpt + "..." }}
        ></p>
        <p className="text-xs text-gray-500">
          By {author} on {date}
        </p>
        <Link
          to={`/blog/${id}`}
          className="inline-block w-max px-4 py-2 mt-2 text-sm font-medium border border-black text-white bg-black rounded hover:bg-white hover:text-black transition-all duration-200"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}

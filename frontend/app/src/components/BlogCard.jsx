import { Link } from "react-router-dom";

export default function BlogCard({title, excerpt, image, id, author, date}) {
  return (
      <div className="rounded shadow hover:shadow-lg transition">
        <img src={image} className="w-full h-48 object-cover rounded-t" />
        <div className="p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-600">{excerpt}</p>
          <p className="text-sm text-gray-400">
            By {author} on {date}
          </p>
          <Link to={`/blog/${id}`} className="text-blue-600">
            Read more →
          </Link>
        </div>
      </div>
  );
}

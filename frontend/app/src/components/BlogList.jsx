import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 py-10 px-24 mb-16 mt-10">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          id={blog._id}
          title={blog.title}
          excerpt={blog.content.substr(0,blog.content.length/3)}
          image={blog.image}
          author={blog.author}
          date={blog.publishedDate.toString().split('T')[0]}
        />
      ))}
    </div>
  );
}

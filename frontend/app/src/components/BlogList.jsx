import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-10 py-5 sm:py-10 sm:px-24 mb-16 mt-10">
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

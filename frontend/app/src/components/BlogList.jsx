export default function BlogList({ blogs }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {blogs.map(blog => <BlogCard key={blog.id} {...blog} />)}
    </div>
  );
} 
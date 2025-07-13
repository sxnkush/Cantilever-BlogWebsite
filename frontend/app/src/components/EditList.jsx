import EditCard from "./EditCard";

export default function EditList({ blogs }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 py-10 px-24 mb-16 mt-10">
      {blogs.map((blog) => (
        <EditCard
          key={blog._id}
          id={blog._id}
          title={blog.title}
          excerpt={blog.content.substr(0,blog.content.length/3)}
          image={blog.image}
          author={blog.author}
          date={blog.publishedDate.toString().split('T')[0]}
          content={blog.content}
        />
      ))}
    </div>
  );
}

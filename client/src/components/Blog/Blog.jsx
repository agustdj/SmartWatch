import "./Blog.css";

const blogs = [
  {
    id: 1,
    title: "Top 5 Smartwatch Features You Should Know",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07oJQtTWKmUO8QUvugkYUu_8OBuznWVKoYKbwoOi95g&s=10",
    category: "Technology",
    date: "June 30, 2026",
  },
  {
    id: 2,
    title: "How Smartwatches Improve Your Daily Fitness",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZ-zrZKG1hy9PDfqjnVR1OT-XgohSRutSHJFWSeL9nA&s=10",
    category: "Health",
    date: "June 28, 2026",
  },
  {
    id: 3,
    title: "Best SmartWatch X1 Tips for New Users",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBrUmhjpEZ8GivsErd90IWebxebFIKQCfiOl5vG-9AUQ&s=10",
    category: "Guide",
    date: "June 25, 2026",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="blog section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">
            Stay updated with the latest smartwatch news, tips, and technology trends.
          </p>
        </div>
        <div className="row g-4">
          {blogs.map((blog) => (
            <div className="col-lg-4 col-md-6" key={blog.id}>
              <article className="blog-card">
                <div className="blog-image">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="img-fluid"
                    loading="lazy"
                    width="400"
                    height="260"
                  />
                  <span className="blog-category">
                    {blog.category}
                  </span>
                </div>
                <div className="blog-content">
                  <small>
                    <i className="bi bi-calendar3 me-2"></i>
                    {blog.date}
                  </small>
                  <h4>{blog.title}</h4>
                  <a href="#" className="blog-link">
                    Read More
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
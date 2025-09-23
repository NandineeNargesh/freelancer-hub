import React from 'react';
import Header from '../components/Header';
import './BlogPage.css';
import Footer from '../components/Footer';
import img from '../assets/browse.jpg'
import img1 from '../assets/hero-background.jpg';
// Sample data for blog posts, formatted like your freelancer data
const blogPosts = [
  {
    id: 1,
    title: '5 Tips for a Powerful Freelance Portfolio',
    category: 'Career',
    imageUrl: img,
    size: 'medium'
  },
  {
    id: 2,
    title: 'Navigating Client Communication: A Guide',
    category: 'Clients',
    imageUrl: img,
    size: 'large'
  },
  {
    id: 3,
    title: 'The Art of Pricing Your Services',
    category: 'Business',
    imageUrl: img,
    size: 'short'
  },
  {
    id: 4,
    title: 'Top 10 High-Demand Freelance Skills of 2024',
    category: 'Skills',
    imageUrl: img,
    size: 'tall'
  },
  {
    id: 5,
    title: 'Building Your Personal Brand as a Freelancer',
    category: 'Branding',
    imageUrl: img,
    size: 'medium'
  },
  {
    id: 6,
    title: 'Mastering Time Management for Remote Work',
    category: 'Productivity',
    imageUrl:img,
    size: 'short'
  },
];
const BlogPage = () => {
  return (
    <>
      <Header />
      {/* Blog Hero Section with half image and half content */}
      <section 
        className="blog-hero-section"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-content">
            <h1 className="blog-hero-title">Freelancer Blog</h1>
            <p className="blog-hero-subtitle">Insights, tips, and inspiration for freelancers and clients alike.</p>
        </div>
      </section>

      {/* Blog Post Grid Section */}
      <section className="blog-grid-section">
        <div className="blog-container">
          <div className="blog-post-grid">
            {blogPosts.map(post => (
              <div key={post.id} className={`blog-post-card blog-card-${post.size}`}>
                <div 
                  className="blog-post-image" 
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                ></div>
                <div className="blog-card-content">
                  <span className="post-category">{post.category}</span>
                  <h3 className="post-title">{post.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default BlogPage;
import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../assets/hero-background.jpg';
import './HomePage.css';

// Imported images for "How It Works" cards (from previous conversation)
import image1 from '../assets/browse.jpg';
import image2 from '../assets/hire.jpg';
import image3 from '../assets/paid.jpg';
import image5 from '../assets/opportunity.jpg'; // Note: image5 and image6 were swapped in the previous list.
import image6 from '../assets/paid (2).jpg';   // Using them as provided in your last JSX.
import image4 from '../assets/profile.jpg';

// New images for the new sections
import whoWeAreImg from '../assets/about-us.jpg'; // Placeholder, replace with your own image
import ourWorkImg from '../assets/our-work.webp'; // Placeholder, replace with your own image
import faqImg from '../assets/faq-illlustration.jpg'; // Placeholder, replace with your own image
import processBgImage from '../assets/process-bg.jpeg'; 
const HomePage = () => {
  // State to manage active accordion items
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Function to toggle accordion item
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Ensure Font Awesome is loaded for icons (optional, if you haven't already)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <>
      {/* --- HERO SECTION --- */}
      <div style={{ backgroundColor: '#000', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main 
          className="hero-section"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div> 
              <h1 className="hero-title-1">Empower Your</h1>
              <h2 className="hero-title-2">Vision</h2>
              <p className="hero-subtitle">
                The premier marketplace to discover, hire, and collaborate with top-tier freelance professionals from around the globe.
              </p>
              <div className="button-container">
                <Link to="/browse" className="btn btn-primary">Find Talent</Link>
                <Link to="/signup" className="btn btn-secondary">Become a Freelancer</Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* --- FEATURES SECTION --- */}
      <section className="features-section">
        <div className="features-content">
          <h2 className="features-title">Everything You Need in One Place</h2>
          <div className="title-underline"></div>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Find Talent</h3>
              <p>Browse detailed profiles, portfolios, and reviews to find the perfect expert for your project.</p>
            </div>
            <div className="feature-item">
              <h3>Manage Projects</h3>
              <p>Use our intuitive dashboard to track tasks, milestones, and deadlines from start to finish.</p>
            </div>
            <div className="feature-item">
              <h3>Secure Payments</h3>
              <p>A simple and secure system for creating invoices and processing payments with peace of mind.</p>
            </div>
            <div className="feature-item">
              <h3>Showcase Your Portfolio</h3>
              <p>Create a stunning, professional profile that attracts high-quality clients and opportunities.</p>
            </div>
            <div className="feature-item">
              <h3>Collaborate Seamlessly</h3>
              <p>Communicate with clients, share files, and provide feedback all within a single platform.</p>
            </div>
            <div className="feature-item">
              <h3>24/7 Support</h3>
              <p>Our dedicated support team is here to help you resolve any issues, anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- "HOW IT WORKS" SECTION (Existing) --- */}
      <section className="process-section" id='work'>
        <div className="process-grid">
          {/* First row - Client */}
          <div className='one'>
            <div className="process-card box-1">
              <img 
                src={image1} 
                alt="Client: Browse & Discover" 
                className="card-image" 
              />
              <div className="card-content-overlay">
                <div className="card-number">01</div>
                <h3 className="card-title">Client: Browse & Discover</h3>
                <p className="card-description">
                  Search our marketplace of talented professionals. View portfolios, skills, and reviews.
                </p>
              </div>
            </div>
            <div className="process-card box-2">
              <img 
                src={image2} 
                alt="Client: Hire & Collaborate" 
                className="card-image" 
              />
              <div className="card-content-overlay">
                <div className="card-number">02</div>
                <h3 className="card-title">Client: Hire & Collaborate</h3>
                <p className="card-description">
                  Use our secure platform to hire, manage your project, and share files.
                </p>
              </div>
            </div>
            <div className="process-card box-3">
              <img 
                src={image3} 
                alt="Client: Pay Securely" 
                className="card-image" 
              />
              <div className="card-content-overlay">
                <div className="card-number">03</div>
                <h3 className="card-title">Client: Pay Securely</h3>
                <p className="card-description">
                  Once satisfied, use our simple and secure payment system.
                </p>
              </div>
            </div>
          </div>
          
          {/* Second row - Freelancer */}
          <div className='two'>
            <div className="process-card box-4">
              <img 
                src={image4} 
                alt="Freelancer: Create Profile" 
                className="card-image" 
              />
              <div className="card-content-overlay">
                <div className="card-number">01</div>
                <h3 className="card-title">Freelancer: Create Profile</h3>
                <p className="card-description">
                  Build a stunning portfolio that highlights your best work and skills.
                </p>
              </div>
            </div>
            <div className="process-card box-5">
              <img 
                src={image5} 
                alt="Freelancer: Find Opportunities" 
                className="card-image" 
              />
              <div className="card-content-overlay">
                <div className="card-number">02</div>
                <h3 className="card-title">Freelancer: Find Opportunities</h3>
                <p className="card-description">
                  Get discovered by global clients seeking your expertise.
                </p>
              </div>
            </div>
            <div className="process-card box-6">
              <img 
                src={image6} 
                alt="Freelancer: Get Paid" 
                className="card-image" 
              />
              <div className="card-content-overlay">
                <div className="card-number">03</div>
                <h3 className="card-title">Freelancer: Get Paid</h3>
                <p className="card-description">
                  Use our integrated system to get paid quickly and reliably.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: WHO WE ARE / WHAT WE DO (Image 1 Adaptation) --- */}
      <section className="about-section dark-theme">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">Who We Are and What We Do</h2>
            <p className="section-subtitle">
              At F-Hub, we bridge the gap between talented freelancers and innovative projects. We're dedicated to fostering a community where creativity thrives and opportunities abound.
            </p>
            <ul className="about-list">
              <li>Discover Top Talent</li>
              <li>Secure Project Management</li>
              <li>Seamless Collaboration Tools</li>
              <li>Protected Payment System</li>
            </ul>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
          <div className="about-image-container">
            <img src={whoWeAreImg} alt="Our team working" className="about-image" />
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: OUR WORK / PORTFOLIO (Image 2 Adaptation) --- */}
      <section className="work-section dark-theme">
        <div className="work-content">
          <div className="work-image-container">
            <img src={ourWorkImg} alt="Our latest projects" className="work-image" />
          </div>
          <div className="work-text">
            <h2 className="section-title">Explore Our Work</h2>
            <p className="section-subtitle">
              With an extensive network of skilled professionals, F-Hub helps bring groundbreaking ideas to life. Discover projects that push boundaries and set new industry standards.
            </p>
            <Link to="/portfolio" className="btn btn-primary">View Portfolios</Link>
          </div>
        </div>
      </section>

    {/* --- NEW SECTION: OUR PROCESS (Image 3 Adaptation) --- */}
      <section className="our-process-section dark-theme">
        <div 
          className="process-container" 
          style={{ backgroundImage: `url(${processBgImage})` }}
        >
          {/* This is the content. The overlay will be added via CSS. */}
          <h2 className="section-title text-center">Our Streamlined Process</h2>
          <div className="title-underline margin-auto"></div>
          <div className="process-steps-grid">
            <div className="process-step-item">
              <div className="icon-circle">
                <i className="fas fa-search"></i>
              </div>
              <h3>1. Discover & Match</h3>
              <p>Browse through talent profiles or post your project to get matched with the best freelancers.</p>
            </div>
            <div className="process-step-item">
              <div className="icon-circle">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>2. Collaborate & Create</h3>
              <p>Work closely with your chosen professional using our integrated communication and project tools.</p>
            </div>
            <div className="process-step-item">
              <div className="icon-circle">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>3. Review & Approve</h3>
              <p>Receive deliverables, provide feedback, and approve the final work when you are satisfied.</p>
            </div>
            <div className="process-step-item">
              <div className="icon-circle">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h3>4. Secure Payments</h3>
              <p>Payments are held securely and released only after your project milestones are successfully met.</p>
            </div>
          </div>
        </div>
      </section>

     {/* --- NEW SECTION: FAQ / ACCORDION --- */}
      <section className="faq-section dark-theme">
        <div className="faq-container">
          <div className="faq-illustration-container">
            <img src={faqImg} alt="FAQ Illustration" className="faq-illustration" />
          </div>
          <div className="faq-accordion-wrapper">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="accordion">
              {/* Accordion Item 1 */}
              <div className={`accordion-item ${activeAccordion === 0 ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(0)}>
                  What is F-Hub? <span className="accordion-icon">{activeAccordion === 0 ? '-' : '+'}</span>
                </button>
                <div className="accordion-content">
                  <p>F-Hub is a premier online marketplace connecting businesses with top-tier freelance professionals for various projects.</p>
                </div>
              </div>

              {/* Accordion Item 2 */}
              <div className={`accordion-item ${activeAccordion === 1 ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(1)}>
                  How do I find a freelancer? <span className="accordion-icon">{activeAccordion === 1 ? '-' : '+'}</span>
                </button>
                <div className="accordion-content">
                  <p>You can browse profiles by specialty, skill, or project type, or post a project and let freelancers bid on it.</p>
                </div>
              </div>

              {/* Accordion Item 3 */}
              <div className={`accordion-item ${activeAccordion === 2 ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(2)}>
                  Is it free to sign up? <span className="accordion-icon">{activeAccordion === 2 ? '-' : '+'}</span>
                </button>
                <div className="accordion-content">
                  <p>Yes, signing up as both a client and a freelancer is free. Fees apply only to completed projects.</p>
                </div>
              </div>

              {/* Accordion Item 4 */}
              <div className={`accordion-item ${activeAccordion === 3 ? 'active' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion(3)}>
                  How are payments handled? <span className="accordion-icon">{activeAccordion === 3 ? '-' : '+'}</span>
                </button>
                <div className="accordion-content">
                  <p>Our secure payment system holds funds in escrow and releases them to the freelancer upon successful project completion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default HomePage;
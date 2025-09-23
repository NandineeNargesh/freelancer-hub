// client/src/pages/BrowsePage.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Header from '../components/Header';
import Footer from '../components/Footer';
import './BrowsePage.css';
import { Link } from 'react-router-dom';
import uiuxImg from '../assets/uiux.png';
import img2 from '../assets/frontend.jpg'
import img3 from '../assets/copyw.jpg'
import img4 from '../assets/social.jpg'
import img5 from '../assets/br.jpg'
import img6 from '../assets/seo.png'
import img7 from '../assets/photo.jpeg'
import img8 from '../assets/back.jpg'
import img9 from '../assets/ill.png'
import img0 from '../assets/dev.jpg'




// Updated sample data with more cards and new sizes
const freelancers = [
   { id: '68d27c64da9d6784a044a780', name: 'Eleanor Vance', specialty: 'UI/UX Designer', imageUrl: uiuxImg, size: 'medium' },
  { id: '68d27c89da9d6784a044a783', name: 'Marcus Holloway', specialty: 'Frontend Developer', imageUrl: img2, size: 'large' },
  { id: '68d27ca9da9d6784a044a786', name: 'Anya Petrova', specialty: 'Copywriter', imageUrl: img3 , size: 'medium' },
  { id: '68d27cc3da9d6784a044a789', name: 'Liam Chen', specialty: 'Social Media Manager', imageUrl: img4 , size: 'tall' },
  { id: '68d27cdcda9d6784a044a78c', name: 'Sofia Rodriguez', specialty: 'Brand Strategist', imageUrl: img5, size: 'medium' },
  { id: 7, name: 'Sofia Rodriguez', specialty: 'Brand Strategist', imageUrl: img5, size: 'medium' },
  { id: 6, name: 'David Kim', specialty: 'SEO Specialist', imageUrl:img6 , size: 'medium' },
  { id: 8, name: 'Eleanor Vance', specialty: 'UI/UX Designer', imageUrl: uiuxImg, size: 'short' },
  { id: 9, name: 'Chloe Dubois', specialty: 'Photographer', imageUrl:img7 , size: 'large' },
  { id: 10, name: 'Ben Carter', specialty: 'Backend Developer', imageUrl: img8, size: 'large' },
  { id: 91, name: 'Olivia Gray', specialty: 'Illustrator', imageUrl: img9 , size: 'medium' },
  { id: 101, name: 'Isaac Grant', specialty: 'DevOps Engineer', imageUrl: img0, size: 'medium' },
];

// List of specialties for the filter dropdown
const specialties = [
  'All', 'UI/UX Designer', 'Frontend Developer', 'Copywriter',
  'Social Media Manager', 'Brand Strategist', 'SEO Specialist',
  'Photographer', 'Backend Developer', 'Illustrator', 'DevOps Engineer'
];

const BrowsePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers);

  useEffect(() => {
    const filtered = freelancers.filter(freelancer => {
      const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            freelancer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterSpecialty === 'All' || freelancer.specialty === filterSpecialty;
      return matchesSearch && matchesFilter;
    });
    setFilteredFreelancers(filtered);
  }, [searchTerm, filterSpecialty]);

  return (
    <>
      <Header />

       <section className="portfolio-hero-section">
          <div className="portfolio-hero-content">
            <h1 className="portfolio-hero-title">Find the Expert</h1>
            <p className="portfolio-hero-subtitle">connect with talented freelancers.</p>
          </div>
        </section>

      <section className="browse-section">
        <h4 className='browse-title' >Find Experts</h4>
        <div className="browse-container">
         
          {/* Search and Filter Section */}
          <div className="filter-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="specialty-select"
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="freelancer-grid">
            {filteredFreelancers.length > 0 ? (
              filteredFreelancers.map(freelancer => (
                  <Link to={`/talent/${freelancer.id}`} key={freelancer.id} className={`freelancer-card card-${freelancer.size}`}>
                  <div className="card-image-container">
                    <img src={freelancer.imageUrl} alt={freelancer.name} className="card-image" />
                  </div>
                  <div className="card-content">
                    <h3 className="card-name">{freelancer.name}</h3>
                    <p className="card-specialty">{freelancer.specialty}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-results">No freelancers found. Try a different search.</p>
            )}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default BrowsePage;
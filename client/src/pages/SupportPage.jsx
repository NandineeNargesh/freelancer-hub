// client/src/pages/SupportPage.jsx

import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ContactForm from '../components/ContactForm';
import './SupportPage.css';

const SupportPage = () => {
  return (
    <DashboardLayout>
      <div className="support-page-container">
        <h2 className="support-title">Get Support</h2>
        <p className="support-description">
          Reach out to our support team for any questions or issues.
        </p>
        <div className="support-contact-form">
            <ContactForm />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupportPage;
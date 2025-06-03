import React, { useState } from 'react';
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function PrivacyPolicy() {

  return (
    <>
    <Header/>
     <section className='min-h-screen'>
            <h1 className='text-[#E3E0C0] text-4xl mb-4'>Privacy Policy</h1>
            <div>
                <h5 className='text-[#FBEC6C] text-xl mb-2'>Last Updated  on 10/5/2025</h5>
                <pre style={{ whiteSpace: 'pre-wrap' }} className='text-[#E3E0C0] text-[1.1rem] mb-2'>{`1. Information We Collect
Account Data: Name, email, city, country, language preferences.
Usage Data: Courses taken, progress, chat interactions.
Device Data: IP address, browser type (for security).

2. How We Use Your Data
To provide services: Language courses, chat features.
For analytics: Improve platform functionality.
For marketing:
Targeted ads based on location (city/country).
Promotional emails (opt-out available).

3. Data Sharing
With trusted third parties: Payment processors, analytics tools.
Anonymized data may be used for research.
Never sold to unrelated advertisers.

4. Security Measures
Encryption for sensitive data.
Regular security audits.

5. Your Rights
Access, correct, or delete your data via Account Settings.
Request data export (e.g., course progress history).
Opt out of marketing at any time.

6. Children’s Privacy
Under 13? Parental consent is required.

7. Changes to This Policy
Updates will be notified via email or in-app alerts.`}</pre>
            </div>
        </section>
    <Footer/>
    </>
  );
}
export default PrivacyPolicy;

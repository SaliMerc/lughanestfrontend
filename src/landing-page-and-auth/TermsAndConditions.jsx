import React, { useState } from 'react';
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function TermsAndConditions() {

  return (
    <>
    <Header/>
        <section className='min-h-screen'>
            <h1 className='text-[#E3E0C0] text-4xl mb-4'>Terms and Conditions</h1>
            <div>
                <h5 className='text-[#FBEC6C] text-xl mb-2'>Last Updated  on 10/5/2025</h5>
                <pre style={{ whiteSpace: 'pre-wrap' }} className='text-[#E3E0C0] text-[1.1rem] mb-2'>{`1. Acceptance of Terms
You must be at least 13 years old (or the legal age in your country) to use LughaNest.
By registering, you confirm that all provided information (name, email, city, country, etc.) is accurate.

2. User Responsibilities
You are responsible for your account security (password, login details).
No harassment, hate speech, or illegal content is allowed in chats or posts. Violations may lead to account suspension.
You agree to use LughaNest only for language learning and cultural exchange.

3. Data Usage & Marketing
LughaNest collects location data (city/country), chat interactions, and learning progress to:
Improve the platform.
Personalize your experience.
Send targeted promotions (e.g., course discounts, partner offers).
You can opt out of marketing emails in Account Settings.

4. Intellectual Property
All course content, logos, and materials belong to LughaNest.
You may not copy, resell, or misuse any content without permission.

5. Termination
LughaNest reserves the right to suspend or ban accounts for violations.

6. Limitation of Liability
LughaNest is not liable for:
Errors in language content.
User disputes in chats.
Third-party data breaches (though we use security measures).`}</pre>
            </div>
        </section>
    <Footer/>
    </>
  );
}
export default TermsAndConditions;

import React, { useState, useEffect } from 'react';
import Header from './Header.jsx'
import Footer from './Footer.jsx'

import { handleLegaItemsData } from '../utils/legalUtils';

function TermsAndConditions() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

  // fetching the terms and conditions
  useEffect(() => {
    const fetchLegalItem = async () => {
      try {
        setLoading(true);
        await handleLegaItemsData(
          {},
          (response) => {
            if (response.data) {
              setPrivacyPolicy(response.data.terms_and_conditions);
              setUpdatedAt(response.data.updated_at)
            } else {
              setPrivacyPolicy('Not yet updated')
            }
          },
          (error) => {
            setError(error.message || 'Failed to fetch blogs');
          }
        );
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLegalItem();
  }, []);


  return (
    <>
      <Header />
      <section className='min-h-screen flex flex-col md:w-[90%] md:pt-35 px-10'>
        <div className=''>
          <h1 className='text-[#E3E0C0] text-4xl mb-4 text-left font-bold'>Terms And Conditions</h1>
        </div>
        <div className=' bg-[var(--bg)] rounded-2xl'>
          {loading ? (

            <div className="w-full text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
              <p className="mt-4 text-white">Loading terms and conditions...</p>
            </div>

          ) : (
            <div>
              <h5 className='text-[#FBEC6C] text-[13px] mb-2'>Last Updated  on {new Date(updatedAt).toLocaleDateString()}</h5>
              <pre style={{ whiteSpace: 'pre-wrap' }} className='text-[#E3E0C0] text-[1.1rem] mb-2'>{privacyPolicy}</pre>
            </div>)}
        </div>
      </section>
      <Footer />
    </>
  );
}
export default TermsAndConditions;

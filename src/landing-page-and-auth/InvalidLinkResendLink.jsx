import { useState } from 'react';

import '../AuthForms.css';
import auth_background from '../assets/password-reset-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { handleActivationLinkResend } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

function InvalidLinkResend() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: ''
    });
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Email verification logic starts here
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            setFormError('Please enter your email to receive a reset link');
            return;
        };

        setFormError('');

        setLoading(true);
        await handleActivationLinkResend({
            email: formData.email
        },
            (response) => {
                setLoading(false);
                if (response.data.message.includes("Activation link has been sent to your email address")) {
                    setFormSuccess(response.data.message)
                }
                else if (response.data.message.includes("You account has already been verified. Login to continue")) {
                    setFormSuccess(response.data.message)
                    navigate('/login');
                }
                else {
                    setFormError(response.data.message)
                }
            },
            (error) => {
                setLoading(false);

                const errorData = error?.response?.data;

                if (errorData) {
                    setFormError(errorData.message)

                } else {

                    setFormError("Request failed.");
                }
            }
        );
    };

    return (
        <>
            <section className='form-element' style={{
                backgroundImage: `url(${auth_background})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'

            }} >
                <div className="form-div">
                    <div className='form-title'>
                        <div className='heading-item'>Activation Link Resent</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Email*</legend>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required />
                        </fieldset>
                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
                            <h5>{formError}</h5>
                        </div>
                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-green-700">
                            <h5>{formSuccess}</h5>
                        </div>
                        <button type='submit'>{loading ? "Resending Activation Link..." : "Resend Link"} <FontAwesomeIcon icon={faArrowRight} /></button>
                    </form>
                </div>
            </section>
        </>
    );
}
export default InvalidLinkResend;

'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiSend } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';

const NewsletterForm = () => {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    website: Yup.string().max(0), // hidden honeypot field
  });

  const handleSubmit = (values, { resetForm }) => {
    if (values.website) return; // caught bot

    setStatus('loading');
    setMessage('');

    try {
      const substackUrl = 'https://oladayoakinmokun.substack.com/subscribe';

      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 768) {
          // Desktop: open in new tab
          window.open(substackUrl, '_blank');
        } else {
          // Mobile: open modal
          setShowModal(true);
        }
      }

      setStatus('success');
      setMessage('Thanks for subscribing!');
      resetForm();
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    } finally {
      setTimeout(() => setStatus('idle'), 1500); // optional: reset after delay
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-white text-sm font-medium text-center mb-2">Subscribe to my Newsletter</p>

      <Formik
        initialValues={{ email: '', website: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            {/* Honeypot */}
            <Field type="text" name="website" className="hidden" />

            <div className={`flex items-center gap-2 border ${status === 'error' ? 'border-red-500' : 'border-white'} rounded-full px-4 py-2`}>
              <Field
                type="email"
                name="email"
                placeholder="enter email here"
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400 text-white"
              />
              <button
                type="submit"
                disabled={isSubmitting || status === 'loading'}
                className="text-white bg-[#3D3C42] hover:bg-[#3F2E3E] p-2 rounded-full transition-all"
              >
                {status === 'loading' ? (
                  <ClipLoader size={16} color="#fff" />
                ) : (
                  <FiSend className="w-5 h-5" />
                )}
              </button>
            </div>

            <ErrorMessage name="email" component="div" className="text-xs text-red-400 text-center" />

            {message && (
              <p className={`text-xs text-center ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </Form>
        )}
      </Formik>

      {/* Mobile-only Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-black text-lg font-bold"
            >
              ×
            </button>
            <iframe
            src="https://oladayoakinmokun.substack.com/embed"
            width="100%"
            height="320"
            style={{ border: '1px solid #EEE', background: 'white' }}
            frameBorder="0"
            scrolling="no"
            title="Subscribe"
            />

          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;

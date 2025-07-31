'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiSend } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';

const NewsletterForm = () => {
  const [status, setStatus] = useState('idle'); // Removed TypeScript annotation
  const [message, setMessage] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    website: Yup.string().max(0), // Honeypot field for spam
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (values.website) return; // bot caught in honeypot

    setStatus('loading');
    setMessage('');

    try {
      // Simulate async request - replace this with your own logic
      await new Promise((res) => setTimeout(res, 1500));

      setStatus('success');
      setMessage('Subscribed successfully!');
      resetForm();
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
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
            {/* Honeypot (invisible to users) */}
            <Field type="text" name="website" className="hidden" />

            <div className={`flex items-center gap-2 border ${status === 'error' ? 'border-red-500' : 'border-white'} rounded-full px-4 py-2`}>
              <Field
                type="email"
                name="email"
                placeholder="enter email here"
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400 text-white"
                style={{ backgroundColor: 'transparent' }}
              />
              <button
                type="submit"
                disabled={isSubmitting || status === 'loading'}
                className="text-white bg-[#3D3C42] hover:bg-[#3F2E3E] p-2 rounded-full transition-all"
              >
                {status === 'loading' ? <ClipLoader size={16} color="#fff" /> : <FiSend className="w-5 h-5" />}
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
    </div>
  );
};

export default NewsletterForm;
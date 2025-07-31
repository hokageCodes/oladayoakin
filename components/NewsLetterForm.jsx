'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiSend } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const NewsletterForm = () => {
  const [status, setStatus] = useState('idle');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    website: Yup.string().max(0), // Honeypot field
  });

  const handleSubmit = async (values, { resetForm }) => {
  if (values.website) return;

  setStatus('loading');

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: values.email }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('🎉 Subscribed! Check your inbox to confirm.');
      setStatus('success');
      resetForm();
    } else {
      if (data?.error?.includes('already subscribed')) {
        toast.info('⚠️ You’re already subscribed.');
      } else if (data?.error?.includes('not confirmed')) {
        toast.info('📩 Check your inbox to confirm subscription.');
      } else {
        toast.error(data?.error || 'Something went wrong.');
      }
      setStatus('error');
    }
  } catch (err) {
    toast.error('🚫 Network error. Please try again later.');
    setStatus('error');
  }
};


  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-white text-sm font-medium text-center mb-2">
        Subscribe to my Newsletter
      </p>

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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewsletterForm;

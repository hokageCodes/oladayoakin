'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '../Container';
const testimonials = [
  {
    name: 'Jane Doe',
    text: 'The conference completely changed my career perspective. The sessions were practical and inspiring.',
    title: 'Legal Analyst at LexCorp',
  },
  {
    name: 'John Smith',
    text: 'An incredible gathering of top legal minds. I made connections that have already paid off.',
    title: 'Corporate Lawyer at Global Law',
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="w-full bg-white py-20 min-h-[660px] dark:bg-black">
      <Container className="flex flex-col md:flex-row items-start justify-between gap-12">
        {/* Left Text */}
        <div className="min-w-[300px] md:min-w-[626px] max-w-[90%]">
          <p className="text-sm font-normal dark:text-gray-500 text-black mb-2 tracking-widest uppercase">Testimonials</p>
          <h2 className="text-[48px] md:text-[72px] font-medium leading-[90%] dark:text-white text-black tracking-[-2px] capitalize">
            What people say <br /> about me
          </h2>
        </div>

        {/* Right Testimonial */}
        <div className="w-full max-w-[632px] h-[500px] relative">
          {/* Testimonial Card */}
          <div className="bg-linkedin dark:bg-white rounded-2xl p-6 h-[428px] flex flex-col justify-between">
            <p className="text-lg text-white dark:text-black mb-6">"{testimonials[index].text}"</p>
            <div>
              <p className="font-semibold text-white text-lg dark:text-black">{testimonials[index].name}</p>
              <p className="text-sm text-gray-700">{testimonials[index].title}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-6 bottom-0 right-0">
            <button
              onClick={prev}
              className="w-12 dark:text-white h-12 rounded-full border border-2 flex items-center justify-center hover:bg-[#7F5283]"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="bg-black dark:bg-white text-white dark:text-black w-12 h-12 rounded-full flex items-center justify-center"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

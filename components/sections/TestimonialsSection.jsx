'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '../Container';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { client } from '@/sanity/lib/client';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const data = await client.fetch(
        `*[_type == "testimonial"] | order(_createdAt desc){
          _id,
          name,
          text,
          title
        }`
      );
      setTestimonials(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="w-full bg-white py-20 min-h-[660px] dark:bg-black">
      <Container className="flex flex-col lg:flex-row items-start justify-between gap-12">
        {/* Left Text */}
        <div className="min-w-[300px] lg:min-w-[626px] max-w-[90%]">
          <p className="text-xl font-normal text-neutral-400 mb-2 tracking-widest uppercase">
            Testimonials
          </p>
          <h2 className="text-[40px] md:text-[60px] lg:text-[72px] font-medium leading-[90%] dark:text-white text-black tracking-[-2px] capitalize">
            What people say <br /> about me
          </h2>
        </div>

        {/* Right Testimonial Card */}
        <div className="w-full max-w-[632px] relative">
          {loading || testimonials.length === 0 ? (
            <div className="bg-gray-200 dark:bg-white rounded-2xl p-6 h-[428px] flex flex-col justify-between">
              <Skeleton count={3} height={20} />
              <div className="mt-6">
                <Skeleton height={20} width={150} />
                <Skeleton height={14} width={100} />
              </div>
            </div>
          ) : (
            <div className="bg-linkedin dark:bg-white rounded-2xl p-6 min-h-[380px] sm:min-h-[420px] max-h-[480px] flex flex-col justify-between">
              {/* Testimonial Text Scrollable */}
              <div className="text-lg text-white dark:text-black overflow-hidden relative mb-6">
                <div className="overflow-y-auto max-h-[220px] sm:max-h-[250px] pr-2 scrollbar-custom">
                  “{testimonials[index]?.text}”
                </div>
              </div>


              {/* Name + Title */}
              <div>
                <p className="font-semibold text-white text-lg dark:text-black">
                  {testimonials[index]?.name}
                </p>
                <p className="text-sm text-gray-700">{testimonials[index]?.title}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {!loading && testimonials.length > 1 && (
            <div className="flex gap-4 mt-6 justify-end">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border dark:text-white flex items-center justify-center hover:bg-[#7F5283]"
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
          )}
        </div>
      </Container>
    </section>
  );
}

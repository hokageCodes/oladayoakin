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
    <section className="w-full py-20 min-h-[660px] bg-black">
      <Container className="flex flex-col lg:flex-row items-start justify-between gap-12">
        {/* Left Text */}
        <div className="min-w-[300px] lg:min-w-[626px] max-w-[90%]">
          <p className="text-xl font-normal text-gray-300 mb-2 tracking-widest uppercase">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-medium leading-[90%] text-white tracking-[-2px] capitalize">
            What people say about me
          </h2>
        </div>

        {/* Right Testimonial Card */}
        <div className="w-full max-w-[832px] relative text-justify">
          {loading || testimonials.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 h-[428px] flex flex-col justify-between">
              <Skeleton count={3} height={20} />
              <div className="mt-6">
                <Skeleton height={20} width={150} />
                <Skeleton height={14} width={100} />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 min-h-[380px] sm:min-h-[420px] max-h-[480px] flex flex-col justify-between">
              {/* Testimonial Text Scrollable */}
              <div className="text-lg text-black overflow-hidden relative mb-6">
                <div 
                  className="overflow-y-auto max-h-[220px] sm:max-h-[250px] pr-2"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#666 #e5e5e5',
                    WebkitScrollbarWidth: '8px',
                  }}
                >
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      width: 8px;
                    }
                    div::-webkit-scrollbar-track {
                      background: #f1f1f1;
                      border-radius: 4px;
                    }
                    div::-webkit-scrollbar-thumb {
                      background: #666;
                      border-radius: 4px;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background: #555;
                    }
                  `}</style>
                  "{testimonials[index]?.text}"
                </div>
              </div>

              {/* Name + Title */}
              <div>
                <p className="font-semibold text-black text-lg">
                  {testimonials[index]?.name}
                </p>
                <p className="text-sm text-gray-600">{testimonials[index]?.title}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {!loading && testimonials.length > 1 && (
            <div className="flex gap-4 mt-6 justify-end">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-white text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
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
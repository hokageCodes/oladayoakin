'use client';

import React from 'react';
import Container from '../Container';
import { FaGavel, FaShieldAlt, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

const offerings = [
  {
    icon: <FaShieldAlt className="text-[#A6D1E6] text-4xl mb-4" />,
    title: 'Legal advisory on cybersecurity, privacy, and compliance',
    description:
      'Get tailored legal advice on cybersecurity frameworks, data protection (NDPR/GDPR), and compliance best practices.',
  },
  {
    icon: <FaBook className="text-[#A6D1E6] text-4xl mb-4" />,
    title: 'GRC Policy Development',
    description:
      'GRC policy development & documentation', 
  },
  {
    icon: <FaChalkboardTeacher className="text-[#A6D1E6] text-4xl mb-4" />,
    title: 'Corporate training for staff or teams',
    description:
      'Train your staff or leadership on cybersecurity awareness, data handling, and legal risks in tech-driven environments.',
  },
  {
    icon: <FaGavel className="text-[#A6D1E6] text-4xl mb-4" />,
    title: 'Mentorship & Speaking',
    description:
      'Mentorship & speaking on legal-tech career path',
  },
];


export default function WhatIOfferSection() {
  return (
    <section className="bg-[#0D0D0D] py-16 text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Offer</h2>
          <p className="text-lg text-gray-300">
            If you are looking for a lawyer who blends legal expertise with digital risk strategy,
            and is passionate about growing the next generation, you are in the right place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {offerings.map((item, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-2xl p-6 text-center hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 mt-2">{item.title}</h3>
              {/* <p className="text-gray-400 text-sm">{item.description}</p> */}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

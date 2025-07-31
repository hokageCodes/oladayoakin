'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Container from '../Container';

const fadeInVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staticData = {
  heading: 'About',
  contentLeft:
    'I am a Cybersecurity & Data Privacy Lawyer. I help businesses and startups understand the legal side of tech, stay compliant, and build digital trust. With experience across corporate commercial law, cybersecurity, and GRC, I have supported clients in drafting privacy policies, navigating NDPR/GDPR, and delivering cybersecurity training for teams. Another icing on the cake is the fact that I am an experienced Court room lawyer, having represented clients at the High Court and the Appellate courts. With this skill, I am able to advise you, review or draft your documents with a courtroom lens.',
  contentRight:
    'Beyond this, I also mentor and train students and young lawyers who want to build careers in Cybersecurity Law, Data Privacy, and GRC, through content, speaking, and direct guidance. In 2024, I was recognized among the Iconic Brand Africa Top 10 Exceptional Professionals in Law for my work in this space.',
  services: [
    'Legal advisory on cybersecurity, privacy, and compliance',
    'GRC policy development & documentation',
    'Corporate training for staff or teams',
    'Mentorship & speaking on legal-tech career paths',
  ],
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      aria-label="About Me Section"
      className="w-full bg-black pt-10 md:pt-20 text-neutral-200"
    >
      <Container className="px-2">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Column 1: Title + Image */}
            <div className="flex flex-col space-y-6">
              <h2 id="about-heading" className="text-white text-2xl font-bold tracking-tight">
                • {staticData.heading}
              </h2>
              <div className="relative w-full aspect-[3/4] bg-white/10 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/1.webp"
                  alt="Profile photo of Oladayo Akinmokun"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Column 2–3: Content */}
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <div className="text-lg leading-relaxed text-justify space-y-4">
                <p>{staticData.contentLeft}</p>
              </div>
              <div className="text-lg leading-relaxed text-justify space-y-4">
                <p>{staticData.contentRight}</p>
                <div>
                  <h3 className="text-xl font-semibold mb-2">What I Offer:</h3>
                  <ul className="list-disc list-inside pl-2 grid gap-1">
                    {staticData.services.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="lg:col-span-3 text-center mx-auto max-w-3xl pt-8 text-base sm:text-lg font-medium leading-relaxed">
              <p className="text-white">
                If you are looking for a lawyer who blends legal expertise with digital risk strategy, and is passionate
                about growing the next generation, you are in the right place.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutSection;

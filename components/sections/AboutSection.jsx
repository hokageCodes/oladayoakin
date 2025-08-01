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
  combinedContent: `
I am a Cybersecurity & Data Privacy Lawyer. I help businesses and startups understand the legal side of tech, stay compliant, and build digital trust. With experience across corporate commercial law, cybersecurity, and GRC, I have supported clients in drafting privacy policies, navigating NDPR/GDPR, and delivering cybersecurity training for teams.

Another icing on the cake is the fact that I am an experienced Court room lawyer, having represented clients at the High Court and the Appellate courts. With this skill, I am able to advise you, review or draft your documents with a courtroom lens.

Beyond this, I also mentor and train students and young lawyers who want to build careers in Cybersecurity Law, Data Privacy, and GRC, through content, speaking, and direct guidance.

In 2024, I was recognized among the Iconic Brand Africa Top 10 Exceptional Professionals in Law for my work in this space.
  `,
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full bg-black py-16 text-neutral-200"
    >
      <Container className="px-2">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Column 1: Title + Image */}
            <div className="flex flex-col space-y-6 lg:col-span-1">
              <h2 id="about-heading" className="text-white text-4xl md:text-5xl font-bold tracking-tight">
                • {staticData.heading}
              </h2>
              <div className="relative w-full aspect-[3/4] bg-white/10 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/1.webp"
                  alt="Profile photo of Oladayo Akinmokun"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Column 2–4: Text split across 3 cols */}
            <div className="lg:col-span-3">
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 text-lg leading-relaxed text-justify text-gray-300 space-y-4">
                {staticData.combinedContent
                  .trim()
                  .split('\n')
                  .map((para, index) =>
                    para.trim() ? <p key={index}>{para.trim()}</p> : null
                  )}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutSection;

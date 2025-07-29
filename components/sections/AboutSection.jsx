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
  heading: "About",
  contentLeft:
    "I am a Cybersecurity & Data Privacy Lawyer. I help businesses and startups understand the legal side of tech, stay compliant, and build digital trust. With experience across corporate commercial law, cybersecurity, and GRC, I have supported clients in drafting privacy policies, navigating NDPR/GDPR, and delivering cybersecurity training for teams. Another icing on the cake is the fact that I am an experienced Court room lawyer, having represented clients at the High Court and the Appellate courts. With this skill, I am able to advise you, review or draft your documents with a courtroom lens.",
  contentRight:
    "Beyond this, I also mentor and train students and young lawyers who want to build careers in Cybersecurity Law, Data Privacy, and GRC, through content, speaking, and direct guidance. In 2024, I was recognized among the Iconic Brand Africa Top 10 Exceptional Professionals in Law for my work in this space.",
  services: [
    "Legal advisory on cybersecurity, privacy, and compliance",
    "GRC policy development & documentation",
    "Corporate training for staff or teams",
    "Mentorship & speaking on legal-tech career paths",
  ],
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="about" className="w-full bg-linkedin dark:bg-black py-20 text-white dark:text-gray-400">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Column: Title + Image */}
            <div className="flex flex-col h-full space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">• {staticData.heading}</h2>
              <div className="relative w-full h-full min-h-[100%] aspect-[3/4] bg-white/10 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/1.webp"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Wrap center and right in a wrapper to equalize height */}
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Center Column: contentLeft */}
              <div className="flex flex-col justify-between text-lg leading-relaxed text-justify space-y-6">
                <p>{staticData.contentLeft}</p>
              </div>

              {/* Right Column: contentRight + Services */}
              <div className="flex flex-col justify-between text-lg leading-relaxed space-y-6">
                <p className="text-justify">{staticData.contentRight}</p>
                <div>
                  <h3 className="text-xl font-semibold mb-4">What I Offer:</h3>
                  <ul className="grid grid-cols-1 gap-2 list-disc list-inside pl-2">
                    {staticData.services.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Row (centered across col 2 and 3) */}
            <div className="lg:col-start-1 lg:col-span-3 text-center mx-auto max-w-3xl pt-10 text-lg font-medium leading-relaxed">
              <p className='text-white'>
                If you are looking for a lawyer who blends legal expertise with digital risk strategy, and is passionate about growing the next generation, you are in the right place.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutSection;

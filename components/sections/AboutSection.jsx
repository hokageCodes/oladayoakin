'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../Container';

const fadeInVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="w-full bg-linkedin dark:bg-black py-20">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInVariants}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20"
        >
          {/* Heading */}
          <div className="lg:w-[300px] shrink-0">
            <h2 className="text-sm font-medium leading-tight tracking-tight text-white dark:text-white">
              •  About Me
            </h2>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white dark:text-gray-400 text-lg leading-relaxed">
            <div className="space-y-6">
              <p>
                Hi, I'm <strong className="font-semibold text-white">Oladayo Akinmokun</strong>, a corporate commercial lawyer, with a large sprinkle of litigation. I focus on Cybersecurity and Data Privacy, helping businesses and professionals navigate legal compliance.
              </p>
              <p>
                With over three years of courtroom experience, I know how to defend and protect client interests across all levels of court.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                I’m also big on Personal Branding — I help lawyers build strong online visibility. My mission is simple: empower and protect.
              </p>
              <p>
                When I’m not deep in legal frameworks or content strategy, I’m likely watching K-dramas, vibing to BTS (Jungkook, I see you! 😊), or brainstorming my next big idea.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutSection;

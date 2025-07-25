'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../Container';
import { client } from '../../sanity/lib/client';

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

const Skeleton = () => (
  <div className="animate-pulse flex flex-col lg:flex-row gap-12 lg:gap-20 text-white">
    <div className="lg:w-[300px] shrink-0">
      <div className="h-6 w-1/2 bg-white/20 rounded mb-2"></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-lg">
      <div className="space-y-3">
        <div className="h-4 w-full bg-white/20 rounded" />
        <div className="h-4 w-5/6 bg-white/20 rounded" />
        <div className="h-4 w-3/4 bg-white/20 rounded" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-white/20 rounded" />
        <div className="h-4 w-5/6 bg-white/20 rounded" />
        <div className="h-4 w-3/4 bg-white/20 rounded" />
      </div>
    </div>
  </div>
);

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const aboutData = await client.fetch(`
          *[_type == "about"][0] {
            heading,
            contentLeft,
            contentRight
          }
        `);
        setData(aboutData);
      } catch (error) {
        console.error('Sanity fetch failed:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="w-full bg-linkedin dark:bg-black py-20">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInVariants}
        >
          {!data ? (
            <Skeleton />
          ) : (
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 text-white">
              {/* Heading */}
              <div className="lg:w-[300px] shrink-0">
                <h2 className="text-xl font-medium leading-tight tracking-tight text-white dark:text-white">
                  • {data.heading}
                </h2>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-lg leading-relaxed text-justify">
                <div>
                  <p>{data.contentLeft}</p>
                </div>
                <div>
                  <p>{data.contentRight}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
};

export default AboutSection;

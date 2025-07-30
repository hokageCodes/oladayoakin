'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Container from '@/components/Container';

const sections = [
  { id: 'extra1', bgImage: '/02.webp' },
  { id: 'combo', bgImage: '/pass.webp' },
  { id: 'wings', bgImage: '/o.jpeg' },
  { id: 'laps', bgImage: '/law.JPG' },
  { id: 'extra2', bgImage: '/the-cyber-lawyer.webp' },
];

export default function ImageGallery() {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="w-full py-16 overflow-hidden bg-white dark:bg-black">
      <Container>
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10 text-[#152724] dark:text-white">
          Photo Dump
        </h2>

        {/* Desktop Layout */}
        <motion.div
          className="hidden lg:flex w-full h-[600px] gap-4 overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const isLoaded = loadedImages[section.id];

            return (
              <motion.div
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`relative rounded-[10px] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out flex-shrink-0 ${
                  isActive ? 'w-[500px]' : 'w-[150px]'
                } h-full`}
                animate={{ width: isActive ? 500 : 150 }}
              >
                {!isLoaded && (
                  <Skeleton
                    height="100%"
                    width="100%"
                    borderRadius="10px"
                    className="absolute inset-0 z-10"
                  />
                )}

                <Image
                src={section.bgImage}
                alt={`Gallery image - ${section.id}`}
                fill
                onLoad={() => handleImageLoad(section.id)}
                className={`transition-opacity duration-500 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                } object-[top]`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                priority={isActive}
                />

              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Layout: Stacked */}
        <div className="lg:hidden w-full flex flex-col gap-6 mt-6">
          {sections.map((section, index) => {
            const isLoaded = loadedImages[section.id];

            return (
              <div
                key={section.id}
                className="relative w-full h-[400px] rounded-[10px] overflow-hidden"
              >
                {!isLoaded && (
                  <Skeleton
                    height="100%"
                    width="100%"
                    borderRadius="10px"
                    className="absolute inset-0 z-10"
                  />
                )}

                <Image
                src={section.bgImage}
                alt={`Gallery image - ${section.id}`}
                fill
                onLoad={() => handleImageLoad(section.id)}
                className={`transition-opacity duration-700 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                } object-[top]`}
                sizes="100vw"
                priority={index === 0}
                />

              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

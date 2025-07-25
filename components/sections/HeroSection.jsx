'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import Container from '../Container';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const CyberLawyerHero = ({
  name = 'Oladayo Akinmokun',
  title = 'The Cyber Lawyer',
  tagline = 'Helping businesses and professionals navigate Cybersecurity, Data Privacy, and Personal Branding.',
  imageUrl = '/speak1.jpg',
  onConsultationRequest,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonState, setButtonState] = useState('idle');
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const buttonRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  // Track dark mode dynamically for grid color
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!buttonRef.current || !gridRef.current) return;

    const grid = gridRef.current;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          gsap.set(grid, {
            y: scrolled * 0.1,
            ease: 'none',
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConsultationClick = () => {
    if (buttonState !== 'idle') return;

    setButtonState('loading');

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }

    setTimeout(() => {
      setButtonState('sent');
      setTimeout(() => setButtonState('idle'), 3000);
    }, 1000);

    if (onConsultationRequest) onConsultationRequest();
  };

  const getButtonText = () =>
    buttonState === 'loading'
      ? 'Sending...'
      : buttonState === 'sent'
      ? 'Request Sent!'
      : 'Request a Consultation';

  const getButtonStyles = () => {
    switch (buttonState) {
      case 'loading':
        return 'bg-amber-600';
      case 'sent':
        return 'bg-emerald-600';
      default:
        return 'bg-neutral-800 hover:bg-neutral-700';
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Grid BG */}
      <div
        ref={gridRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `
            : `
              linear-gradient(rgba(0,0,0,0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.25) 1px, transparent 1px)
            `,
          backgroundSize: '40px 40px',
          opacity: 0.12,
        }}
      />

      <motion.div
        ref={containerRef}
        className="relative z-10 py-10 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <Container>
          <div className="flex flex-col gap-8 md:gap-12">
            {/* Text & Button */}
            <motion.div className="flex flex-col gap-4 md:gap-6" variants={textVariants}>
              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-6 xl:gap-8">
                <div className="flex-1 min-w-0">
                  <motion.h1
                    className="
                      text-6xl
                      sm:text-5xl
                      md:text-6xl
                      lg:text-7xl
                      xl:text-8xl
                      2xl:text-[128px]
                      text-black dark:text-white 
                      leading-[0.9]
                      mb-6
                      break-words
                      font-medium
                    "
                  >
                    {name}
                  </motion.h1>

                  <motion.h2
                    className="
                      text-3xl
                      sm:text-3xl
                      md:text-4xl
                      lg:text-5xl
                      xl:text-6xl
                      2xl:text-[76px]
                      font-light 
                      text-black dark:text-white 
                      mt-2
                      md:mt-4
                      lg:mt-6
                      tracking-tight
                      break-words
                      leading-[0.9]
                    "
                  >
                    {title}
                  </motion.h2>
                </div>

                <motion.button
                  ref={buttonRef}
                  onClick={handleConsultationClick}
                  disabled={buttonState === 'loading'}
                  className={`
                    md:mt-32
                    
                    sm:w-48
                    xl:w-60
                    xl:h-60
                    h-12
                    sm:h-14
                    rounded-lg
                    xl:rounded-full
                    text-white font-medium 
                    text-xs
                    sm:text-sm
                    xl:text-lg
                    uppercase
                    flex items-center justify-center text-center
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-black dark:focus:ring-white
                    transition-all duration-200
                    xl:flex-shrink-0
                    ${getButtonStyles()}
                  `}
                  variants={textVariants}
                >
                  <span className="px-4 xl:px-2">{getButtonText()}</span>
                </motion.button>
              </div>

              <motion.p
                className="
                  text-sm
                  sm:text-base
                  md:text-lg
                  text-neutral-600 dark:text-neutral-400 
                  max-w-3xl
                  leading-relaxed
                "
                variants={textVariants}
              >
                {tagline}
              </motion.p>
            </motion.div>

            {/* Image */}
            <motion.div
              className="
                relative 
                w-full 
                h-[250px]
                sm:h-[350px]
                md:h-[450px]
                lg:h-[550px]
                xl:h-[650px]
                2xl:h-[700px]
                overflow-hidden 
                rounded-xl
                md:rounded-2xl
              "
              variants={imageVariants}
            >
              <Image
                src={imageUrl}
                alt={`${name} - Hero`}
                fill
                onLoad={() => setIsLoaded(true)}
                className={`object-cover transition-opacity duration-500 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1140px"
                priority
              />

              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-900 animate-pulse">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading...</p>
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </div>
  );
};

export default CyberLawyerHero;
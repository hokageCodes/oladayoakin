'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

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

    const button = buttonRef.current;
    const grid = gridRef.current;

    // const handleMouseEnter = () => {
    //   gsap.to(button, {
    //     scale: 1.05,
    //     rotation: 2,
    //     duration: 0.3,
    //     ease: 'power2.out',
    //   });
    // };

    // const handleMouseLeave = () => {
    //   gsap.to(button, {
    //     scale: 1,
    //     rotation: 0,
    //     duration: 0.3,
    //     ease: 'power2.out',
    //   });
    // };

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
        className="relative z-10 px-2 py-10 md:py-24 md:px-16 lg:px-[64px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="flex flex-col gap-12">
          {/* Text & Button */}
          <motion.div className="flex flex-col gap-6" variants={textVariants}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="flex-1 max-w-full">
  <motion.h1
    className="
      text-6xl      /* base: mobile */
      sm:text-6xl   /* small screens */
      md:text-7xl   /* medium screens */
      lg:text-[128px] /* large screens */
      xl:text-[110px] /* xl screens slightly smaller */
      2xl:text-[128px] /* 2xl restore big */
      text-black dark:text-white 
      leading-tight 
      mb-2 
      break-words
      max-w-full
    "
  >
    {name}
  </motion.h1>

  <motion.h2
    className="
      text-4xl      /* base */
      sm:text-3xl   /* small */
      md:text-4xl   /* medium */
      lg:text-[96px] /* large */
      xl:text-[80px] /* xl smaller */
      2xl:text-[96px] /* 2xl restore */
      font-light 
      text-black dark:text-white 
      lg:mt-6 
      lg:mb-6 
      tracking-tight
      break-words
      max-w-full
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
                  w-full sm:w-40 h-12 sm:h-40 
                  rounded-md sm:rounded-full
                  text-white font-medium text-xs uppercase
                  flex items-center justify-center text-center
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-black dark:focus:ring-white
                  ${getButtonStyles()}
                `}
                variants={textVariants}
              >
                {getButtonText()}
              </motion.button>
            </div>

            <motion.p
              className="md:ml-4 text-base sm:text-md text-neutral-600 dark:text-neutral-400 max-w-2xl"
              variants={textVariants}
            >
              {tagline}
            </motion.p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative w-full h-[300px] sm:h-[500px] lg:h-[700px] overflow-hidden rounded-2xl"
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
              sizes="100vw"
              priority
            />

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-900 animate-pulse">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading...</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CyberLawyerHero;

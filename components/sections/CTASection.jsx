'use client';

import Container from '@/components/Container';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CTASection = ({
  calendlyUrl = 'https://calendly.com/busayooladayo/30min', // Add your actual Calendly URL here
}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [buttonState, setButtonState] = useState('idle');

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Load Calendly script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setCalendlyLoaded(true);
      document.head.appendChild(script);
      
      // Also load the CSS
      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    } else if (window.Calendly) {
      setCalendlyLoaded(true);
    }
  }, []);

  const handleConsultationClick = (e) => {
    e.preventDefault();
    if (buttonState !== 'idle') return;
    
    setButtonState('loading');
    
    // Check if we're on mobile or desktop
    const isMobile = screenWidth <= 768;
    
    if (calendlyLoaded && window.Calendly) {
      if (isMobile) {
        // Mobile: Show popup widget
        window.Calendly.initPopupWidget({
          url: calendlyUrl,
          prefill: {},
          utm: {}
        });
        setButtonState('sent');
        setTimeout(() => setButtonState('idle'), 2000);
      } else {
        // Desktop: Open in new tab
        window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
        setButtonState('sent');
        setTimeout(() => setButtonState('idle'), 2000);
      }
    } else {
      // Fallback: direct link
      window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
      setButtonState('sent');
      setTimeout(() => setButtonState('idle'), 2000);
    }
  };

  const getConsultationButtonText = () => {
    switch (buttonState) {
      case 'loading':
        return 'Opening...';
      case 'sent':
        return screenWidth <= 768 ? 'Widget Opened!' : 'Opened!';
      default:
        return 'Book a Consultation';
    }
  };

  const getConsultationButtonStyles = () => {
    switch (buttonState) {
      case 'loading':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'sent':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      default:
        return 'bg-white text-black hover:bg-neutral-200';
    }
  };

  return (
    <section className="w-full py-10 md:py-16 bg-black">
      <Container>
        <div
          className="relative h-full w-full rounded-[16px] overflow-hidden border bg-cover bg-center"
          style={{ backgroundImage: "url('/cta-bg.webp')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10 rounded-[16px]" />

          {/* Content */}
          <div className="relative z-20 w-full h-full flex items-center justify-center px-4 py-20">
            <div className="max-w-[800px] text-center">
              <motion.h2
                className="text-white font-darkerGrotesque text-[32px] md:text-[64px] font-medium leading-[100%] mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Let's Elevate Your Impact
              </motion.h2>
              <motion.p
                className="text-white font-dmSans text-base md:text-[24px] leading-[140%] tracking-[-0.03em] mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Whether you're building a startup, growing your legal brand, or seeking an engaging speaker — let us collaborate to create real results backed by experience and insight.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <button
                  onClick={handleConsultationClick}
                  disabled={buttonState === 'loading'}
                  className={`
                    px-6 py-3 rounded-full font-semibold transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${getConsultationButtonStyles()}
                  `}
                >
                  {getConsultationButtonText()}
                </button>
                <a
                target='__blank'
                  href="https://forms.gle/pATX8LmJDMrdQQbV6" // Replace with actual inquiry link or route
                  className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  Make an Inquiry
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
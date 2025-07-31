'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Container from '../Container';

const CyberLawyerHero = ({
  name = 'Oladayo Akinmokun',
  title = 'The Cyber Lawyer',
  tagline = 'Helping businesses and professionals navigate Cybersecurity, Data Privacy, and Personal Branding.',
  imageUrl = '/ccc.webm',
  posterImage = '/oladayo-akinmokun.webp',
  calendlyUrl = 'https://calendly.com/busayooladayo/30min', // Add your actual Calendly URL here
  onConsultationRequest,
}) => {
  const [buttonState, setButtonState] = useState('idle');
  const [screenWidth, setScreenWidth] = useState(0);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

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

  const handleConsultationClick = () => {
    if (buttonState !== 'idle') return;
    
    setButtonState('loading');
    
    // Check if we're on mobile or desktop
    const isMobile = screenWidth <= 768;
    
    if (calendlyLoaded && window.Calendly) {
      if (isMobile) {
        // Mobile: Show popup widget with web version link
        window.Calendly.initPopupWidget({
          url: calendlyUrl,
          prefill: {},
          utm: {},
          text: `<p style="margin-top: 16px; text-align: center;"><a href="${calendlyUrl}" target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: underline; font-size: 14px;">Prefer the web version? Click here</a></p>`
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
    
    if (onConsultationRequest) onConsultationRequest();
  };

  const getButtonText = () => {
    switch (buttonState) {
      case 'loading':
        return 'Opening...';
      case 'sent':
        return screenWidth <= 768 ? 'Widget Opened!' : 'Opened in New Tab!';
      default:
        return 'Request a Consultation';
    }
  };

  const getButtonStyles = () => {
    switch (buttonState) {
      case 'loading':
        return 'bg-amber-600 hover:bg-amber-700';
      case 'sent':
        return 'bg-emerald-600 hover:bg-emerald-700';
      default:
        return 'bg-neutral-800 hover:bg-neutral-700';
    }
  };

  const isRounded = screenWidth > 375;

  return (
    <div id="home" className="relative min-h-screen bg-black overflow-hidden">
      <Container className="pt-6 pb-4 md:pt-24 md:pb-10 px-2">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[128px] text-white leading-[0.9] mb-6 break-words font-medium">
                  {name}
                </h1>
                <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[76px] font-light text-white mt-2 md:mt-4 lg:mt-6 tracking-tight break-words leading-[0.9]">
                  {title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl leading-relaxed mt-4 md:mt-6">
                  {tagline}
                </p>
              </div>
              <button
                onClick={handleConsultationClick}
                disabled={buttonState === 'loading'}
                className={`
                  ${getButtonStyles()}
                  ${isRounded ? 'rounded-full' : 'rounded-lg'}
                  w-full sm:w-48 md:w-60 md:h-60 h-12 sm:h-14
                  text-white font-medium text-xs sm:text-sm md:text-lg
                  uppercase flex items-center justify-center text-center
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-white transition-all duration-200 md:flex-shrink-0
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <span className="px-4 md:px-2">{getButtonText()}</span>
              </button>
            </div>
          </div>

          <div className="w-full bg-black rounded-2xl shadow-lg overflow-hidden p-2 sm:p-3">
            {screenWidth > 768 ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                fetchPriority="high"
                poster={posterImage}
                className="w-full h-[650px] object-cover object-top rounded-xl"
              >
                <source src={imageUrl} type="video/webm" />
                <source src={imageUrl.replace('.webm', '.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={posterImage}
                alt={`${name} - Hero`}
                priority
                fetchPriority="high"
                width={400}
                height={650}
                className="w-full h-auto object-cover rounded-xl"
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CyberLawyerHero;
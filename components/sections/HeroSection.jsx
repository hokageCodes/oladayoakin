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
  onConsultationRequest,
}) => {
  const [buttonState, setButtonState] = useState('idle');
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleConsultationClick = () => {
    if (buttonState !== 'idle') return;
    setButtonState('loading');
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

  const isRounded = screenWidth > 375;

  return (
    <div id="home" className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      <Container className="pt-6 pb-4 md:pt-24 md:pb-10 px-2">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[128px] text-black dark:text-white leading-[0.9] mb-6 break-words font-medium">
                  {name}
                </h1>
                <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[76px] font-light text-black dark:text-white mt-2 md:mt-4 lg:mt-6 tracking-tight break-words leading-[0.9]">
                  {title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mt-4 md:mt-6">
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
                  focus:ring-black dark:focus:ring-white
                  transition-all duration-200 md:flex-shrink-0
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
      className="w-full h-[500px] object-cover rounded-xl"
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

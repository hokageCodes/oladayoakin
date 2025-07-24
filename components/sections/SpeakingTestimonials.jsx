'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Container from '../Container';

const engagements = [
  {
    name: 'Speaking at TechLaw Conference 2024',
    description: 'Delivered a keynote on AI & Legal Frameworks in Africa.',
    image: '/speak1.jpg',
    link: '#',
  },
  {
    name: 'Panelist at Global Legal Summit',
    description: 'Discussed cross-border regulations and innovation.',
    image: '/speak1.jpg',
    link: '#',
  },
  {
    name: 'Keynote at Lagos Legal Expo',
    description: 'Spoke on digital transformation in the legal sector.',
    image: '/speak1.jpg',
    link: '#',
  },
  {
    name: 'Keynote at Lagos Legal Expo',
    description: 'Spoke on digital transformation in the legal sector.',
    image: '/speak1.jpg',
    link: '#',
  },
  {
    name: 'Keynote at Lagos Legal Expo',
    description: 'Spoke on digital transformation in the legal sector.',
    image: '/speak1.jpg',
    link: '#',
  },
];

export default function SpeakingEngagements() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    const updateLayout = () => {
      const isWide = window.innerWidth >= 768;
      setIsDesktop(isWide);
      if (isWide) {
        const calculated = engagements.length * 380 + 200;
        setHeight(`${calculated}px`);
      } else {
        setHeight('auto');
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const cards = cardsContainerRef.current;
      if (!container || !cards || !isDesktop) return;

      const rect = container.getBoundingClientRect();
      const offsetTop = rect.top;
      const scrollRange = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-offsetTop, 0), scrollRange);

      cards.style.transform = `translateY(-${progress}px)`;
    };

    if (isDesktop) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      className="relative dark:bg-black text-black dark:text-[#DCDFDF]"
      style={{ height }}
    >
      {/* DESKTOP VIEW */}
      {isDesktop && (
        <div className="hidden md:flex sticky top-0 h-screen items-start justify-center py-20">
          <Container className="flex gap-10">
            {/* LEFT FIXED TITLE */}
            <div className="w-[371px] sticky top-20">
              <h2 className="font-darkerGrotesque text-[64px] font-medium leading-[64px] tracking-[-2px] capitalize text-[#152724] dark:text-white">
                Speaking engagements & testimonials
              </h2>
            </div>

            {/* RIGHT SCROLLING CARDS */}
            <div className="relative w-full h-full overflow-hidden">
              <div ref={cardsContainerRef} className="relative">
                {engagements.map((item, index) => (
                  <div
                    key={index}
                    className="w-full h-[344px] bg-white dark:bg-neutral-900 rounded-2xl p-4 mb-10 flex gap-6 shadow-md"
                  >
                    <div className="w-[320px] h-[320px] rounded-[12px] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={320}
                        height={320}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center w-[545px]">
                      <h3 className="text-[36px] font-semibold leading-tight mb-2">{item.name}</h3>
                      <p className="text-[20px] leading-snug text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* MOBILE VIEW */}
      {!isDesktop && (
        <Container className="py-10">
          <h2 className="text-[32px] font-medium leading-[40px] tracking-[-1px] text-center mb-10 text-[#152724] dark:text-white">
            Speaking engagements & testimonials
          </h2>
          <div>
            {engagements.map((item, index) => (
              <div
                key={index}
                className="w-full bg-white dark:bg-neutral-900 rounded-2xl p-4 mb-8 flex flex-col gap-4 shadow-md"
              >
                <div className="w-full h-[240px] rounded-[12px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={240}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-[24px] font-semibold leading-snug mb-1">{item.name}</h3>
                  <p className="text-[16px] leading-relaxed text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}

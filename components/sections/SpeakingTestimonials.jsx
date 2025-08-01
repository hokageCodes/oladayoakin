'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { client } from '../../sanity/lib/client';
import { engagementsQuery } from '../../lib/queries';
import Container from '../Container';

export default function SpeakingEngagements() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [engagements, setEngagements] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function getEngagements() {
      try {
        const data = await client.fetch(engagementsQuery);
        setEngagements(data);
      } catch (error) {
        console.error('Error fetching engagements:', error);
      } finally {
        setLoading(false);
      }
    }

    getEngagements();
  }, []);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const cards = cardsContainerRef.current;
      if (!container || !cards) return;

      if (window.innerWidth < 768) {
        cards.style.transform = 'none';
        return;
      }

      const rect = container.getBoundingClientRect();
      const offsetTop = rect.top;
      const scrollRange = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-offsetTop, 0), scrollRange);
      cards.style.transform = `translateY(-${progress}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerHeight = engagements.length * 380 + 200;

  const getContainerHeight = () => {
    if (!isClient) return 'auto';
    return isDesktop ? containerHeight : 'auto';
  };

  const renderSkeletonCard = (_, index) => (
    <div
      key={`skeleton-${index}`}
      className="w-full h-[344px] bg-white rounded-2xl p-4 mb-10 flex gap-6 shadow-md"
    >
      <Skeleton height={320} width={320} borderRadius={12} />
      <div className="flex flex-col justify-center flex-1">
        <Skeleton height={36} width="60%" />
        <Skeleton height={20} width="90%" count={3} className="mt-2" />
      </div>
    </div>
  );

  return (
    <section
      id="whatido"
      ref={containerRef}
      className="relative bg-black md:[height:auto]"
      style={{
        height: getContainerHeight(),
      }}
    >
      {/* DESKTOP VIEW */}
      <div className="hidden md:flex sticky top-0 h-screen items-start justify-center py-20">
        <Container>
          <div className="w-full flex gap-10">
            <div className="w-[371px] sticky top-20">
              <h2 className="font-darkerGrotesque text-4xl md:text-5xl font-medium leading-[64px] tracking-[-2px] capitalize text-white">
                Speaking engagements & testimonials
              </h2>
            </div>
            <div className="relative flex-1 h-full overflow-hidden">
              <div ref={cardsContainerRef} className="relative">
                {loading
                  ? Array.from({ length: 3 }).map(renderSkeletonCard)
                  : engagements.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="w-full h-[344px] bg-white rounded-2xl p-4 mb-10 flex gap-6 shadow-md"
                      >
                        <div className="w-[320px] h-[320px] rounded-[12px] overflow-hidden">
                          <Image
                            src={item.image?.asset?.url || '/fallback.jpg'}
                            alt={item.name}
                            width={320}
                            height={320}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex flex-col justify-center flex-1">
                          <h3 className="text-[36px] font-semibold leading-tight mb-2 text-black">
                            {item.name}
                          </h3>
                          <p className="text-[20px] leading-snug text-gray-700">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden py-10">
        <Container>
          <h2 className="text-[32px] font-medium leading-[40px] tracking-[-1px] text-center mb-10 text-white">
            Speaking engagements & testimonials
          </h2>

          <div>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`mobile-skeleton-${index}`}
                    className="w-full border border-[#ddd] rounded-2xl p-4 mb-8 flex flex-col gap-4"
                  >
                    <Skeleton height={240} borderRadius={12} />
                    <div>
                      <Skeleton height={24} width="50%" className="mb-2" />
                      <Skeleton count={2} height={16} width="100%" />
                    </div>
                  </div>
                ))
              : engagements.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="w-full border border-[#ddd] rounded-2xl p-4 mb-8 flex flex-col gap-4"
                  >
                    <div className="w-full h-[240px] rounded-[12px] overflow-hidden">
                      <Image
                        src={item.image?.asset?.url || '/fallback.jpg'}
                        alt={item.name}
                        width={500}
                        height={240}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-[24px] font-semibold leading-snug mb-1 text-white">
                        {item.name}
                      </h3>
                      <p className="text-[16px] leading-relaxed text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

'use client';

import Container from '@/components/Container';
import { motion } from 'framer-motion'

const CTASection = () => {

  
  return (
    <section className="w-full py-10 md:py-16 bg-white dark:bg-black">
      <Container>
        <div
          className="relative h-[341px] w-full rounded-[16px] overflow-hidden border bg-cover bg-center"
          style={{ backgroundImage: "url('/cta-bg.jpg')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10 rounded-[16px]" />

          {/* Content */}
          <div className="relative z-20 w-full h-full flex items-center justify-center px-4">
            <div className="max-w-[800px] text-center">
              <h2 className="text-white font-darkerGrotesque text-[32px] md:text-[64px] font-medium leading-[100%] mb-6">
                Let's work together
              </h2>
              <p className="text-white font-dmSans text-base md:text-[24px] leading-[140%] tracking-[-0.03em]">
                Whether you're a startup needing legal guidance, a lawyer looking to build your brand, or an organization seeking a speaker, I’m here to help.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;

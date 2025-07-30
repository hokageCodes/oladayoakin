'use client';

import Container from '@/components/Container';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="w-full py-10 md:py-16 bg-white dark:bg-black">
      <Container>
        <div
          className="relative h-full w-full rounded-[16px] overflow-hidden border bg-cover bg-center"
          style={{ backgroundImage: "url('/cta-bg.jpg')" }}
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
                Let’s Elevate Your Impact
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
                <a
                  href="/book" // Replace with actual booking link or route
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition"
                >
                  Book a Consultation
                </a>
                <a
                  href="/contact" // Replace with actual inquiry link or route
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

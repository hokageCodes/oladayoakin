'use client';

import { motion } from 'framer-motion';
import Container from '@/components/Container'; // Adjust path if different

const Awards = () => {
  const awards = [
    {
      title: 'ICONIC BRAND AFRICA – TOP 10 EXCEPTIONAL PROFESSIONALS IN LAW',
      year: '2024',
    },
    {
      title: 'LINKEDIN TOP VOICE IN LEGAL INNOVATION',
      year: '2024',
    },
    {
      title: 'LEGAL INFLUENCER OF THE YEAR – CYBERSECURITY & DATA PRIVACY',
      year: '2024',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      className="w-full h-auto md:h-[334px] py-12 md:py-20 bg-white text-black dark:bg-black dark:text-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20 h-full">
          {/* Left Column */}
          <div className="mb-4 md:mb-0 flex items-start md:items-center">
            <motion.h2
              className="text-gray-500 text-sm"
              variants={itemVariants}
            >
              Awards
            </motion.h2>
          </div>

          {/* Right Column - Award List */}
          <div className="flex flex-col justify-center gap-6 w-full">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-2"
                variants={itemVariants}
              >
                <p className="text-black dark:text-white text-sm md:text-base">{award.title}</p>
                <span className="text-gray-500 text-sm md:text-base mt-1 md:mt-0">
                  {award.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
};

export default Awards;

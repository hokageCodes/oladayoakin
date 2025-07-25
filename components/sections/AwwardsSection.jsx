'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Container from '@/components/Container';
import { client } from '@/sanity/lib/client';

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false); // 👈 in-house mount check

  useEffect(() => {
    setHasMounted(true); // ✅ Avoid hydration mismatch
  }, []);

  useEffect(() => {
    async function fetchAwards() {
      const query = `*[_type == "award"] | order(year desc)`;
      const data = await client.fetch(query);
      setAwards(data);
      setLoading(false);
    }

    fetchAwards();
  }, []);

  if (!hasMounted) return null; // 🚫 Prevent SSR mismatch

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="w-full h-auto md:h-[334px] py-12 md:py-20 bg-white text-black dark:bg-black dark:text-white"
      variants={containerVariants}
      initial="hidden"
      whileinview="visible"
      viewport={{ once: true }}
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20 h-full">
          <div className="mb-4 md:mb-0 flex items-start md:items-center">
            <motion.h2
              className="text-gray-500 text-xl"
              variants={itemVariants}
            >
              Awards
            </motion.h2>
          </div>

          <div className="flex flex-col justify-center gap-6 w-full">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-2"
                    >
                      <Skeleton height={20} width="60%" />
                      <Skeleton height={20} width={50} className="mt-1 md:mt-0" />
                    </div>
                  ))
              : awards.map((award) => (
                  <motion.div
                    key={award._id}
                    className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-2"
                    variants={itemVariants}
                  >
                    <p className="text-black dark:text-white text-sm md:text-base">
                      {award.title}
                    </p>
                    <span className="text-gray-500 text-sm md:text-base mt-1 md:mt-0">
                      {award.year}
                    </span>
                  </motion.div>
                ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Awards;

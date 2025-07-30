"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Container from "@/components/Container";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image"; // ✅ corrected import

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [hoveredAward, setHoveredAward] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setHasMounted(true);
    async function fetchAwards() {
      const query = `*[_type == "award"] | order(year desc){ _id, title, year, image }`;
      const data = await client.fetch(query);
      setAwards(data);
      setLoading(false);
    }
    fetchAwards();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!hasMounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-12 md:py-20 bg-white text-black dark:bg-black dark:text-white relative">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20 h-full relative">
            <div className="mb-4 md:mb-0 flex items-start md:items-center">
              <motion.h2
                className="text-gray-400 text-xl"
                variants={itemVariants}
              >
                Awards & Recognition
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
                      className="relative group cursor-pointer border-b border-gray-700 pb-2"
                      variants={itemVariants}
                      onMouseEnter={() => setHoveredAward(award)}
                      onMouseLeave={() => setHoveredAward(null)}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <p className="text-black dark:text-white text-sm md:text-base">
                          {award.title}
                        </p>
                        <span className="text-gray-500 text-sm md:text-base mt-1 md:mt-0">
                          {award.year}
                        </span>
                      </div>

                      {/* Mobile preview image */}
                      {/* Always show image on mobile */}
                      <div className="md:hidden mt-4 w-full h-64 rounded-lg overflow-hidden">
                        <img
                          src={urlFor(award.image).url()}
                          alt={award.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                    </motion.div>
                  ))}
            </div>

            {/* Floating desktop image preview */}
            {hoveredAward?.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:block fixed z-50 w-[280px] h-[340px] rounded-xl overflow-hidden pointer-events-none border border-white/10"
                style={{ top: mousePos.y + 20, left: mousePos.x + 20 }}
              >
                <img
                  src={urlFor(hoveredAward.image).url()}
                  alt={hoveredAward.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Awards;

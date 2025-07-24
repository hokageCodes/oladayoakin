'use client';
import Image from 'next/image';
import Container from '../Container';

const projects = [
  {
    title: '#20DayLinkedInChallengeWithHaoma',
    desc: 'A game-changer for my LinkedIn growth and engagement.',
    image: '/p1.jpg',
  },
  {
    title: 'LinkedIn Live Sessions',
    desc: 'Personal Branding & Visibility for Lawyers and other thought leadership discussions.',
    image: '/p1.jpg',
  },
  {
    title: 'Threat Intelligence Project (Safe Haven)',
    desc: 'Conducted an in-depth analysis on cybersecurity threats as part of my professional development.',
    image: '/p1.jpg',
  },
  {
    title: 'Upcoming LinkedIn Video Series (April 2025)',
    desc: 'Breaking into Cybersecurity Law, Data Privacy & GRC.',
    image: '/p1.jpg',
  },
];

export default function ProjectsSection() {
  return (
    <section className="w-full bg-white dark:bg-black py-20">
      <Container>
        <p className="text-sm font-medium text-black dark:text-white mb-10">
          • Projects & Collaborations
        </p>

        <div
          className="
            w-full
            bg-white dark:bg-neutral-950
            rounded-2xl
            border border-neutral-200 dark:border-neutral-800
            px-4 sm:px-8 py-10
            flex flex-wrap
            justify-between
            gap-y-10 gap-x-4
          "
        >
          {projects.map((proj, index) => (
            <div
              key={index}
              className="
                w-full sm:w-[48%]
                max-w-[592px]
                p-4 sm:p-6
                rounded-xl
                border border-neutral-200 dark:border-neutral-800
                flex flex-col gap-6 sm:gap-8
                mx-auto
              "
            >
              <div className="w-full h-64 sm:h-[500px] relative rounded-xl overflow-hidden">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 592px"
                  priority
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  {proj.title}
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">
                  {proj.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

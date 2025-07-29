'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '../../sanity/lib/client';
import Container from '../Container';

const PROJECTS_QUERY = `*[_type == "project"]{
  _id,
  title,
  description,
  image {
    asset -> {
      url
    }
  }
}`;

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch(PROJECTS_QUERY);
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section id="whatido" className="w-full bg-white dark:bg-black py-20">
      <Container>
        <p className="text-xl font-medium text-black dark:text-white mb-10">
          • Projects & Collaborations
        </p>

        {loading ? (
          <div className="w-full bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-4 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6 sm:gap-8 animate-pulse"
                >
                  <div className="w-full h-64 sm:h-[500px] bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                  <div className="flex flex-col gap-3">
                    <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded" />
                    <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded" />
                    <div className="h-4 w-5/6 bg-neutral-100 dark:bg-neutral-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-neutral-700 dark:text-neutral-400 text-lg mt-10">
            🚧 No projects have been published yet.
            <br />
            Stay tuned for upcoming work!
          </div>
        ) : (
          <div className="w-full bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="p-4 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6 sm:gap-8">
      <div className="w-full h-64 sm:h-[500px] relative rounded-xl overflow-hidden">
        <Image
          src={project.image?.asset?.url || '/fallback.jpg'}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-lg font-semibold text-black dark:text-white">
          {project.title}
        </h4>
        <p className="text-sm text-neutral-700 dark:text-neutral-400">
          {project.description}
        </p>
      </div>
    </div>
  );
}

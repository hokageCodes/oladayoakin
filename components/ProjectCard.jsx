'use client';

import Image from 'next/image';

export default function ProjectCard({ project, priority = false }) {
  const imageUrl = project.image?.asset?.url || '/fallback.jpg';
  const blurDataURL = project.image?.asset?.metadata?.lqip || '';

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-6 sm:gap-8">
      <div className="w-full h-64 sm:h-[500px] relative rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          className="object-cover"
          width={800}
          height={500}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {project.title}
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-400">
          {project.description}
        </p>
      </div>
    </div>
  );
}

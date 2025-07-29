// lib/portableTextComponents.tsx
import { CheckCircle } from 'lucide-react';

const BulletIcon = () => (
  <CheckCircle className="text-yellow-400 w-4 h-4 mt-1 shrink-0" />
);

export const portableTextComponents = {
  list: {
    bullet: ({ children }) => (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 list-none">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2">
        <BulletIcon />
        <span>{children}</span>
      </li>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
    ),
  },
};

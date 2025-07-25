import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import project from './schemas/project';
import engagement from './schemas/engagement'; // ✅ Make sure this is imported
import testimonial from './schemas/testimonial';
import award from './schemas/award';
import about from './schemas/about';

export default defineConfig({
  name: 'default',
  title: 'the-cyber-lawyer',

  projectId: 'uav1wrmc',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [project, engagement, testimonial, award, about],
  },
});

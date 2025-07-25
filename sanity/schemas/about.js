// schemas/about.js
export default {
    name: 'about',
    type: 'document',
    title: 'About Section',
    fields: [
      {
        name: 'heading',
        type: 'string',
        title: 'Heading',
      },
      {
        name: 'contentLeft',
        type: 'array',
        title: 'Content Left',
        of: [{ type: 'text' }],
      },
      {
        name: 'contentRight',
        type: 'array',
        title: 'Content Right',
        of: [{ type: 'text' }],
      },
    ],
  };
  
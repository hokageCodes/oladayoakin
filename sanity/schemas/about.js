export default {
  name: 'about',
  type: 'document',
  title: 'About Section',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contentLeft',
      title: 'Intro (Left Side)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'contentRight',
      title: 'What I Offer (Right Side)',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};

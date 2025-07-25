export default {
    name: 'engagement',
    title: 'Speaking Engagement',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Event Name',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'image',
        title: 'Event Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'link',
        title: 'Event Link',
        type: 'url',
      },
    ],
  };
  
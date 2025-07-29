const award = {
  name: 'award',
  title: 'Awards',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Award Title',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Award Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

export default award;

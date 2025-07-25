const project = {
    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Project Title',
        type: 'string',
        validation: (Rule) => Rule.required().min(3),
      },
      {
        name: 'description',
        title: 'Project Description',
        type: 'text',
        validation: (Rule) => Rule.required().min(10),
      },
      {
        name: 'image',
        title: 'Project Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
    ],
  };
  
  export default project;
  
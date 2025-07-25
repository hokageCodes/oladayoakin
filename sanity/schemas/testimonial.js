// /sanity/schemas/testimonial.js
export default {
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'text',
        title: 'Testimonial Text',
        type: 'text',
      },
      {
        name: 'title',
        title: 'Job Title',
        type: 'string',
      },
    ],
  };
  
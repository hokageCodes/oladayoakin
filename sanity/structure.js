// sanity/structure.js
import {StructureBuilder} from 'sanity/desk'

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('project'),
      S.documentTypeListItem('engagement'),
      S.documentTypeListItem('testimonial'),
      S.documentTypeListItem('award'),
      S.documentTypeListItem('about'),
    ])

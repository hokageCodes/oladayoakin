export const engagementsQuery = `*[_type == "engagement"] | order(_createdAt desc) {
    _id,
    name,
    description,
    link,
    image {
      asset -> {
        url
      }
    }
  }`;
  
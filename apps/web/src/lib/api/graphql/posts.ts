import { META } from './meta';

export const POSTS = `
  query Posts {
    Posts(limit: 300) {
      docs {
        slug
        title
        image {
          url
          alt
        }
        content
        createdAt
        publishedAt
        tags {
          title
        }
        authors {
          name
        }
      }
    }
  }
`;

export const POST = `
  query Post($slug: String, $draft: Boolean) {
    Posts(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        slug
        title
        content
        image {
          url
          alt
        }
        tags {
          title
        }
        createdAt
        publishedAt
        populatedAuthors {
          id
          name
        }
        relatedPosts {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`;

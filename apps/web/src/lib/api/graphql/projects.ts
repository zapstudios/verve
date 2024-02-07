
import { META } from './meta';

export const PROJECTS = `
  query Projects {
    Projects(limit: 300) {
      docs {
        slug
        title
        createdAt
        image {
          url
          alt
        }
        categories {
          title
        }
      }
    }
  }
`;

export const PROJECT = `
  query Project($slug: String, $draft: Boolean) {
    Projects(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        slug
        categories {
          title
        }
        createdAt
        hero {
          type
          title
          teaser {
            label
          }
        }
        layout {
          
        }
        ${META}
      }
    }
  }
`;

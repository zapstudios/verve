import {
  SUBHEADER,
  TEASER,
  GROUP,
  CLIENT_LIST,
  STATS,
  PORTFOLIO_ARCHIVE,
  JOURNAL_ARCHIVE,
  SELECTED_PROJECTS,
  SERVICES_GRID,
  SLOT_MACHINE,
  FORM_BLOCK
} from './blocks';
import { LINK_FIELDS } from './link';
import { MEDIA } from './media';
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
          ${TEASER}
          ${SUBHEADER}
          ${STATS}
          ${GROUP}
          ${PORTFOLIO_ARCHIVE}
          ${JOURNAL_ARCHIVE}
          ${SELECTED_PROJECTS}
          ${SERVICES_GRID}
          ${SLOT_MACHINE}
          ${FORM_BLOCK}
        }
        ${META}
      }
    }
  }
`;

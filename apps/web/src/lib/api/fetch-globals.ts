import { GRAPHQL_API_URL } from './shared';
import { FOOTER_QUERY, HEADER_QUERY, SETTINGS_QUERY } from './graphql/globals';

/**
 * Represents valid keys for global collections.
 * @typedef {'header' | 'footer' | 'settings'} CollectionKey
 */
type CollectionKey = 'header' | 'footer' | 'settings';

/**
 * Mapping object associating each global collection key with its GraphQL query and key for data access.
 * @type {Record<CollectionKey, { query: string; key: string }>}
 */
const queryMap: Record<CollectionKey, { query: string; key: string }> = {
  header: {
    query: HEADER_QUERY,
    key: 'Header'
  },
  footer: {
    query: FOOTER_QUERY,
    key: 'Footer'
  },
  settings: {
    query: SETTINGS_QUERY,
    key: 'Settings'
  }
};

/**
 * Asynchronously fetches global data (like header, footer, or settings) from the GraphQL API.
 * @template T The expected return type.
 * @param {Object} args - The arguments for the fetch function.
 * @param {CollectionKey} args.collection - The collection to fetch from.
 * @param {string} [args.slug] - The slug of the item to fetch.
 * @param {string} [args.id] - The ID of the item to fetch.
 * @param {boolean} [args.draft] - Flag to indicate if draft items should be fetched.
 * @returns {Promise<T>} - A promise resolving to the fetched data.
 * @throws {Error} - Throws an error if the collection is not found or if there are errors in the GraphQL response.
 */
export const fetchGlobals = async <T>(args: {
  collection: CollectionKey;
  slug?: string;
  id?: string;
  draft?: boolean;
}): Promise<T> => {
  const { collection, slug, draft } = args || {};

  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`);

  let token: string | undefined;

  if (draft) {
    // Implement your logic to retrieve the token, possibly from cookies or a store.
    token = getPayloadToken(); // This is a placeholder function.
  }

  const doc: T = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && draft ? { Authorization: `JWT ${token}` } : {})
    },
    body: JSON.stringify({
      query: queryMap[collection].query
    })
  })
    ?.then((res) => {
      if (!res.ok) throw new Error('Error fetching doc');
      return res.json();
    })
    ?.then((res) => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching header');
      return res.data?.[queryMap[collection].key];
    });

  return doc;
};

/**
 * Placeholder function for retrieving an authentication token.
 * Implement this function based on your application's authentication logic.
 * @returns {string} - The authentication token.
 */
function getPayloadToken() {
  // Your token retrieval logic
  return ''; // Return the token
}

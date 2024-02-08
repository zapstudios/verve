import { PAGE } from "$lib/api/graphql/pages";
import { GRAPHQL_API_URL } from "./shared";

/**
 * Represents valid keys for collections.
 * @typedef {'pages'} CollectionKey
 */

type CollectionKey = "pages";

/**
 * Mapping of collection keys to their GraphQL queries and keys for data access.
 */
const queryMap: Record<CollectionKey, { query: string; key: string }> = {
  pages: {
    query: PAGE,
    key: "Pages",
  },
};

interface FetchDocArgs {
  collection: CollectionKey;
  slug?: string;
  id?: string;
  draft?: boolean;
}

/**
 * Fetches a document from the GraphQL API.
 * @template T
 * @param {Object} args - The arguments for the fetch.
 * @param {CollectionKey} args.collection - The collection to fetch from.
 * @param {string} [args.slug] - The slug of the document to fetch.
 * @param {string} [args.id] - The ID of the document to fetch.
 * @param {boolean} [args.draft] - Whether to fetch draft documents.
 * @returns {Promise<T>} - A promise that resolves to the fetched document.
 * @throws Will throw an error if the collection is not found or if there are errors in the GraphQL response.
 */
export const fetchDoc = async <T>({ collection, slug = "home", draft }: FetchDocArgs): Promise<T> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`);

  let token: string | undefined;

  if (draft) {
    // Implement your logic to retrieve the token, possibly from cookies or a store.
    token = getPayloadToken(); // This is a placeholder function.
  }

  const doc: T = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && draft ? { Authorization: `JWT ${token}` } : {}),
    },
    cache: "no-store",
    body: JSON.stringify({
      query: queryMap[collection].query,
      variables: {
        slug: !slug.length ? "home" : slug,
        draft,
        length: 3,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? "Error fetching doc");
      return res?.data?.[queryMap[collection].key]?.docs?.[0];
    });

  return doc;
};

/**
 * Placeholder function for retrieving an authentication token.
 * Implement based on your app's authentication logic.
 * @returns {string} - The retrieved token.
 */
function getPayloadToken() {
  // Your token retrieval logic
  return ""; // Return the token
}

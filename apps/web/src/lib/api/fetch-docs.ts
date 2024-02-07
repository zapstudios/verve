import { PAGES } from "$lib/api/graphql/pages";
import { POSTS } from "$lib/api/graphql/posts";
import { PROJECTS } from "$lib/api/graphql/projects";
import { CATEGORIES } from "./graphql/categories";
import { GRAPHQL_API_URL } from "./shared";

/**
 * Type for valid collection keys.
 * @typedef {'pages' | 'posts' | 'projects'} CollectionKey
 */
type CollectionKey = "pages" | "categories";

/**
 * Record mapping collection keys to their respective GraphQL queries and keys.
 * @type {Record<CollectionKey, { query: string; key: string }>}
 */
const queryMap: Record<CollectionKey, { query: string; key: string }> = {
  pages: {
    query: PAGES,
    key: "Pages",
  },
  categories: {
    query: CATEGORIES,
    key: "Categories",
  },
};

/**
 * Asynchronously fetches documents from a specified collection in the GraphQL API.
 * @template T The type of the returned array elements.
 * @param {CollectionKey} collection - The collection from which to fetch documents.
 * @param {boolean} [draft=false] - Flag to indicate if draft documents should be fetched.
 * @param {Record<string, unknown>} [variables={}] - Additional variables for the GraphQL query.
 * @returns {Promise<T[]>} - A promise resolving to an array of documents.
 * @throws {Error} - Throws an error if the collection is not found or if there are errors in the GraphQL response.
 */
export const fetchDocs = async <T>(
  collection: CollectionKey,
  draft?: boolean,
  variables?: Record<string, unknown>
): Promise<T[]> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`);

  let token: string | undefined;

  if (draft) {
    // Implement your logic to retrieve the token, possibly from cookies or a store.
    token = getPayloadToken(); // This is a placeholder function.
  }

  const response = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && draft ? { Authorization: `JWT ${token}` } : {}),
    },
    body: JSON.stringify({
      query: queryMap[collection].query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result?.errors?.[0]?.message ?? "Error fetching docs");
  }

  return result?.data?.[queryMap[collection].key]?.docs;
};

/**
 * Placeholder function for retrieving an authentication token.
 * Implement this function based on your application's authentication logic.
 * @returns {string} - The authentication token.
 */
function getPayloadToken() {
  // Your token retrieval logic
  return ""; // Return the token
}

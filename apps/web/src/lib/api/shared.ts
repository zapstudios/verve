import { env } from "$env/dynamic/public";

/**
 * Constructs the GraphQL API URL based on environment variables.
 *
 * - If `NEXT_BUILD` environment variable is set, it indicates a build environment.
 *   In this case, the API URL is set to the localhost address with the specified `PORT` or defaults to 3000.
 * - Otherwise, it uses `NEXT_PUBLIC_SERVER_URL`, typically used for production or development environments.
 *
 * @type {string} The GraphQL API URL.
 */
export const GRAPHQL_API_URL = process.env.NEXT_BUILD
  ? `http://127.0.0.1:${env.PUBLIC_PORT || 3000}` //
  : env.PUBLIC_PAYLOAD_SERVER_URL;

import type { Page } from "cms/types";
import { fetchDoc } from "$lib/api";
import { logger } from "$lib/utils/logger.js";

export const load = async ({ params }) => {
  const { slug } = params;

  let page: Page | null = null;

  try {
    page = await fetchDoc<Page>({ collection: "pages", slug });
  } catch (error) {
    logger.error({ message: "Failed to fetch page", error });
  }

  return { page };
};

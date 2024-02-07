import type { Page } from "cms/types";
import { fetchDoc } from "$lib/api";

export const load = async ({ params }) => {
  const { slug } = params;

  let page: Page | null = null;

  try {
    page = await fetchDoc<Page>({ collection: "pages", slug });
  } catch (error) {
    console.log("error");
  }

  return { page };
};

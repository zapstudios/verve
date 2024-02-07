import type {} from "cms/types";
import { fetchGlobals } from "$lib/api";
import { error } from "@sveltejs/kit";

export const load = async ({ url }) => {
  // let header: Header | null = null;

  try {
    // header = await fetchGlobals<Header>({ collection: "header", id: "header" });
  } catch (e) {
    console.log(e);
    error(500);
  }

  return {
    propsFromLayout: { pathname: url.pathname },
  };
};

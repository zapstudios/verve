import { Field } from "payload/types";
import { hero } from "./hero";
import { welcome } from "../blocks/welcome";

/**
 * Import all blocks configs from the blocks/config package
 *
 * e.g.:
 * import { BlockConfig } from "@repo/blocks/config";
 *
 * run `pnpm generate:block` in the root dir to create a new block
 */

const blocks = [welcome];

export const tabsHeroLayout: Field = {
  type: "tabs",
  tabs: [
    {
      label: "Hero",
      name: "hero",
      fields: [...hero],
    },
    {
      label: "Content",
      fields: [
        {
          name: "layout",
          type: "blocks",
          required: true,
          blocks,
        },
      ],
    },
  ],
};

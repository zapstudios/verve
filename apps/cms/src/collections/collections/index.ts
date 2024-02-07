import { SlugField } from "@nouance/payload-better-fields-plugin";
import type { CollectionConfig } from "payload/types";

export const collections: CollectionConfig = {
  slug: "collection",
  labels: {
    singular: "Collection",
    plural: "Collection",
  },
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    ...SlugField(
      {
        name: "slug",
        admin: {
          position: "sidebar",
        },
      },
      {
        useFields: ["title"],
      }
    ),
    {
      name: "medias",
      label: "Medias",
      type: "array",
      fields: [
        {
          name: "media",
          label: "Media",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

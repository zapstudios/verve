import type { CollectionConfig } from "payload/types";
import { slugField } from "../../fields/slug";

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
    slugField(),
  ],
};

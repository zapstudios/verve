import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import { adminsOrPublished } from "../../access/adminsOrPublished";
import { revalidatePage } from "./hooks/revalidatePage";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { slugField } from "../../fields/slug";
import { tabsHeroLayout } from "../../fields/tabs-hero-layout";

export const pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== "home" ? doc.slug : ""}`
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`;
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    // afterChange: [revalidatePage],
    // afterRead: [populateArchiveBlock],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    tabsHeroLayout,
    slugField(),
  ],
};

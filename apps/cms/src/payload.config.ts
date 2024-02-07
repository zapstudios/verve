import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import FormBuilder from "@payloadcms/plugin-form-builder";
import nestedDocs from "@payloadcms/plugin-nested-docs";
import seo from "@payloadcms/plugin-seo";
import type { GenerateTitle } from "@payloadcms/plugin-seo/dist/types";
import { formBuilderFieldsConfig } from "./fields/formbuilder";
import { users } from "./collections/users";
import { categories } from "./collections/categories";
import { media } from "./collections/media";
import { pages } from "./collections/pages";
import { collections } from "./collections/collections";

const generateTitle: GenerateTitle = () => {
  return "My Website";
};

const clientUrls = ["http://localhost:5173", process.env.PAYLOAD_PUBLIC_SERVER_URL];

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: { user: users.slug, bundler: webpackBundler() },
  routes: {
    api: `/api`,
    admin: `/admin`,
    graphQL: `/graphql`,
    graphQLPlayground: `/graphql-playground`,
  },
  cors: clientUrls,
  csrf: clientUrls,
  editor: slateEditor({}),
  collections: [pages, categories, collections, media, users],
  typescript: {
    declare: false,
    outputFile: path.resolve(__dirname, "../../../packages/payload/types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "../../../packages/payload/schema.graphql"),
  },
  plugins: [
    payloadCloud(),
    // FormBuilder({ fields: formBuilderFieldsConfig }),
    nestedDocs({
      collections: ["categories"],
    }),
    seo({ collections: ["pages"], generateTitle, uploadsCollection: "media" }),
  ],
  db: mongooseAdapter({ url: process.env.DATABASE_URI }),
});

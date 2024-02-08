import path from "path";

import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import nestedDocs from "@payloadcms/plugin-nested-docs";
import seo from "@payloadcms/plugin-seo";
import type { GenerateTitle } from "@payloadcms/plugin-seo/dist/types";
import { media } from "./collections/media";
import { pages } from "./collections/pages";
import { users } from "./collections/users";

const generateTitle: GenerateTitle = ({ doc: { title } }: any) => title.value;

const clientUrls = ["http://localhost:5173", ...String(process.env.PAYLOAD_PUBLIC_SERVER_URL).split(",")];

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
  collections: [pages, media, users],
  typescript: {
    declare: false,
    outputFile: path.resolve(__dirname, "./payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "./payload-schema.graphql"),
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

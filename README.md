![alt text](./verve-preview.jpg)

<div align="center" style="margin-bottom: 48px;">

![](https://img.shields.io/badge/pnpm-black?style=for-the-badge&logo=pnpm)
![](https://img.shields.io/badge/turborepo-black?style=for-the-badge&logo=turborepo)
![](https://img.shields.io/badge/payloadcms-black?style=for-the-badge&logo=payloadcms)
![](https://img.shields.io/badge/sveltekit-black?style=for-the-badge&logo=svelte)

<h1 style="border: none !important;">verve :: starter kit</h1>

Pre-configured Starter Kit with PayloadCMS and SvelteKit. <br />
Designed to be a starting point for new projects, with a few common features already set up and ready to go.

</div>

<br />
<br />
<br />
<br />
<br />

### Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
  - [PayloadCMS](#payloadcms)
  - [SvelteKit](#sveltekit)
- [Development](#development)
  - [Workflows](#workflows)
    - [Adding a new block](#adding-a-new-block)
- [Deployment](#deployment)
- [License](#license)

<br />
<br />

## Features

- **SvelteKit** - A framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.
- **PayloadCMS** - A headless CMS that's easy to use, powerful, and flexible. It's designed to be a developer's best friend.
- **TurboRepo** - A monorepo tool that makes it easy to manage multiple packages and projects with a single configuration.
- **PNPM** - A fast, disk space efficient package manager that uses hard links and symlinks to save space.
- **TailwindCSS** - A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.
- **PostCSS** - A tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.
- **ESLint** - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.
- **Prettier** - An opinionated code formatter that enforces a consistent code style across your entire codebase.

<br />
<br />

## Getting Started

To initiate the project setup, clone or fork this repository. Then, install the necessary dependencies and set up the environment as follows:

```bash
git clone https://github.com/zapstudios/verve.git
cd verve
pnpm install
```

<br />
<br />

## Configuration

Initial configuration is straightforward. Follow the steps below to prepare your development environment:

<br />

### PayloadCMS

Set up your PayloadCMS project by configuring the necessary environment variables located in the `.env` file. Start by renaming .`env.example` in `apps/cms` to `.env` and populate it with your specific details:

- `DATABASE_URI` - The connection string for your MongoDB database.
- `PAYLOAD_SECRET` - A secret key for encrypting and decrypting data.
- `PAYLOAD_PUBLIC_SERVER_URL` - The public URL for your PayloadCMS server. (default is `http://localhost:3000`)

<br />

### SvelteKit

Similar to PayloadCMS, configure SvelteKit's environment variables found in the `.env` file. Rename `.env.example` in `apps/web` to `.env` and input your details:

- `PAYLOAD_PUBLIC_SERVER_URL` - The public URL for your PayloadCMS server. (default is `http://localhost:3000`)

<br />
<br />

## Development

Kickstart the development servers for both CMS and site by running:

```bash
pnpm dev
```

This command launches the development server for the CMS accessible at `http://localhost:3000` and the site at `http://localhost:5173`.

<br />

### Workflows

<br />

#### Adding a new block

To introduce a new block into the CMS:

1. In `apps/cms/src/blocks`, create a file named `text-block.ts`.
   <br />

2. Populate the file with the following template code:

```typescript
// apps/cms/src/blocks/text-block.ts

import { Block } from "payload/types";

export const textBlock: Block = {
  slug: "text-block",
  labels: {
    singular: "Text Block",
    plural: "Text Blocks",
  },
  fields: [],
};
```

<br />

3. Include this block in your chosen layout. For demonstration, add it to `tabs-hero-layout`.

```typescript
// apps/cms/src/fields/tabs-hero-layout.ts

import { textBlock } from "../blocks/text-block";

const blocks = [, /* other blocks */ textBlock];
```

<br />

4. Create a corresponding Svelte component in `apps/web/src/lib/components/blocks`, for example, `text-block.svelte`.
   <br />

5. Implement the block component as required. Example:

```svelte
<!-- apps/web/src/lib/components/blocks/text-block.svelte -->

<script lang="ts">
  import type { Page } from "cms/types";

  type Props = Extract<Page["layout"][0], { blockType: "textBlock" }>;

  // Typesafe way to get the content of the block
  const { content } = $$props as Props;
</script>

<div class="text-block">
  <p>{content}</p>
</div>
```

<br />

6. Register the new block in the Barrel file `apps/web/src/lib/components/blocks/index.ts`:

```typescript
// apps/web/src/lib/components/blocks/index.ts

export { default as TextBlock } from "./text-block.svelte";
```

<br />

7. Define the GraphQL query for the block in `apps/web/src/lib/api/graphql/blocks.ts` and incorporate it into the page layout query within `apps/web/src/lib/api/graphql/pages.ts`.

```typescript
// apps/web/src/lib/api/graphql/blocks.ts

export const TEXT_BLOCK = `
    ...on TextBlock {
        content
    }
`;
```

```typescript
// apps/web/src/lib/api/graphql/pages.ts

import { TEXT_BLOCK } from "./blocks";

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        ...
        layout {
          ...
          ${TEXT_BLOCK}
        }
      }
    }
  }
`;
```

<br />

8. Your block is now ready for use within the CMS. Add a new page,

<br />
<br />

## Deployment

Deployment instructions will be provided soon. Stay tuned for updates.

<br />
<br />

## License

his project is distributed under the GPL-3.0 License. For more details, please refer to the [LICENSE](LICENSE) document included in this repository.

This license grants you the freedom to modify, distribute, and use the software for both private and commercial purposes under the conditions that any modifications or derivative works are also bound by the same license and that you include proper attribution to the original authors.

By using, distributing, or contributing to this project, you agree to abide by the terms set forth in the GPL-3.0 License.

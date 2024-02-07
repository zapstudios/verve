import type { PlopTypes } from "@turbo/gen";

const turbo_root_path = "{{ turbo.paths.root }}";
const src_path = "packages/blocks/src";
const exporters_path = "packages/blocks";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("block", {
    description: "Creates a new block basically ready to use in Payload to build out.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component? (kebap case)",
      },
    ],
    // perform actions based on the prompts
    actions: [
      {
        type: "add",
        path: `${turbo_root_path}/${src_path}/{{ name }}/{{ name }}.svelte`,
        templateFile: "templates/block.hbs",
      },
      {
        type: "add",
        path: `${turbo_root_path}/${src_path}/{{ name }}/config.ts`,
        templateFile: "templates/config.hbs",
      },
      {
        type: "add",
        path: `${turbo_root_path}/${src_path}/{{ name }}/graphql.ts`,
        templateFile: "templates/graphql.hbs",
      },
      {
        type: "add",
        path: `${turbo_root_path}/${src_path}/{{ name }}/index.ts`,
        template: "export { default as {{ pascalCase name }} } from './{{ name }}.svelte'",
      },
      {
        type: "append",
        path: `${turbo_root_path}/${exporters_path}/blocks.ts`,
        template:
          "export { default as {{ pascalCase name }} } from './src/{{ name }}/{{ name }}.svelte'",
      },
      {
        type: "append",
        path: `${turbo_root_path}/${exporters_path}/config.ts`,
        template: "export { {{ pascalCase name }}Config } from './src/{{ name }}/config'",
      },
      {
        type: "append",
        path: `${turbo_root_path}/${exporters_path}/graphql.ts`,
        template: "export { {{ upperCase name }} } from './src/{{ name }}/graphql'",
      },
    ],
  });
}

import type { Field } from "payload/types";

export const hero: Field[] = [
  {
    type: "select",
    name: "type",
    label: "Type",
    required: true,
    defaultValue: "subPageHeader",
    options: [
      {
        label: "None",
        value: "none",
      },
      {
        label: "Landing Page Header",
        value: "landingPageHeader",
      },
      {
        label: "Sub Page Header",
        value: "subPageHeader",
      },
    ],
  },
  {
    type: "text",
    name: "title",
    admin: {
      condition: (_, { type } = {}) => type !== "none",
    },
  },
];

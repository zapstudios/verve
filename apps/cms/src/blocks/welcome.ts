import { Block } from "payload/types";

export const welcome: Block = {
  slug: "welcome",
  labels: {
    singular: "Welcome",
    plural: "Welcomes",
  },
  fields: [
    {
      name: "message",
      label: "Message for the Client",
      type: "text",
    },
  ],
};

import type { RichTextCustomElement } from "@payloadcms/richtext-slate/dist/types";

import Button from "./Button";
import Element from "./Element";

const richTextLabel: RichTextCustomElement = {
  name: "label",
  Button,
  Element,
};

export default richTextLabel;

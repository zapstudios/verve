import type { RichTextCustomElement } from "@payloadcms/richtext-slate/dist/types";

import Button from "./Button";
import Element from "./Element";

const richTextLargeBody: RichTextCustomElement = {
  name: "large-body",
  Button,
  Element,
};

export default richTextLargeBody;

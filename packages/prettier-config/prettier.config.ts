import { type Config } from "prettier";
// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config: Config = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};

export default config;

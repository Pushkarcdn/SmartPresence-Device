import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        secondary: ["avenue", "sans-serif"],
      },

      colors: {
        primary: "#0295A9",
        primaryDark: "#135c66",
        secondary: "#e3b409",
        bgcolor: "#f1f1f1",
        whitish: "#F1F1F1",
        greyish: "#F2F2F2",
        blackish: "#323232",
        brownish: "#686868",
        faded: "#CCCCCC",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e, postcss }: any) {
      addVariant("firefox", ({ container, separator }: any) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule: any) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};
export default config;

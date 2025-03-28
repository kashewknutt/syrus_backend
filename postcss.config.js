const prefixOverrideList = ["html", "body", ":root"];

const env = process.env.NODE_ENV;
const isDev = env === "development";

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(!isDev && {
      "postcss-prefix-selector": {
        prefix: `#samuel-container .${process.env.WIDGET_GROUP_ID}`,
        transform: (prefix, selector, prefixedSelector, _filePath, _rule) => {
          if (prefixOverrideList.includes(selector)) {
            return prefix;
          }
          return prefixedSelector;
        },
      },
    }),
  },
};

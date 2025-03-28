import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const generateRandomId = () => {
  return `widget-${Math.random().toString(36).replace("0.", "")}${Math.round(
    Math.random() * 100
  )}`;
};

// https://vite.dev/config/
export default ({ mode }: any) => {
  const WIDGET_GROUP_ID = generateRandomId();
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
    WIDGET_GROUP_ID, // this is a unique id for the widget group which is used to scope the tailwind css, this code should not be changed
  };
  return defineConfig({
    plugins: [react(), viteTsconfigPaths(), cssInjectedByJsPlugin()],
    server: { open: true },
    define: {
      "process.env": process.env,
    },
    build: {
      cssCodeSplit: false,
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "index",
        fileName: "index",
      },
      rollupOptions: {
        external: (source) => source.includes("SamuelContainer"),
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "react/jsx-runtime",
          },
        },
      },
    },
  });
};

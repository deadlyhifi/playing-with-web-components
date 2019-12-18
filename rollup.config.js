import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

module.exports = {
  input: "src/main.ts",
  output: {
    file: "dist/bundle.js",
    format: "umd",
    name: "bundle"
  },
  plugins: [babel(), typescript(), resolve()]
};

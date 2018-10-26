import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const input = "./src/index.js";
const external = ['react']

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs"
    },
    external,
    plugins: [
      babel({
        runtimeHelpers: true,
        plugins: ["@babel/transform-runtime"]
      }),
      nodeResolve()
    ]
  },
  {
    input,
    output: {
      file: pkg.module,
      format: "esm"
    },
    external,
    plugins: [
      babel({
        runtimeHelpers: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]]
      }),
      nodeResolve()
    ]
  }
];

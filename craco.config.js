const path = require("path");
const CracoLessPlugin = require("craco-less");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  babel: {
    plugins: [
      //第一个 style 为 true ,需要配置 craco-less一起才能生效
      ["import", { libraryName: "antd", style: true }],
      //第二种 style 为css ,不需要 craco-less
      // ['import', { libraryName: 'antd', libraryDirectory: 'es', style: "css" }],
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
  },
};

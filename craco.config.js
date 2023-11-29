const path = require("path");
const CracoLessPlugin = require("craco-less");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  babel: {
    plugins: [
      //第一个 style 为 true ,需要配置 craco-less一起才能生效
      ["import", { libraryName: "antd", style: false }],
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
    plugins: [
      // 添加 React Refresh 插件
      new ReactRefreshWebpackPlugin(),
      // 添加代码编辑器样式
      new MonacoWebpackPlugin({
        languages: ["sql", "json", "java", "typescript"],
      }),
    ],
    configure: (webpackConfig) => {
      // 找到 babel-loader 的配置
      const babelLoader = webpackConfig.module.rules.find(
        (rule) =>
          rule.use &&
          rule.use.loader &&
          rule.use.loader.includes("babel-loader")
      );

      // 启用 react-refresh/babel 插件
      if (babelLoader) {
        babelLoader.use.options.plugins.push(
          require.resolve("react-refresh/babel")
        );
      };

      // 添加path-browserify作为解析path模块的polyfill
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        path: require.resolve("path-browserify"),
        fs:false
      };

      // webpack 在处理以 "sql-wasm.js" 结尾的文件时，将其视为 JavaScript
      webpackConfig.module.rules.push({
        test: /sql-wasm\.js$/,
        type: 'javascript/auto',
      });
    

      return webpackConfig;
    },
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
  },
};

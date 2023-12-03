const path = require("path");
const CracoLessPlugin = require("craco-less");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// 引入分析打包结果插件
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require('terser-webpack-plugin');

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
    optimization: {
      // ...
      splitChunks: { // 分隔代码
        cacheGroups: {
          vendors: { // 提取node_modules代码
            test: /node_modules/, // 只匹配node_modules里面的模块
            name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
            minChunks: 1, // 只要使用一次就提取出来
            chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
            minSize: 0, // 提取代码体积大于0就提取出来
            priority: 1, // 提取优先级为1
          },
          commons: { // 提取页面公共代码
            name: 'commons', // 提取文件命名为commons
            minChunks: 2, // 只要使用两次就提取出来
            chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
            minSize: 0, // 提取代码体积大于0就提取出来
          }
        }
      }
    },
    caches: {
      type: "filesystem", // 使用文件缓存
    },
    plugins: [
      // 添加 React Refresh 插件
      new ReactRefreshWebpackPlugin(),
      // 添加代码编辑器样式
      new MonacoWebpackPlugin({
        languages: ["sql", "json", "java", "typescript"],
      }),
    ],
    configure: (webpackConfig,{ env, paths }) => {
      if (env === 'production') {
        // 关闭 source map
        webpackConfig.devtool = false;
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
      }

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
      }

      // 添加path-browserify作为解析path模块的polyfill
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        path: require.resolve("path-browserify"),
        fs: false,
      };


      // webpack 在处理以 "sql-wasm.js" 结尾的文件时，将其视为 JavaScript
      webpackConfig.module.rules.push({
        test: /sql-wasm\.js$/,
        type: "javascript/auto",
      });

      // 开启多线程
      webpackConfig.module.rules.push({
        include: [path.resolve(__dirname, "../src")], //只对项目src文件的ts,tsx进行loader解析
        test: /.(ts|tsx)$/,
        use: ["thread-loader", "babel-loader"],
      });

      return webpackConfig;
    },
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
  },
};

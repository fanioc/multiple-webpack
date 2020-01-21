const path = require("path");
const {VueLoaderPlugin} = require("vue-loader");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlPluginConfigure = require('./build/html_scaner').generateHtmlPluginConfigure();
// const EntryIndexConfigure = require('./build/entry_scaner').generateEntryIndexConfigure();
const LoaderRules = require('./build/loader_configure').loader;
const CDNPrefix = "/";

const EntryIndexConfigure = {
  /*TODO::入口配置自动生成*/
  index: path.resolve(__dirname, "./src/pages/index/index.ts"),
  // index: path.resolve(__dirname, "./src/index.js"),
  about: path.resolve(__dirname, "./src/pages/about/index.js"),
};

const HtmlPluginConfigure = [
  /*TODO::Html自动生成*/
  new HtmlWebpackPlugin({
    chunks: ['index'],
    filename: "index.html",
    template: path.resolve(__dirname, "./src/pages/index/index.html"),
    minify: false
  }),
  new HtmlWebpackPlugin({
    chunks: ['about'],
    filename: "about.html",
    template: path.resolve(__dirname, "./src/pages/about/index.html"),
    minify: false
  })
];

module.exports = (env = {}) => {
  /** 动态配置插件 **/
  let plugin = [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: 'css/[id].[contenthash:7].css',
    }),
    ...HtmlPluginConfigure
  ];
  if (env.prod) {
    plugin.push(...[
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, "./public"),
        to: path.resolve(__dirname, "./dist"),
        ignore: ['.*']
      }]),
      new BundleAnalyzerPlugin()
    ])
  }

  /** 导出配置 **/
  return {
    stats: {children: false},
    mode: env.prod ? "production" : "development",
    devtool: env.prod ? undefined : "cheap-module-eval-source-map",
    entry: EntryIndexConfigure,
    output: {
      filename: env.prod ? 'js/[name].[chunkhash:7].js' : 'js/[name].[hash].js',
      chunkFilename: env.prod ? 'js/[name].[chunkhash:7].js' : 'js/[name].[hash].js',
      path: path.resolve(__dirname, "./dist"),
      publicPath: env.prod ? CDNPrefix : "/",
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'initial',
            priority: 2,
            minChunks: 2,
            minSize: 30000,
          },
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        vue$: "vue/dist/vue.esm.js"
      },
      extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".json"]
    },
    module: {
      rules: [...LoaderRules]
    },
    plugins: plugin,
    externals: {
      vue: "Vue",
      react: "React",
      "react-dom": "ReactDOM"
    },
    devServer: {
      inline: true,
      hot: true,
      port: 3000,
      stats: "minimal",
      contentBase: path.resolve(__dirname, './public'),//静态资源请求
      overlay: true
    }
  }
};
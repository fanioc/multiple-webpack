const path = require("path");
const {VueLoaderPlugin} = require("vue-loader");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env = {}) => ({
  mode: env.prod ? "production" : "development",
  devtool: env.prod ? undefined : "cheap-module-eval-source-map",
  entry: {
    /*TODO::入口配置自动生成*/
    main: path.resolve(__dirname, "./src/pages/main.ts"),
    // index: path.resolve(__dirname, "./src/index.js"),
    about: path.resolve(__dirname, "./src/pages/about/index.js"),
  },
  output: {
    filename: env.prod ? 'js/[name].[chunkhash:7].js' : 'js/[name].[hash].js',
    chunkFilename: env.prod ? 'js/[name].[chunkhash:7].js' : 'js/[name].[hash].js',
    path: path.resolve(__dirname, "./dist"),
    //TODO: 添加 CDN
    publicPath: env.prod ? "/" : "/",
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
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      },
      {
        test: /\.(css)$/i,
        use:
          [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {hmr: true}
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader',
          ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {hmr: true}
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[contenthash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {loader: "babel-loader"}//cache-loader
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {loader: "babel-loader"},
          {
            loader: "ts-loader",
            options: {appendTsSuffixTo: [/\.vue$/]}//transpileOnly: true,
          }
        ]
      }, {
        test: /\.tsx$/,
        use: [
          {loader: "babel-loader"},
          {
            loader: "ts-loader",
            options: {appendTsxSuffixTo: [/\.vue$/]}//transpileOnly: true,
          }
        ]

      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: 'css/[id].[contenthash:7].css',
    }),
    /*TODO::Html自动生成*/
    new HtmlWebpackPlugin({
      chunks: ['main'],
      filename: "index.html",
      template: "./src/pages/index.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ['about'],
      filename: "about.html",
      template: "./src/pages/about/index.html"
    }),
    new BundleAnalyzerPlugin()
  ],
  externals: {
    vue: "Vue"
  },
  devServer: {
    inline: true,
    hot: true,
    port: 3000,
    stats: "minimal",
    contentBase: path.resolve(__dirname, './public'),//静态资源请求
    overlay: true
  }
});
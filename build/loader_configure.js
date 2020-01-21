/**
 * loader配置文件
 * @author Fanioc
 */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.loader = [
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
      ],
    sideEffects: true
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
    ],
    sideEffects: true
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
];
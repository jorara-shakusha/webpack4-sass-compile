// 参考:最新版で学ぶwebpack 4入門 - スタイルシート（CSSやSass）を取り込む方法 - ICS MEDIA https://ics.media/entry/17376/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = true;
const path = require('path');
const outputPath = path.resolve(__dirname, './dist');

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    // mode: "production",
    mode: "development",
    // source-map 方式でないと、CSSの元ソースが追跡できないため
    devtool: "source-map",
    entry: {
      main: './src/index.js',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist/css'
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    module: {
      rules: [
        {
          // 対象となるファイルの拡張子
          test: /\.scss/, 
          // Sassファイルの読み込みとコンパイル
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            // CSSをバンドルするための機能
            {
              loader: "css-loader",
              options: {
                // CSS内のurl()メソッドの取り込みを禁止する
                url: false,
                // ソースマップの利用有無
                sourceMap: true,
                // Sass+PostCSSの場合は2を指定
                importLoaders: 2
              }
            },
            // PostCSSのための設定
            {
              loader: "postcss-loader",
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: true,
              }
            },
            // Sassをバンドルするための機能
            {
              loader: "sass-loader",
              options: {
                // ソースマップの利用有無
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
  };
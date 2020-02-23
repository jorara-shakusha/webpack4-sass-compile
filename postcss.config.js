// 参考: https://github.com/postcss/autoprefixer#webpack
// Autoprefixerを有効化
// ベンダープレフィックスを自動付与する
module.exports = {
    plugins: [
      require('autoprefixer')
    ]
}
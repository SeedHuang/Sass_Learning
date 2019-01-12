const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');


function configuration (env, argv) {

  const config = {
    entry: './index.js',
    output: {
      filename: '[name].js',
      path : path.resolve(__dirname, './dist')
    },
    mode: env === 'production' ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(sc|c)ss/,
          use: [
            { loader: (env === 'production' ? MiniCssExtractPlugin.loader : 'style-loader') },
            {
              loader: 'css-loader',
              options: {
                import: true
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [

      new HtmlPlugin({
        template: "./index.html",
        filename: "index.html"
      })
    ]
  };

  if (env === 'production') {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename:'[name].css'
      })
    );
  }
  return config;
};


module.exports = configuration;

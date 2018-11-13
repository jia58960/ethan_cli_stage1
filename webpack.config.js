const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const merge = require('webpack-merge')
const argv = require('yargs-parser')(process.argv.slice(2))
console.log('参数：' + argv.mode)
const env = argv.mode
const isProd = env  === 'production'
const mergeConfig = require(`./config/webpack.${env}.js`)
const baseConfig = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [ {
                loader: MiniCssExtractPlugin.loader,
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                }
            }]
        }]
    },
    devServer: {
        before(app) {
            app.get("/api/test", (req, res) => {
                res.json({
                    code: 200,
                    msg: "Hello World"
                });
            });
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? "[name].[hash:5].css" : "[name].css",
            chunkFilename: isProd ? "[id].[hash:5].css" : "[id].css"
          })
      ]
}
module.exports = merge(baseConfig, mergeConfig)
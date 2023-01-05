const path = require('path')
const {VueLoaderPlugin} = require('vue-loader/dist/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'inline-cheap-module-source-map',
    entry: {
        'index': path.join(__dirname, 'src/index.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                use: ['vue-loader']
            },
            {
                test: /.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            title: 'hello vue',
            filename: 'index.html',
            template: './index.html',
            minify: false,
            inject: false,
            templateParameters: {
                publicPath: path.join(__dirname),
                js: [
                    './node_modules/vue/dist/vue.runtime.global.js', 
                    './index.js'
                ],
                css: [
                    './index.css'
                ]
            }
        })
    ],
    externals: {
        'vue': 'window.Vue'
    },

    devServer: {
        static: {
            directory: path.join(__dirname)
        },
        compress: true,
        port: 2023,
        hot: false
    }
}
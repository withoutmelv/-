const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports={
    mode:'development',

    devtool:'source-map',

    entry:{
        'index':'./src/index.js'
    },

    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].js'
    },

    module:{
        rules:[
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // placeholder 占位符 [name] 源资源模块的名称
                        // [ext] 源资源模块的后缀
                        name: "[name]_[hash].[ext]",
                        //打包后的存放位置
                        outputPath: "./images",
                        // 打包后文件的 url
                        publicPath: '../images',
                        // 小于 100 字节转成 base64 格式
                        limit: 100
                    }
                }
            },

            {
                test: /\.css$/,
                use: [
                    // "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // 启用/禁用 url() 处理
                            url: true,
                            // 启用/禁用 @import 处理
                            import: true,
                            // 启用/禁用 Sourcemap
                            sourceMap: true
                        }
                    }

                ]
            }
        ]
    },

    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'App',
            filename:'index.html',
            template:'./template/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        })
    ],

    devServer:{

    }
}
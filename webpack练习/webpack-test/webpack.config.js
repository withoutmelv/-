const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin')

module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    devServer:{
        contentBase:'./dist',
        hot:true,
        port:3000
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },{
                test:/\.(html|htm)$/,
                use:['html-loader']
            },{
                test:/\.(png|jpg|svg|gif|webp)/,
                use:['file-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'webpack hello html',
            filename:'index.html',
            template:'./src/index.html'
        })
    ]

};
const path=require('path');
const webpack=require('webpack');
const merge=require('webpack-merge');
const common=require('./webpack.config.common.js');

module.exports=merge(common,{
    mode:'development',
    devtool:'cheap-module-eval-source-map',
    module:{
        rules:[

        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,//开启gzip压缩
        port: 8080,
        open:true,
        //progress:true,//显示进度条
        hot:true,
        overlay:true,//错误显示在浏览器上
        //historyApiFallback:true//当访问的路径为404的时候跳转
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]
})
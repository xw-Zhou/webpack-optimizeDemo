
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.config.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',

    module: {
        rules: [

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({//提取css
            filename: 'static/css/[name].css'
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './public'), //定义要拷贝的源目录，必填项
            //to: path.resolve(__dirname, './dist/'), //定义要拷贝到的目标目录，非必填，不填写则拷贝到打包的output输出地址中
        }]),
        new CleanWebpackPlugin(['./static/']),//先删除dist/static目录下的文件,对我们来说只有这个目录和index.html改变的
        new BundleAnalyzerPlugin({ analyzerPort: 8090 }),
    ]
})
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HappyPack = require('happypack');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');//文档:http://npm.taobao.org/package/antd-theme-webpack-plugin
const NODE_ENV=process.env.NODE_ENV;//区分环境
console.log("--------"+NODE_ENV+"-----------");

const options = {//注意，
    antDir: path.join(__dirname, './node_modules/antd'),
    stylesDir: path.join(__dirname, './src/styles/theme'),//指定皮肤文件夹
    varFile: path.join(__dirname, './src/styles/theme/variables.less'),//自己设置默认的主题色
    indexFileName: './public/index.html',
    mainLessFile: path.join(__dirname, './src/styles/theme/index.less'),
    themeVariables: [//要改变的主题变量
        '@primary-color',
        // '@text-color',
        // '@text-color-secondary',
        // '@heading-color',
        // '@layout-body-background',
        // '@btn-primary-bg',
        // '@layout-header-background'
    ],
    generateOnce:false
}

module.exports={
    entry:['./src/index.js'],
    output:{
        filename:'static/js/[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    resolve:{
        modules:[path.resolve(__dirname, "src"), "node_modules"],
        alias:{//别名
            '@':path.resolve(__dirname, 'src'),
            'components':path.resolve(__dirname,'./src/components'),
            'pages':path.resolve(__dirname,'src/pages'),
            'static':path.resolve(__dirname,'src/static'),
            'router':path.resolve(__dirname,'src/router'),
            'styles':path.resolve(__dirname,'src/styles'),
            'utils':path.resolve(__dirname,'src/utils'),
            'store':path.resolve(__dirname,'src/store'),
        },
        //mainFields:['style','main'],//在node_module下先查找style，再查找main
        extensions:['.js','.css','.less'],//import时，不写后缀的时候按顺序查找文件
    },
    optimization:{
        minimizer:[
            new UglifyJsPlugin({//压缩js
                extractComments: false, // 是否将注释单独提出来一个文件
                cache:true,
                parallel:true,// 开启并行压缩，充分利用cpu
                sourceMap: NODE_ENV === "development",
            }),
            new OptimizeCSSAssetsPlugin()//压缩css
        ],
        concatenateModules: true,
        splitChunks:{
            cacheGroups:{
                vendors:{//node_modules里的代码
                    test:/[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    name:'vendors',
                    priority:10,
                    enforce:true //强制生成
                },
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude: '/node_modules/',
                include:path.resolve(__dirname,'src'),
                use:'HappyPack/loader?id=js',
            },
            {
                test:/\.css$/,
                use:'HappyPack/loader?id=css',
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader:NODE_ENV==="production" ? MiniCssExtractPlugin.loader : "style-loader",//开发环境下使用style-loader（不然不会热更新），生产环境下使用MiniCssExtractPlugin.loader
                        options:NODE_ENV==="production" ? {publicPath:'../../'} : {}
                    },
                    "css-loader",
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:[
                                require('autoprefixer')({
                                    browsers:['last 2 versions','>5%']//'last 5 versions','>0.01%'
                                })
                            ]
                        }
                    },
                    {
                        loader:'less-loader',
                        options:{
                            javascriptEnabled: true,
                            modifyVars:{
                                "@icon-url":'"~antd-iconfont/iconfont"'
                            }
                        }
                    }
                ]
            },
            {
                test:/\.(jpg|jpeg|png|gif|svg)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        name:'[name].[ext]',
                        limit:3*1024,//小于3kb使用base64编码
                        outputPath:'static/img/',
                        // publicPath:'../img/'
                    }
                }
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'[name].[ext]',
                        // limit:8192,
                        outputPath:'static/font/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template:'./public/index.html',//模板
            filename:'index.html',//生成的html文件的名字
            minify:{//生产期间使用，直接设置为true，开发时设置为false
                // removeAttributeQuotes:true,//删除双引号
                removeComments:true,//删除注释
                collapseWhitespace:false,//压缩代码
                removeStyleLinkTypeAttributes:false,
                removeScriptTypeAttributes:false
            }
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist/dll', 'vendor.mainfist.json')
        }),
        new HappyPack({
            id:'js',
            use:[
                {
                    loader:'babel-loader',
                    options:{
                        presets:[
                            [
                                '@babel/preset-env',
                            ],
                            '@babel/preset-react'
                        ],
                        plugins:[
                            "@babel/plugin-transform-runtime",
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],//启用装饰器语法
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],//使用箭头函数绑定事件
                            'babel-plugin-syntax-dynamic-import',
                            ['import',{
                                libraryName:'antd',
                                libraryDirectory: 'es',
                                style:true
                            }]
                        ],
                        cacheDirectory: true
                    }
                }
            ]
        }),
        new HappyPack({
            id:'css',
            use:[
                {
                    loader:NODE_ENV==="production" ? MiniCssExtractPlugin.loader : "style-loader",//开发环境下使用style-loader（不然不会热更新），生产环境下使用MiniCssExtractPlugin.loader
                    options:NODE_ENV==="production" ? {publicPath:'../'} : {}
                },
                "css-loader",
                {
                    loader:'postcss-loader',
                    options:{
                        plugins:[
                            require('autoprefixer')({
                                browsers:['last 5 versions','>0.01%']
                            })
                        ]
                    }
                }
            ]
        }),
        new AntDesignThemePlugin(options)
    ]
}
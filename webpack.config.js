var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var path = require("path");
var bootstrapEntryPoints = require("./webpack.bootstrap.config")

var isProd = process.env.NODE_ENV === "production"; //环境是否为产品，产品环境需要分离的css文件
var cssDev = ["style-loader", "css-loader?sourceMap", "sass-loader"];
//ExtractTextPlugin.extrac提取css生成css文件
var cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader!sass-loader",
    publicPath: "./"
})

var cssConfig = isProd ? cssProd : cssDev;
var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        app: "./src/app.js",
        contact: "./src/contact.js",
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js"
    },
    module:{
        rules: [
            {
                test: /\.scss$/, 
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            pretty: true
                        }
                    }
                ]
            },            
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    //"file-loader?[path][name].[ext]?[hash:6]&outputPath=images/",
                    "file-loader?name=images/[name].[ext]",
                    "image-webpack-loader?bypassOnDebug"
                ]
            },
            { test: /\.(woff2?|svg)$/, use: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
            { test: /\.(ttf|eot)$/, use: 'file-loader?name=fonts/[name].[ext]' },
            // Bootstrap 3
            { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use: 'imports-loader?jQuery=jquery' }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        noInfo: true,
        //open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Project Demo",
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            excludeChunks: ["contact"], //排除不必要的chunk
            template: "./src/index.pug", // Load a custom template (ejs by default)
            //filename: "./../index.html" //定义生成的html文件名和存放位置
        }),
        new HtmlWebpackPlugin({
            title: 'Contact Page',
            hash: true,
            chunks: ["contact"], //设定特定的chunk
            filename: "contact.html",
            template: "./src/contact.html"
        }),
        new ExtractTextPlugin({
            filename: "/css/[name].css",
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}
/* eslint-env node */
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

const APP = process.env.APP || "hd";
const BUILD_DIR = path.resolve(__dirname, "build/web");
const PUBLIC_DIR = path.resolve(BUILD_DIR, "public");
const SRC_DIR = path.resolve(__dirname, "src");
const NODE_MODULES_DIR = path.resolve(__dirname, "node_modules");
const APP_ENV = process.env.APP_ENV || "production";
let indexPath = "index.jsx";
switch (APP_ENV) {
    case "dev":
        indexPath = "index_dev.jsx";
        break;
    case "staging":
        indexPath = "index_staging.jsx";
        break;
    case "test":
        indexPath = "index_test.jsx";
        break;
}

const withSourceMap = function(url) {
    return APP_ENV !== "production" ? url + "?sourceMap" : url;
};

//we collect static files from various places
const staticPaths = ["web/static/", `web/${APP}/static/`];
const copyPlugins = staticPaths.map(function(path) {
    return new CopyWebpackPlugin([
        {
            from: path,
            to: "../",
            toType: "dir",
            flatten: false
        }
    ]);
});

let config = {
    target: "web",
    context: SRC_DIR,
    resolve: {
        symlinks: false,
        extensions: [
            // if an import has no file ending, they will be resolved in this order
            ".tsx",
            ".ts",
            ".jsx",
            ".js"
        ],
        modules: [SRC_DIR, NODE_MODULES_DIR]
    },
    entry: {
        [`${APP}App`]: SRC_DIR + `/web/${APP}/${indexPath}`
    },
    module: {
        rules: [
            // make sure the CSS rules are the first two rules, as we replace
            // them below for the production config
            // BEGIN(CSS) DO NOT MOVE
            {
                test: /\.(scss|sass)$/,
                use: [
                    "style-loader",
                    withSourceMap("css-loader"),
                    withSourceMap("sass-loader")
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", withSourceMap("css-loader")]
            },
            // END(CSS) DO NOT MOVE
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: "file-loader"
            },
            {
                test: /\.(yaml|yml)$/,
                use: ["json-loader", "yaml-loader"]
            },
            {
                test: /\.[tj]sx?$/,
                include: [SRC_DIR],
                use: "babel-loader"
            }
        ]
    },
    output: {
        path: PUBLIC_DIR,
        filename: "[name].js",
        library: "[name]",
        libraryTarget: "umd",
        publicPath: "/public/"
    },
    plugins: [
        ...copyPlugins,
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};

if (APP_ENV === "production") {
    config = {
        ...config,
        mode: "production",
        plugins: [
            ...config.plugins,
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production"),
                COMMIT_SHA: JSON.stringify(
                    process.env.CI_COMMIT_SHA ||
                        process.env.COMMIT_SHA ||
                        "unknown"
                )
            })
        ],
        module: {
            ...config.module,
            rules: [
                // make sure the CSS rules are the first two
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        withSourceMap("css-loader"),
                        withSourceMap("sass-loader")
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        withSourceMap("css-loader")
                    ]
                },
                ...config.module.rules.slice(2)
            ]
        }
    };
} else {
    config = {
        ...config,
        mode: "development",
        devtool: "cheap-module-source-map",
        devServer: {
            // enable Hot Module Replacement on the server
            hot: true,
            host: '0.0.0.0',
            // match the output path
            contentBase: ["src/web/static", "src/web/"+APP+"/static"],
            // match the output `publicPath`
            publicPath: "/public/",
            //always render index.html if the document does not exist (we need this for correct routing)
            historyApiFallback: true,

            proxy: {
                "/api": {
                    target: "http://localhost:5000/",
                    secure: false
                }
            },
            // we enable CORS requests (useful for testing)
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers":
                    "X-Requested-With, content-type, Authorization"
            }
        },
        plugins: [
            ...config.plugins,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": '"development"',
                COMMIT_SHA: JSON.stringify(
                    process.env.CI_COMMIT_SHA ||
                        process.env.COMMIT_SHA ||
                        "unknown"
                )
            })
            //new BundleAnalyzerPlugin()
        ]
    };
}

module.exports = config;

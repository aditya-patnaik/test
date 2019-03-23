const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/client/js/index.tsx",
        login: "./src/client/js/login/index.tsx"
    },
    output: {
        filename: "js/[name].js",
        publicPath: "/",
        path: __dirname + "/dist/client"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, loader: "awesome-typescript-loader",
                options: { configFileName: "tsconfig.client.json" }
            },

            // All files with a '.scss' extension will be handled by style loader, css loader and sass loader.
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
          title: 'Medisot',
          filename: 'index.html',
          chunks: ['app'],
          // Load a custom template (lodash by default)
          template: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Login',
            filename: 'login.html',
            chunks: ['login'],
            // Load a custom template (lodash by default)
            template: 'login.html'
          }),
        new CopyWebpackPlugin([
            {
                from: "./src/client/images",
                to: "images"
            }
        ]),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};
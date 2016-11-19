
module.exports = {
    entry: "./public/app.js",
    output: {
        path: "./bundle",
        filename: "bundle.js",
        devtoolModuleFilenameTemplate: '[resourcePath]',
        devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
    },
    module: {
        loaders: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/, loader: 'style!css' }
            ,
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ["", ".js", ".jsx" ]
    }
};

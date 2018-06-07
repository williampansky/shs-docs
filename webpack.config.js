const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './index.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src/js')
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        /**
         * @summary Uses UglifyJS v3 (uglify-es) to minify JavaScript.
         * 
         * @method UglifyJsPlugin
         * @see [Webpack.UglifyJsPlugin]{@link https://webpack.js.org/plugins/uglifyjs-webpack-plugin}
         * 
         * @prop {Option} sourceMap true
         * @prop {Option} comments false
         * @prop {Option} beautify false
         */
        new UglifyJsPlugin({
            uglifyOptions: {
                sourceMap: true,
                output: {
                    comments: false,
                    beautify: false
                },
            }
        })
    ]
};
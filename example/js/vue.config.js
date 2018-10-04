/**
 * @summary vue.config.js
 * @namespace config
 * 
 * @prop {String} outputDir=dist - Output directory of compiled Vue bundle.
 * @prop {String} assetsDir=media - Assets will be referenced using /media as the base URL.
 */

const path = require('path');
const TodoWebpackPlugin = require('todo-webpack-plugin');

module.exports = {
    outputDir: 'dist',

    // assets will be referenced using /media as the base URL
    assetsDir: 'media',

    configureWebpack: {
        plugins: [
            /**
             * @summary Webpack Plugin to generate TODO.md report.
             * @method TodoWebpackPlugin
             * @memberof config
             * @see [Github/todo-webpack-plugin]{@link https://github.com/mikeerickson/todo-webpack-plugin}
             */
            new TodoWebpackPlugin({
                console: false,
                reporter: 'markdown',
                filename: 'TODO.md',
                withInlineFiles: true
            })
        ],
        module: {
            rules: [
                {
                    resourceQuery: /blockType=docs/,
                    loader: 'null-loader'
                }
            ]
        }
    },

    chainWebpack: config => {
        /**
         * @desc disable preload/prefetch directives in link elements
         */
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');

        /**
         * @summary Convert Markdown files to Vue component.
         * @see [Github]{@link https://github.com/QingWei-Li/vue-markdown-loader}
         */
        config.module.rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({ raw: true });
    },

    devServer: {
        /**
         * @description
         * add ssl configuration here once API gets going and if it's needed
         */
        proxy: {
            '/auth': {
                target: 'https://morez.lh',
                port: 443,
                secure: false,
                changeOrigin: true
            },
            '/authorize.php': {
                target: 'https://morez.lh'
            }
        }
    },

    // turn off app[hash].js
    filenameHashing: false,

    pluginOptions: {
        lintStyleOnBuild: true,
        stylelint: {
            fix: false
        },
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                // UIkit base Sass partials
                path.resolve(__dirname, 'node_modules/uikit/src/scss/variables.scss'),
                path.resolve(__dirname, 'node_modules/uikit/src/scss/mixins.scss'),
                path.resolve(__dirname, 'node_modules/uikit/src/scss/components/variables.scss'),
                path.resolve(__dirname, 'node_modules/uikit/src/scss/components/mixin.scss'),

                // MORez-specific partials
                path.resolve(__dirname, 'src/styles/variables/_colors.scss'),
                path.resolve(__dirname, 'src/styles/variables/_typography.scss'),
                path.resolve(__dirname, 'src/styles/_mixins.scss'),
                path.resolve(__dirname, 'src/styles/_config.scss'),
            ]
        }
    },

    baseUrl: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,

    css: {
        sourceMap: true
    },

    lintOnSave: undefined
};

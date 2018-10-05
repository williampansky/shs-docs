/**
 * @summary PostCSS is a tool for transforming styles with JS plugins.
 * These plugins can lint your CSS, support variables and mixins,
 * transpile future CSS syntax, inline images, and more.
 *
 * @namespace config:postcss
 * 
 * @see [github/postcss]{@link https://github.com/postcss/postcss}
 *
 * @desc Run `npx autoprefixer --info` to check which browsers
 * are selected and which properties will be prefixed.
 */
module.exports = {
    parser: 'postcss-scss', // https://github.com/postcss/postcss-scss
    plugins: {
        /**
         * @summary PostCSS plugin to parse CSS and add vendor prefixes
         * to CSS rules using values from Can I Use.
         * @method Autoprefixer
         * @memberof config:postcss
         * @see [github/autoprefixer]{@link https://github.com/postcss/autoprefixer}
         * @example
         * autoprefixer: {
         *      add: true, // add prefixes
         *      env: '.browserslistrc', // environment for Browserslist
         *      flexbox: true, // add prefixes for flexbox properties
         *      grid: true, // add IE prefixes for Grid Layout properties
         *      remove: true, // remove outdated prefixes
         *      supports: true // add prefixes for @supports
         * },
         */
        autoprefixer: {
            add: true, // add prefixes
            env: '.browserslistrc', // environment for Browserslist
            flexbox: true, // add prefixes for flexbox properties
            grid: true, // add IE prefixes for Grid Layout properties
            remove: true, // remove outdated prefixes
            supports: true // add prefixes for @supports
        },


        /**
         * @deprecated
         * @summary CSS Colorguard helps you maintain the color set that you want,
         * and warns you when colors you've added are too similar to ones that
         * already exist. Naturally, it's all configurable to your tastes.
         * @method Colorguard
         * @memberof config:postcss
         * @see [github/css-colorguard]{@link https://github.com/SlexAxton/css-colorguard}
         */
        // colorguard: {
        //     threshold: 3,           // Lower values are more precise
        //     whitelist: [
        //         ['#000000', '#ffffff']
        //     ]
        // },


        /**
         * @summary A modern, modular compression tool written on top of the
         * PostCSS ecosystem, which allows us to use a lot of powerful features
         * in order to compact CSS appropriately.
         * @method CSSnano
         * @memberof config:postcss
         * @see [github/cssnano]{@link https://github.com/cssnano/cssnano}
         * @example cssnano: { preset: 'default' },
         */
        cssnano: {
            preset: 'default'
        },


        /**
         * @deprecated
         * @summary PostCSS plugin which allows you to blacklist files and/or
         * folders that you don't want to process with a given PostCSS plugin.
         * @method FilterStream
         * @memberof config:postcss
         * @see [github/postcss-filter-stream]{@link https://github.com/tsm91/postcss-filter-stream}
         */
        // 'postcss-filter-stream': {
        //     filter: [
        //         '!node_modules/**/*'
        //     ],
        //     function: 'colorguard()'
        // },


        /**
         * @summary PostCSS Preset Env lets you convert modern CSS into something
         * most browsers can understand, determining the polyfills you need based
         * on your targeted browsers or runtime environments.
         * @method PresetEnv
         * @memberof config:postcss
         * @see [github/postcss-preset-env]{@link https://github.com/csstools/postcss-preset-env}
         * @example 'postcss-preset-env': { stage: 3 // use stage 3 features },
         */
        'postcss-preset-env': {
            stage: 3 // use stage 3 features
        },


        /**
         * @summary PostCSS plugin to keep rules & at-rules (@...) content in order.
         * @method Sorting
         * @memberof config:postcss
         * @see [github/postcss-sorting]{@link https://github.com/hudochenkov/postcss-sorting}
         * @example
         * 'postcss-sorting': {
         *      order: [
         *          'custom-properties',
         *          'dollar-variables',
         *          'declarations',
         *          'at-rules',
         *          'rules'
         *      ],
         *      'properties-order': [
         *          'background',
         *          'border',
         *          'padding',
         *          'margin'
         *      ],
         *      'unspecified-properties-position': 'bottom'
         * }
         */
        'postcss-sorting': {
            order: [
                'custom-properties',
                'dollar-variables',
                'declarations',
                'at-rules',
                'rules'
            ],
            'properties-order': [
                'background',
                'border',
                'padding',
                'margin'
            ],
            'unspecified-properties-position': 'bottom'
        }
    }
};

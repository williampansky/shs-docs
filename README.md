# shs-docs
A documentation generator package designed for SHSDX OpMod developers.

## Getting started
First, install the package.
```command-line
npm i -D shs-docs
```

Copy the `example/` directory's `jsdocs.config.js` file to your project root and configure as needed. Then, add the following to your NPM scripts.
```json
"build:docs": "node_modules/shs-docs/src/jsdoc/jsdoc.js -c jsdocs.config.js",
```

## Dependencies
SHS-Docs is powered, most importantly, by [JSDoc 3][jsdoc], and API documentation generator for JavaScript, & [Docdash][docdash], a Lodash inspired documentation template theme for JSDoc 3.

Name|Description
:---|:---
[docdash][docdash]|Lodash inspired JSDoc 3 template/theme.
[jsdoc][jsdoc]|An API documentation generator for JavaScript.
[jsdoc-vue-component][jsdoc-vue]|A simple plugin for JSDoc to parse `.vue` Single-File Components.
[uikit][uikit]|A lightweight and modular front-end framework for developing fast and powerful web interfaces.

<!-- LINKS & IMAGES -->
[docdash]:              https://github.com/clenemt/docdash
[jsdoc]:                https://github.com/jsdoc3/jsdoc
[jsdoc-vue]:            https://github.com/ccqgithub/jsdoc-vue-component
[prism-treeview]:       https://github.com/Golmote/prism-treeview
[uikit]:                https://getuikit.com/docs/introduction
<template>
</template>

<script>
/**
 * @todo continue research into necessity of i elem and if it can be removed
 * @todo add support for the rest of the color schemes (black-lighten, gray-darken)
 *
 * @summary Render an SVG icon from the img/icons directory.
 * 
 * @module AppButton
 * @exports components/buttons/AppButton.vue
 * 
 * @author William Pansky <william.pansky@sabre.com>
 * @version 0.6.1
 * @phase 1.0
 * 
 * @requires AppIcon
 * @requires That
 *
 * @tutorial Getting Started
 *
 * @see [UIkit]{@link https://google.com/}
 * 
 * @prop {String} icon='' - The icon to load and render. This should match a corresponding icon-*.svg file in the img/icons directory.
 * @prop {String} color=black - The color of the icon to apply. This should match with the SASS color variables defined in _config.scss.
 * @prop {Boolean} form=false - Used to determine if this icon is part of a form input element.
 * 
 * @bug Currently, shorthand Vue's `v-on` directives break code block rendering.
 * @bug bug 2
 * 
 * @description
 * ```html
 * <AppIcon 
 * @:click="event"
 * icon="close" />
 * ```
 * ```scss
 * @import uikit from 'node_modules/uikit'
 * ```
 */

/**
 * @member mounted
 */
function mounted() {}

/**
 * @summary Occurs at onload.
 * @method created
 * @desc Occurs at onload.
 * ```jsx
 * if (this.icon)
 *      this.raw != require(`!svg-inline-loader!@/img/icons/icon-${this.icon}.svg`);
 * ```
 */
function created() {}

/**
 * @method render
 * @param {String} createElement - Basically document.createElement('i');
 * @desc 123
 * @example
 * if (this.icon)
 *      this.raw = require(`!svg-inline-loader!@/img/icons/icon-${this.icon}.svg`);
 */
function render() {}
</script>

<style>
</style>

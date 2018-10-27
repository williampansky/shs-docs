<template>
</template>

<script>
/**
 * @todo continue research into necessity of <i></i> and if it can be removed
 * @todo add support for the rest of the color schemes (black-lighten, gray-darken)
 *
 * @deprecated
 *
 * @summary Render an SVG icon from the img/icons directory.
 * 
 * @module AppIcon
 * @exports components/AppIcon.vue
 * @tutorial Getting Started
 * @tutorial Localhost Setup
 * 
 * @author Ross Joo
 * @version 0.2.5
 * @phase 3.2
 * 
 * @prop {String} icon='' - The icon to load and render. This should match a corresponding icon-*.svg file in the img/icons directory.
 * @prop {String} color=black - The color of the icon to apply. This should match with the SASS color variables defined in _config.scss.
 * @prop {Boolean} form=false - Used to determine if this icon is part of a form input element.
 * 
 * @description
 * ```jsx
 * // This will load `@/img/icons/icon-close.svg`
 * <AppIcon icon="close" />
 * ```
 */

 /**
 * @member mounted
 */
function mounted() {}

 /**
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
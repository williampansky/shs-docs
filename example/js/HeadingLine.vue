<template>
    <component
    :is="heading"
    class="uk-heading-line">
        <span><slot name="title"></slot></span>
    </component>
</template>


<script>
/**
 * @todo Requires unit test.
 * @summary `<h1 - h6 />` with vertically centered line accent.
 *
 * @module HeadingLine
 * @exports components/typography/HeadingLine.vue
 *
 * @author William Pansky
 * @version 0.1.6
 * @phase 3.3
 *
 * @see [uikit/#heading-line]{@link https://getuikit.com/docs/heading#heading-line}
 *
 * @prop {String} heading=h1 - Heading declaration; {Options} `h1` `h2` `h3` `h4` `h5` `h6`
 *
 * @emits ModalPrompt#confirm Emitted when user clicks Confirm
 *
 * @desc
 * ```jsx
// renders to an <h2 /> tag
<HeadingLine heading="h2">
    <template slot="title">Some title text</template>
</HeadingLine>

// renders to an <h6 /> tag
<HeadingLine heading="h6">
    <template slot="title">Some other text</template>
</HeadingLine>
 * ```
 */

export default {
    name: 'HeadingLine',
    props: {
        heading: {
            type: String,
            default: 'h1'
        }
    },
    data() {
        return {
            type: this.type,
        };
    },
    methods: {
        /**
         * @method mounted
         * @emits close
         * @desc The `onload` logic for the component.
         * ```jsx
         * mounted() {
         *      UIkit.modal(this.$refs.modal).show();
         *
         *      this.$refs.modal.addEventListener('hidden', () => {
         *          this.$emit('close');
         *      });
         * },
         * ```
         */
        mounted() {
            UIkit.modal(this.$refs.modal).show();

            this.$refs.modal.addEventListener('beforehide hide hidden', () => {
                console.log('UIkit hidden event');
                this.$emit('close');
            });
        },
    }
};
</script>


<style lang="scss">
@import '~uikit/src/scss/components/heading';
</style>


<style lang="scss" scoped>
$line-color: #c0c0c0;

.uk-heading-line {
    font-family: $font-bold-condensed;
    // font-size: 21px;
    // line-height: 25px;
    letter-spacing: 0.72px;
    text-transform: uppercase;
    margin-bottom: 35px;

    & > :before,
    & > :after {
        animation: draw 800ms 200ms ease-in-out 1 forwards;
        border-color: $line-color;
        width: 0;
    }
}

@keyframes draw {
    from { width: 0; }
    to { width: 2000px; }
}
</style>

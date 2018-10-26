<template>
    <div class="dashboard uk-grid uk-grid-collapse uk-offcanvas-content">
        <aside
        uk-offcanvas
        class="dashboard-sidebar-wrapper uk-offcanvas">
            <div class="uk-offcanvas-bar uk-animation-fade">
                <DashboardSidebar />
            </div>
        </aside>
        <main class="dashboard-view-wrapper main-content-view uk-width-3-4 uk-animation-fade">
            <transition
            :name="transition.name"
            :mode="transition.mode"
            :enter-class="transition.enter"
            :enter-active-class="transition.enter"
            :enter-to-class="transition.enter"
            :leave-class="transition.leave"
            :leave-active-class="transition.leave"
            :leave-to-class="transition.leave">
                <router-view></router-view>
            </transition>
        </main>
    </div>
</template>


<script>
/**
 * @todo Requires unit test.
 * @summary Dashboard parent view component; morez/dashboard
 *
 * @module TheDashboard
 * @exports views/TheDashboard.vue
 *
 * @author Ross Joo
 * @version 0.1.7
 * @phase 2.2
 *
 * @requires DashboardSidebar
 *
 * @description
 * ```js
 * import DashboardSidebar from '@/components/nav/DashboardSidebar.vue';
 * ```
 */

import DashboardSidebar from '@/components/nav/DashboardSidebar.vue';

export default {
    name: 'TheDashboard',

    components: {
        DashboardSidebar
    },

    data() {
        return {
            /**
             * @summary Transition Vue element attributes
             *
             * @desc
             * `:name`          `:mode`
             * `:enter-class`   `:enter-active-class`   `:enter-to-class`
             * `:leave-class`   `:leave-active-class`   `:leave-to-class`
             *
             * @method transition
             * @memberof views/TheDashboard
             *
             * @prop {String} name - custom-classes-transition
             * @prop {String} mode - out-in
             * @prop {String} enter - uk-animation-slide-right-small
             * @prop {String} leave - uk-animation-slide-left-small uk-animation-reverse
             *
             * @see [CustomTransitions]{@link https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes}
             */
            transition: {
                name: 'custom-classes-transition',
                mode: 'out-in',
                enter: 'uk-animation-slide-right-small',
                leave: 'uk-animation-slide-left-small uk-animation-reverse'
            }
        };
    },

    // methods: {
    //     beforeRouteUpdate(to, from, next) {
    //         const toDepth = to.path.split('/').length;
    //         const fromDepth = from.path.split('/').length;
    //         this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    //         next();
    //     },
    // },

    // // watch the `$route` to determine the transition to use
    // watch: {
    //     '$route'(to, from) {
    //         const toDepth = to.path.split('/').length;
    //         const fromDepth = from.path.split('/').length;
    //         this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    //     }
    // }
};
</script>

<style lang="scss">
@import '~uikit/src/scss/components/utility';
</style>


<style lang="scss" scoped>
// reduce animation duration for snappier page transitions
[class*='uk-animation-'] {
    animation-duration: 300ms;
}

.dashboard {
    min-height: 100vh;
}

.dashboard-sidebar-wrapper {
    background: $color-white;
}

.dashboard-view-wrapper {
    background: $color-gray-lighten-40;
    padding: 50px 80px;
}

.uk-offcanvas-bar {
    overflow: visible;
}
</style>

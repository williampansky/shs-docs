/**
 * @module sidebarPosition
 * @description Uses `sessionStorage` to store & use the sidebar's 
 * scrolling state to preserve position between page views.
 */

/**
 * @summary Adds a listener for #sideNav scrolling position
 * @method sidebarScrollListener
 */
export const sidebarScrollListener = ()=> {
    let sidebar = document.getElementById('sideNav');
    sidebar.onscroll = (position)=> {
        position = sidebar.scrollTop;
        setSidebarPosition(position);
    }
}


/**
 * @summary Uses session storage to track the sidebar X position.
 * @method setSidebarPosition
 * @param {Number} position Current sidebar.scrollTop val
 */
export const setSidebarPosition = position => {
    sessionStorage.setItem('sidebarPosition', position);
};


/**
 * @summary Gets the number value from session storage and returns
 * @method getSidebarPosition
 */
export const getSidebarPosition = ()=> {
    sessionStorage.getItem('sidebarPosition');
    return;
};


/**
 * @summary Moves #sideNav.scrollTo to set value of session storage number
 * @method moveSidebarToPosition
 * @param {Number} position value returned from sessionStorage.getItem('sidebarPosition');
 */
export const moveSidebarToPosition = position => {
    position = sessionStorage.getItem('sidebarPosition');
    let sidebar = document.getElementById('sideNav');

    sidebar.scrollTo(0, position);
};
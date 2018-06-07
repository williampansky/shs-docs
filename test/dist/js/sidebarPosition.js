/**
 * Adds a listener for #sideNav scrolling position
 * @member sidebarScrollListener
 */
const sidebarScrollListener = ()=> {
    let sidebar = document.getElementById('sideNav');
    sidebar.onscroll = ()=> {
        position = sidebar.scrollTop;
        setSidebarPosition(position);
    }
}


/**
 * Uses session storage to track the sidebar X position.
 * @member setSidebarPosition
 * @param {Number} position Current sidebar.scrollTop val
 */
const setSidebarPosition = position => {
    sessionStorage.setItem('sidebarPosition', position);
};


/**
 * Gets the number value from session storage and returns
 * @member getSidebarPosition
 */
const getSidebarPosition = ()=> {
    sessionStorage.getItem('sidebarPosition');
    return;
};


/**
 * Moves #sideNav.scrollTo to set value of session storage number
 * @member moveSidebarToPosition
 * @param {Number} position value returned from sessionStorage.getItem('sidebarPosition');
 */
const moveSidebarToPosition = position => {
    position = sessionStorage.getItem('sidebarPosition');
    let sidebar = document.getElementById('sideNav');

    sidebar.scrollTo(0, position);
};


/**
 * Calls both sidebarScrollListener() and moveSidebarToPosition() on window load.
 * @member onload
 */
window.onload = function() {
    sidebarScrollListener();
    moveSidebarToPosition();
    // setSidebarActiveNode();
}


/**
 * @func setSidebarActiveNode
 * @todo fix
 */
// const setSidebarActiveNode = ()=> {
//     let sidebar = document.getElementById('sideNav');
//     sidebar.addEventListener('mouseover', function(event) {
//         event.target.classList.add('uk-active');
//     });
// }
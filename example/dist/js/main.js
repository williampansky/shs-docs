// /**
//  * @name NavItem
//  * @class
//  * @param {String} id Unique identifier tag for element.
//  * @param {String} title `element.innerText`.
//  */
// export const NavItem = (id, title)=> {
//     this.id     = id;
//     this.title  = title;
// }


// /**
//  * @func convertIdToNavItem
//  * @param {String} id Unique identifier tag for element.
//  */
// export const convertIdToNavItem = id => {
//     let element = document.querySelector(`#${id}`);
//     let title   = element.innerText;
//     let obj     = new NavItem(id, title);

//     return obj;
// }


// /**
//  * @summary Use convertIdToNavItem() to append.
//  * @param {Object/Class} item Uses `new NavItem(id, title)` to create obj.
//  * @description Takes a convertIdToNavItem() func's return and molds it 
//  * into a navigation item before appending it to the #sideNav elem.
//  */
// export const appendToNav = item => {
//     let nav         = document.querySelector('#sideNav');
//     let itemWrapper = document.createElement('li');
//     itemWrapper.classList.add('nav-item');
//     itemWrapper.innerHTML = `
//         <a href="#${item.id}" class="uk-text-truncate">${item.title}</a>
//     `;
//     nav.append(itemWrapper);
// }


// /**
//  * @func initNav
//  * @description Uses convertIdToNavItem(id) as a "method" in the appendToNav()
//  * function in order to pass the value of `return obj` to the append function.
//  */
// export const initNav = ()=> {
//     let headings = document.querySelectorAll('h1') && document.querySelectorAll('h2');
//     for (let i=0; i < headings.length; i++) {
//         let id = headings[i].id;
//         appendToNav(convertIdToNavItem(id));
//     }
// }


/**
 * @summary Recursive parsing and nav building.
 * 
 * @function buildRec
 * @param {*} nodes 
 * @param {*} element 
 * @param {*} level 
 * 
 * @author Louis Ricci
 * @see [Stack Overflow]{@link https://stackoverflow.com/a/17430494}
 */
export const buildRec = (nodes, element, level)=> {
    let node;

    // filter
    do {
        node = nodes.shift();
    } while (
        node && !(/^h[123456]$/i.test(node.tagName))
    );

    // ----------
    // process the next node
    if (node) {
        let ul, li, currentNode;
        let currentLevel = parseInt(node.tagName.substring(1));

        // ----------
        // same level append an il
        if (currentLevel == level) {
            currentNode = 0;

        // ----------
        // walk up then append il
        } else if (currentLevel < level) {
            currentNode = 0;
            do {
                element = element.parentNode.parentNode;
                currentNode--;
            } while (
                currentNode > (currentLevel - level)
            );

        // ----------
        // create children then append il
        } else if (currentLevel > level) {
            currentNode = 0;
            do {
                li = element.lastChild;
                
                if (li == null) {
                    li = element.appendChild(document.createElement('li'));
                    li.setAttribute('data-line', '109');
                }
                
                element = li.appendChild(document.createElement('ul'));
                // element.classList.add('uk-nav-sub');
                currentNode++;
            } while (
                currentNode < (currentLevel - level)
            );
        }

        li = element.appendChild(document.createElement('li'));
        li.setAttribute('data-line', '121');

        // replace the next line with archor tags or whatever you want
        li.innerHTML = `<a href="#${node.id}" class="uk-text-truncate uk-animation-fade">${node.innerText}</a>`;

        // recursive call
        buildRec(nodes, element, level + currentNode);
    }
}


/**
 * @summary Wrapper func to call onload to build nav.
 * 
 * @func buildNav
 * @returns {Promise} resolve
 * @see [Stack Overflow]{@link https://stackoverflow.com/a/10004137}
 * 
 * @desc Thx to {@link https://stackoverflow.com/a/10004137} for info w/Promises.
 * ```js
 * let all === document.getElementById('content').getElementsByTagName('*');
 * ```
 */
export const buildNav = ()=> {
    return new Promise(resolve => {
        let all = document.getElementById('content').getElementsByTagName('*');
        let nodes = [];

        for (
            let index = all.length;
            index--;
            nodes.unshift(all[index])
        );

        let result = document.createElement('nav');
        result.classList.add('uk-nav', 'uk-nav-default');
        result.setAttribute('uk-scrollspy-nav', 'closest:li; scroll:true; offset:100;');
        
        buildRec(nodes, result, 1);
        resolve(document.querySelector('#sideNav').appendChild(result));

        let subnavs = document.querySelectorAll('#sideNav ul > li > ul');
        for (let i=0; i < subnavs.length; i++) {
            if (subnavs[i] !== null && subnavs[i] !== 'undefined')
                subnavs[i].classList.add('uk-nav-sub');
        }
    });
}



/**
 * @summary add shadows to imgs
 * @func addShadows
 */
export const addShadows = ()=> {
    let images = document.querySelectorAll('#content img');
    for (let i=0; i < images.length; i++)
        images[i].classList.add('uk-box-shadow-large');
}


/**
 * @summary add .uk-nav-header to first `<li>` items
 * @func addNavHeader
 */
export const addNavHeader = ()=> {
    let navHeaders = document.querySelectorAll('#sideNav .uk-nav > li > a:first-of-type');
    for (let i=0; i < navHeaders.length; i++)
        navHeaders[i].classList.add('uk-nav-header');
}



/**
 * @summary Fixing `href` attribute value issues.
 * @func fixBrokenHrefs
 * @desc Regex array to remove some chars from the buildRec() nav
 * that breaks the windows scrolling behavior.
 * ```js
 * let regexMatch = /(-)$/g;
 * let links = document.querySelectorAll('.uk-nav a');
 * 
 * for (let i=0; i < links.length; i++) {
 *      if (links[i].getAttribute('href').match(regexMatch)) {
 *          let href = links[i].getAttribute('href');
 *          let newHref = href.substr(
 *              0, href.lastIndexOf('-', href.length - 1)
 *          );
 *          links[i].setAttribute('href', newHref);
 *      }
 * }
 * ```
 */
export const fixBrokenHrefs = ()=> {
    let regexMatch = /(-)$/g;
    let links = document.querySelectorAll('.uk-nav a');

    for (let i=0; i < links.length; i++) {
        if (links[i].getAttribute('href').match(regexMatch)) {
            let href = links[i].getAttribute('href');
            let newHref = href.substr(
                0, href.lastIndexOf('-', href.length - 1)
            );
            links[i].setAttribute('href', newHref);
        }
    }
}



/**
 * @summary fixing #id issues.
 * @func fixBrokenIDs
 */
export const fixBrokenIDs = ()=> {
    let regexMatch = /(-)$/g;
    let headings = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6'
    );

    // for (let i=0; i < headings.length; i++) {
    //     if (headings[i].getAttribute('id').match(regexMatch)) {
    //         let id = headings[i].getAttribute('id');
    //         let newID = id.substr(
    //             0, id.lastIndexOf("-", id.length - 1)
    //         );
    //         headings[i].setAttribute('id', newID);
    //     }
    // }
}


/**
 * @summary Add `uk-scroll` attribute to internal document links.
 * @func addScrollingBehavior
 * @see [UIkit Scrolling]{@link https://getuikit.com/docs/scroll}
 */
export const addScrollingBehavior = ()=> {
    let content     = document.getElementById('content');
    let links       = content.querySelectorAll('a');
    let regexMatch  = /(#)/g;

    for (let i=0; i < links.length; i++) {
        if (links[i].getAttribute('href').match(regexMatch))
            links[i].setAttribute('uk-scroll', '');
    }
}


/**
 * @summary Add `.uk-align-center` to images less than 740px.
 * @func centerSmallerImages
 * @description
 * ```js
 * for (let i=0; i < images.length; i++) {
 *      if (images[i].style.width < minWidth) 
 *          images[i].classList.add('uk-align-center');
 * }
 * ```
 */
export const centerSmallerImages = ()=> {
    let content = document.getElementById('content');
    let images = content.getElementsByTagName('img');
    let minWidth = 740;

    for (let i=0; i < images.length; i++) {
        if (images[i].style.width < minWidth)
            images[i].classList.add('uk-align-center');
    }
}


/**
 * @summary Add `uk-table` classes to markdown tables
 * @func makeUIkitTables
 * @description
 * ```js
 * let tables = document.getElementsByTagName('table');
 * for (let i=0; i < tables.length; i++) {
 *      if (!tables[i].classList.contains('uk-table')) {
 *          tables[i].classList.add(
 *              'uk-table',
 *              'uk-table-small',
 *              'uk-table-striped',
 *              'uk-table-middle',
 *              'uk-table-responsive'
 *          );
 *      }
 * }
 * ```
 */
export const makeUIkitTables = ()=> {
    setTimeout(()=> {
        let tables = document.getElementsByTagName('table');
        
        for (let i=0; i < tables.length; i++) {
            if (!tables[i].classList.contains('uk-table')) {
                tables[i].classList.add(
                    'uk-table',
                    'uk-table-small',
                    'uk-table-striped',
                    'uk-table-middle',
                    'uk-table-responsive'
                );
            }
        }
    }, 300);
}


/**
 * @summary Handles long `<td>` tags.
 * @func wordBreakLongTableTDs
 * @description Apply `word-break: break-all` inline style if 
 * `<td>` string length is longer than 70 characters.
 */
// export const wordBreakLongTableTDs = ()=> {
    // setTimeout(()=> {
    //     let tds = document.getElementsByTagName('td');
        
    //     for (let i=0; i < tds.length; i++) {
    //         let values = tds[i].innerText;
    //         let string_length = values.length;

    //         if (string_length >= 70)
    //             tds[i].style.wordBreak = 'break-all';
    //     }
    // }, 300);
// }



// /**
//  * Wrap uk-* tables in a div.uk-overflow-auto
//  * @todo fix?
//  */
// export const makeUIkitTablesResponsive = ()=> {
//     setTimeout(()=> {
//         let tables = document.querySelectorAll('.uk-table');
//         for (let i=0; i < tables.length; i++) {
//             let org_html = tables[i].innerHTML;
//             let new_html = '<div class="uk-overflow-auto">' + org_html + '</div>';
//             setTimeout(()=> { tables[i].innerHTML = new_html; }, 100);
//         }
//     }, 600);
// }

// export const wrapInOverflow = (element)=> {
//     let org_html = element.innerHTML;
//     let new_html = '<div class="uk-overflow-auto">' + org_html + '</div>';
//     element.innerHTML = new_html;
// }



/**
 * @summary Formats date for easier reading.
 * @func formatDate
 * @see [StackOverflow]{@link https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date}
 * @returns today.toLocaleDateString('en-US', options);
 */
export const formatDate = ()=> {
    let today = new Date();
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return today.toLocaleDateString('en-US', options);
}



/**
 * @summary Edits the `href` attributes of sidebar links 
 * if the current page matches the parent nav item.
 * 
 * @func enableScrollSpy
 */
export const enableScrollSpy = ()=> {
    var pageMatch = document.head.querySelector('title').innerText;
    var navMatch = document.querySelectorAll('#sideNav li > a');

    for (let i=0; i < navMatch.length; i++) {
        if (pageMatch.includes('Global')) {
            scrollSpyHelper('global');
        } else if (pageMatch.includes(navMatch[i].innerText)) {
            navMatch[i].parentNode.classList.add('navMatch');
            setTimeout(()=> { scrollSpyHelper('default'); }, 400);
        } 
    }
}

const scrollSpyHelper = (env)=> {
    let regexMatch = /((#|#~))\w+/gi;
    let links = document.querySelectorAll('.navMatch .uk-nav-sub a');
    let globalLinks = document.querySelectorAll('#globalNav a');

    switch (env) {
        case 'global':
            for (let i=0; i < globalLinks.length; i++) {
                if (globalLinks[i].getAttribute('href').match(regexMatch)) {
                    let href    = globalLinks[i].getAttribute('href');
                    let newHref = href.substring(href.indexOf('#', + 1));

                    globalLinks[i].setAttribute('href', newHref);
                }
            }
        break;
    
        default:
            for (let i=0; i < links.length; i++) {
                if (links[i].getAttribute('href').match(regexMatch)) {
                    let href    = links[i].getAttribute('href');
                    let newHref = href.substring(href.indexOf('#', + 1));

                    links[i].setAttribute('href', newHref);
                }
            }
        break;
    }
}
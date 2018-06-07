window.onload = ()=> {
    if (document.body.classList.contains('documentation')) {
        const promises = [];
        promises.push(initNav());
        Promise.all(promises).then(()=> {
            fixBrokenHrefs();
            fixBrokenIDs();
            addNavHeader();
            makeUIkitTables();
            // scrollNavToActive();
            // makeHeadingsSticky();
        }, (err)=> {
            console.log(err);
        });
    }
}


/**
 * "document.ready"
 */
document.addEventListener('DOMContentLoaded', ()=> {
    if (document.body.classList.contains('documentation')) {
        addShadows();
        centerSmallImages();
    }

    if (document.body.classList.contains('jsdoc')) {
        makeUIkitTables();
        wordBreakLongTableTDs();
    }
});


/**
 * @param {String} id — <element id="" />
 * @param {String} title — element.innerText;
 */
function NavItem(id, title) {
    this.id     = id;
    this.title  = title;
}


/**
 * 
 * @param {*} id 
 */
function convertIdToNavItem(id) {
    let element = document.querySelector(`#${id}`);
    let title   = element.innerText;
    let obj     = new NavItem(id, title);
    console.log(obj);
    return obj;
}


/**
 * Takes a convertIdToNavItem() func's return and molds it into a
 * navigation item before appending it to the #sideNav elem.
 * @param {Object} item
 */
function appendToNav(item) {
    let nav         = document.querySelector('#sideNav');
    let itemWrapper = document.createElement('li');
    itemWrapper.classList.add('nav-item');
    itemWrapper.innerHTML = `
        <a href="#${item.id}" class="uk-text-truncate">${item.title}</a>
    `;
    nav.append(itemWrapper);
}


/**
 * Uses convertIdToNavItem(id) as a param in the appendToNav() func 
 * in order to pass the value of `return obj` to the append function.
 */
function initNav() {
    let headings = document.querySelectorAll('h1') && document.querySelectorAll('h2');
    for (let i=0; i < headings.length; i++) {
        let id = headings[i].id;
        appendToNav(convertIdToNavItem(id));
    }
}


/**
 * Recursive parsing and nav building.
 * @param {*} nodes 
 * @param {*} element 
 * @param {*} level 
 * @author Louis Ricci
 * [Stack Overflow]{@link https://stackoverflow.com/a/17430494}
 */
function buildRec(nodes, element, level) {
    var node;

    // filter
    do {
        node = nodes.shift();
    } while (node && !(/^h[123456]$/i.test(node.tagName)));

    // process the next node
    if (node) {
        var ul, li, currentNode;
        var currentLevel = parseInt(node.tagName.substring(1));

        // same level append an il
        if (currentLevel == level) {
            currentNode = 0;
        // walk up then append il
        } else if (currentLevel < level) {
            currentNode = 0;
            do {
                element = element.parentNode.parentNode;
                currentNode--;
            } while (currentNode > (currentLevel - level));
        // create children then append il
        } else if (currentLevel > level) {
            currentNode = 0;
            do {
                li = element.lastChild;
                if (li == null) {
                    li = element.appendChild(document.createElement('li'));
                }
                element = li.appendChild(document.createElement('ul'));
                element.classList.add('uk-nav-sub');
                // element.setAttribute('uk-scrollspy-nav', 'closest: li; scroll: true; offset: 100');
                currentNode++;
            } while (currentNode < (currentLevel - level));
        }

        li = element.appendChild(document.createElement('li'));

        // replace the next line with archor tags or whatever you want
        // console.log(node);
        li.innerHTML = `
            <a href="#${node.id}" class="uk-text-truncate uk-animation-fade">${node.innerText}</a>
        `;

        // recursive call
        buildRec(nodes, element, level + currentNode);
    }
}


/**
 * Wrapper func to call onload to build nav
 * Thx to https://stackoverflow.com/a/10004137 for info w/Promises
 */
function initNav() {
    return new Promise((resolve)=> {
        var all   = document.getElementById('content').getElementsByTagName('*');
        var nodes = [];

        for (
            var index = all.length;
            index--;
            nodes.unshift(all[index])
        );

        var result = document.createElement('ul');
        result.classList.add('uk-nav', 'uk-nav-default');
        result.setAttribute('uk-scrollspy-nav', 'closest: a; scroll: true; offset: 100');
        // result.setAttribute('uk-scrollspy', 'target: > li; cls:uk-animation-slide-left-small; delay: 100')

        buildRec(nodes, result, 1);
        resolve(document.getElementById('sideNav').appendChild(result));
    });
}


/**
 * Scroll offcanvas to active link
 */
// function scrollNavToActive() {
//     var nav = document.querySelector('sideNav');
//     var active = document.querySelector('#sideNav .uk-active');
//     var activePosition = document.querySelector('#sideNav .uk-active').getBoundingClientRect();
//     nav.scrollTop = activePosition.y;
//     console.log(activePosition.y);
// }


// add shadows to imgs
function addShadows() {
    let images = document.querySelectorAll('#content img');
    for (let i=0; i < images.length; i++)
        images[i].classList.add('uk-box-shadow-large');
}


// add .uk-nav-header to first <li> items
function addNavHeader() {
    let navHeaders = document.querySelectorAll('#sideNav .uk-nav > li > a:first-of-type');
    for (let i=0; i < navHeaders.length; i++)
        navHeaders[i].classList.add('uk-nav-header');
}


// regex array to remove some chars from the buildRec() nav
// that breaks the windows scrolling behavior
function fixBrokenHrefs() {
    let regexMatch = /(-)$/g;
    let links = document.querySelectorAll('.uk-nav a');

    for (let i=0; i < links.length; i++) {
        if (links[i].getAttribute('href').match(regexMatch)) {
            let href = links[i].getAttribute('href');
            let newHref = href.substr(
                0, href.lastIndexOf("-", href.length - 1)
            );
            links[i].setAttribute('href', newHref);
        }
    }
}


function fixBrokenIDs() {
    let regexMatch = /(-)$/g;
    let headings = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6'
    );

    for (let i=0; i < headings.length; i++) {
        if (headings[i].getAttribute('id').match(regexMatch)) {
            let id = headings[i].getAttribute('id');
            let newID = id.substr(
                0, id.lastIndexOf("-", id.length - 1)
            );
            headings[i].setAttribute('id', newID);
        }
    }
}


/**
 * Add `uk-scroll` attribute to internal document links.
 * [UIkit Scrolling]{@link https://getuikit.com/docs/scroll}
 */
function addScrollingBehavior() {
    let content     = document.getElementById('content');
    let links       = content.querySelectorAll('a');
    let regexMatch  = /(#)/g;

    for (let i=0; i < links.length; i++) {
        if (links[i].getAttribute('href').match(regexMatch))
            links[i].setAttribute('uk-scroll', '');
    }
}


/**
 * Add `.uk-align-center` to images less than 740px.
 */
function centerSmallImages() {
    let content = document.getElementById('content');
    let images = content.getElementsByTagName('img');
    let minWidth = 740;

    for (let i=0; i < images.length; i++) {
        if (images[i].style.width < minWidth)
            images[i].classList.add('uk-align-center');
    }
}


/**
 * Add `uk-sticky` to H1s and H2s.
 */
function makeHeadingsSticky() {
    let headings = document.getElementsByTagName('h1');
    for (let i=0; i < headings.length; i++) {
        headings[i].setAttribute('uk-sticky', 'bottom: true');
    }
}


/**
 * Add `uk-table` classes to markdown tables
 */
function makeUIkitTables() {
    setTimeout(()=> {
        let tables = document.getElementsByTagName('table');
        
        for (let i=0; i < tables.length; i++) {
            tables[i].classList.add(
                'uk-table',
                'uk-table-small',
                'uk-table-striped',
                'uk-table-hover',
                'uk-table-responsive',
                'uk-box-shadow-medium'
            );
            // th_filename.classList.add('uk-table-auto');
            // th_lineNums.classList.add('uk-table-shrink');
            // th_TODOs.classList.add('uk-table-expand');
        }
    }, 300);
}


/**
 * Apply `word-break: break-all` inline style if <td> string length
 * is longer than 70 characters.
 */
function wordBreakLongTableTDs() {
    setTimeout(()=> {
        var tds = document.getElementsByTagName('td');
        
        for (var i=0; i < tds.length; i++) {
            var values = tds[i].innerText;
            var string_length = values.length;

            if (string_length >= 70)
                tds[i].style.wordBreak = 'break-all';
        }
    }, 300);
}


/**
 * Add `uk-table` classes to markdown tables
 */
function makeUIkitTables() {
    setTimeout(()=> {
        let tables = document.getElementsByTagName('table');
        
        for (let i=0; i < tables.length; i++) {
            // add uk-* classes if it doesn't already have 'em
            if (!tables[i].classList.contains('uk-table')) {
                tables[i].classList.add(
                    'uk-table',
                    'uk-table-small',
                    'uk-table-striped',
                    'uk-table-hover',
                    'uk-table-responsive',
                    'uk-box-shadow-medium'
                );
            }
        }
    }, 300);
}



/**
 * Wrap uk-* tables in a div.uk-overflow-auto
 * @todo fix?
 */
function makeUIkitTablesResponsive() {
    setTimeout(()=> {
        let tables = document.querySelectorAll('.uk-table');
        for (let i=0; i < tables.length; i++) {
            // wrapInOverflow(tables[i]);
            let org_html = tables[i].innerHTML;
            let new_html = '<div class="uk-overflow-auto">' + org_html + '</div>';
            setTimeout(()=> { tables[i].innerHTML = new_html; }, 100);
        }
    }, 600);
}

function wrapInOverflow(element) {
    // element = document.querySelector(element);
    let org_html = element.innerHTML;
    let new_html = '<div class="uk-overflow-auto">' + org_html + '</div>';
    element.innerHTML = new_html;
}
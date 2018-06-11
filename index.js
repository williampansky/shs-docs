import fs from 'fs';
import _ from 'lodash';
import prism from './src/static/js/prism.custom.js';
import treeview from './src/static/js/prism-treeview.js';
import {Settings} from './src/static/js/localSettings';

import {
    sidebarScrollListener, 
    moveSidebarToPosition
} from './src/static/js/sidebarposition';

import {
    buildNav,
    fixBrokenHrefs,
    fixBrokenIDs,
    addNavHeader,
    makeUIkitTables,
    addShadows,
    centerSmallImages,
    // wordBreakLongTableTDs,
    formatDate
} from './src/static/js/main';

window.onload = ()=> {
    sidebarScrollListener();
    moveSidebarToPosition();

    if (document.body.classList.contains('readme')) {
        const promises = [];
        promises.push(buildNav());
        Promise.all(promises).then(()=> {
            fixBrokenHrefs();
            fixBrokenIDs();
            addNavHeader();
            makeUIkitTables();
        }, (err)=> {
            console.log(err);
        });
    }

    document.querySelector('footer time').innerHTML = formatDate();

    // init & apply settings
    Settings.init();
}

/**
 * "document.ready"
 */
document.addEventListener('DOMContentLoaded', ()=> {
    if (document.body.classList.contains('readme')) {
        addShadows();
        centerSmallImages();
    }

    if (document.body.classList.contains('jsdoc')) {
        makeUIkitTables();
        // wordBreakLongTableTDs();
    }
});
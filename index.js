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
    buildTutorialNav,
    fixBrokenHrefs,
    fixBrokenIDs,
    createTutorialIDs,
    fixBrokenTutorialIDs,
    addNavHeader,
    addTutorialNavHeader,
    makeUIkitTables,
    addShadows,
    centerSmallerImages,
    // wordBreakLongTableTDs,
    formatDate,
    // removeDuplicateTutorialH1s,
    enableScrollSpy
} from './src/static/js/main';

window.onload = ()=> {
    sidebarScrollListener();
    moveSidebarToPosition();

    // window.onload functions to call for readme pages
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

    // window.onload functions to call for jsdoc tutorial pages
    if (document.querySelector('.tutorial')) {
        // createTutorialIDs();
        fixBrokenTutorialIDs();

        const promises = [];
        promises.push(buildTutorialNav());
        Promise.all(promises).then(()=> {
            // fixBrokenHrefs();
            // fixBrokenIDs();
            addTutorialNavHeader();
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
    // document.ready functions to call for readme pages
    if (document.body.classList.contains('readme')) {
        addShadows();
        centerSmallerImages();
    }

    // document.ready functions to call for jsdoc pages
    if (document.body.classList.contains('jsdoc')) {
        makeUIkitTables();
        enableScrollSpy();
        addShadows();
        centerSmallerImages();
    }

    // document.ready functions to call for jsdoc tutorial pages
    if (document.querySelector('.tutorial')) {
    }
});
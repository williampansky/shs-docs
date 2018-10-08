/* eslint-disable */
const fs                = require('fs');
const path              = require('path');
const {google}          = require('googleapis');
const authentication    = require('./authentication');

const glob = require('glob-fs')({ gitignore: true });
const cheerio = require('cheerio');

const googleSheetId     = '1XmQdYQgEoxSexy2mHi-weH6BTrm79z95-nQxDxr9ld0';
const googleSheetRange  = 'All Components!I2:I5';

// https://stackoverflow.com/a/6960795
glob.readdir('../../../../example/dist/**/*.html', function (err, files) {
    files
        .filter(function(file) { return path.extname(file) === '.html'; })
        .forEach(function(file) { fs.readFile(file, 'utf-8', function(err, contents) { inspectFile(contents); }); });
});
// https://stackoverflow.com/a/6960795
function inspectFile(contents) {
    try {
        const $ = cheerio.load(contents.replace(/\s\s+/g, ' '));
        // const $ = cheerio.load(contents);
        if ($('#module').length) {
            const status = {
                module:  $('h1.uk-article-title').text().replace(/( )+/g, ''),
                exports: $('#componentSource').text().replace(/( )+/g, ''),
                version: $('#componentVersion').text().replace(/( )+/g, ''),
                phase:   $('#componentPhase').text().replace(/( )+/g, '')
            };

            console.log(status);
            // return status;
//             console.log(
// `@module: ${$('h1.uk-article-title').text()}
// @exports:${$('#componentSource').text()}
// @version:${$('#componentVersion').text()}
// @phase:  ${$('#componentPhase').text()}
// `
//             );
        }
    } catch (e) {
        console.log(contents);
        console.log('cheerio.load error:: ' + e) // handle error
    }
}

function getData(auth) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
        auth:           auth,
        spreadsheetId:  googleSheetId,
        range:          googleSheetRange,
    }, (err, response) => {
        if (err) {
            console.log(`
=========================|
The API returned an error: ${err}
=========================|
            `);
            return;
        };

        var rows = response.data.values;
        // console.log(rows);
        if (rows.length === 0) {
            console.log('No data found.');
        } else {
            for (var i = 0; i < rows.length; i++) {
                // console.log(rows[i]);
                console.log('Version: ' + rows[i].join(', '));
            }
        }
    });
}




/**
 * @summary Converts a number to the appropriate phase string.
 * @function convertNumbertoComponentPhase
 * @param {Number} number Number to convert to phase string.
 */
function convertNumbertoComponentPhase(number) {
    let result;

    switch (number) {
        case 1 || 1.0:
            result = 'Phase 1 » Ideation & Initiation';
            break;
        case 1.1:
            result = 'Phase 1.1 » Conception';
            break;
        case 1.2:
            result = 'Phase 1.2 » Definition';
            break;
        case 1.3:
            result = 'Phase 1.3 » Requirements';
            break;
        case 2:
            result = 'Phase 2 » Alpha | Prototype';
            break;
        case 2.1:
            result = 'Phase 2.1 » Sekelton';
            break;
        case 2.2:
            result = 'Phase 2.2 » Linted';
            break;
        case 2.3:
            result = 'Phase 2.3 » Unit Testing';
            break;
        case 3:
            result = 'Phase 3 » Beta | Integration';
            break;
        case 3.1:
            result = 'Phase 3.1 » Code Evolution';
            break;
        case 3.2:
            result = 'Phase 3.2 » App Integration';
            break;
        case 3.3:
            result = 'Phase 3.3 » Advanced Testing';
            break;
        case 4:
            result = 'Phase 4 » Peer Review';
            break;
        case 5:
            result = 'Phase 5 » MVP Release';
            break;
    }

    return result;
}




/**
 * @summary Pushes component version data from `getComponentVersion` to google sheets.
 * @function updateComponentVersion
 * @param {Object} auth Authentication credentials
 */
function updateComponentVersion(auth) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.update({
        auth:               auth,
        spreadsheetId:      googleSheetId,
        range:              'All Components!32:32',
        valueInputOption:   'USER_ENTERED',
        resource: {
            values: [
                ['Void', 'Canvas', 'Website'],
            ]
        }
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        } else {
            console.log('Updated');
        }
    });
}


function getComponentName(componentName) {
    // componentName = [0].tags.name;
    return readCustomTagsFile([0].tags.name);
}
// getComponentName();

function getComponentFilepath(componentPath) {
    let dir = '../src/components/' + componentPath + '/';

    fs.readdirSync(dir).forEach((err, file)=> {
        if (err)
            return console.error(err);
        
        console.log(path.join('src/components/' + componentPath, file));
    });
}

function getComponentVersion(componentVersion) {
    return componentVersion;
}


// grabs custom tag data from parsed.json and pushes it to datalist.tmpl;
function readCustomTagsFile() {
    fs.readFile('./example/parsed.json', { encoding: 'utf8' }, function(err, data) {
        if (err) throw err;

        try {
            data = JSON.parse(data);
        } catch (ex) {
            console.log('Error parsing json');
            return;
        }

        return data;
    });
}

function getComponentName() {
    fs.readFile('./example/parsed.json', { encoding: 'utf8' }, function(err, data) {
        if (err) throw err;

        try {
            data = JSON.parse(data);
        } catch (ex) {
            console.log('Error parsing json');
            return;
        }
        
        // return data;
        for (let i=0; i < data[0].tags.length; i++) {
            console.log('@' + data[0].tags[i].tag + ':: ' + data[0].tags[i].name);
        }
    });
}
// getComponentName();


/**
 * @summary Pushes component status data to google sheets.
 * 
 * @function updateComponentStatus
 * @param {Object} auth Authentication credentials.
 * 
 * @description
 * Sheet columns ordered as follows:
 * ['COMPONENT NAME', 'FILEPATH', 'VERSION', 'STATUS']
 */
function updateComponentStatus(auth) {
    let parsedName = readCustomTagsFile();
    let parsedPath = 'src/components/nav/TheNotebook.vue';
    let parsedVersion = '0.4.3';
    let parsedPhase = 5;
    var sheets = google.sheets('v4');

    sheets.spreadsheets.values.update({
        auth:               auth,
        spreadsheetId:      googleSheetId,
        range:              'All Components!',
        valueInputOption:   'USER_ENTERED',
        resource: {
            values: [
                [
                    getComponentName(parsedName),               // COMPONENT NAME
                    getComponentFilepath(parsedPath),           // FILEPATH
                    getComponentVersion(parsedVersion),         // VERSION
                    convertNumbertoComponentPhase(parsedPhase)  // STATUS
                ],
            ]
        }
    }, (err, response) => {
        if (err) {
            console.log(`
=========================|
The API returned an error: ${err}
=========================|
            `);
            return;
        } else {
            console.log('Component Status Updated.');
        }
    });
}

// authentication.authenticate().then((auth)=>{
    // getData(auth);
//     // updateComponentStatus(auth);
//     // getComponentFilepath('buttons');
//     // getComponentFilepath('forms');
//     // getComponentFilepath('modals');
//     // getComponentFilepath('nav');
//     // getComponentFilepath('typography');
// });
/* eslint-enable */

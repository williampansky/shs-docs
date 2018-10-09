const fs = require('fs');
const path = require('path');
const util = require('util');
const glob = require('glob-fs')({ gitignore: true });
const cheerio = require('cheerio');

// https://stackoverflow.com/a/6960795
const parseGlob = './example/dist/**/module-*.html';
const jsonFile = './src/static/progress.json';
const parseDir2 = glob.readdir(parseGlob, (err, files)=> {
    fs.writeFile(jsonFile, '[' + '\n', ()=> { }); // clear file

    let counter = files.length;

    files.filter((file) => {
        return path.extname(file) === '.html'; 
    }).forEach((file, index)=> {
        setTimeout(()=> {
            // console.log(counter + ' :: ' + file);
            // console.log('counter == ' + counter);

            fs.readFile(file, 'utf-8', (err, contents)=> {
                if (err) return console.log(err);

                try {
                    const $ = cheerio.load(contents.replace(/\s\s+/g, ' ')); // remove '\n'
                    // const $ = cheerio.load(contents);
                    if ($('#module')) {
                        let regexRemove = /( )+/g;
                        let moduleText  = $('#module h1.uk-article-title')
                                            .text().replace(regexRemove, '');
                        let exportsText = $('#module #componentSource')
                                            .text().replace(regexRemove, '');
                        let versionText = $('#module #componentVersion')
                                            .text().replace(regexRemove, '');
                        let phaseText   = $('#module #componentPhase')
                                            .text().replace(regexRemove, '');
                        const status = {
                            component: {
                                module:  moduleText,
                                exports: exportsText,
                                version: versionText,
                                phase:   phaseText
                            }
                        };
            
                        let data = JSON.stringify(status);
            
                        // console.log('counter == ' + counter);
                        if (counter === 1)
                            data = JSON.stringify(status) + '\n' + ']';
                        else
                            data = JSON.stringify(status) + ', \n';
            
                        fs.appendFile(jsonFile, data, err => {
                            if (err) return console.log(err);
                        });
                        // console.log(JSON.stringify(status));
                    }

                    counter -= 1;
                    // console.log('counter -= ' + counter);
                } catch (e) {
                    console.log('cheerio.load error:: ' + e); // handle error
                }
            });
        });
    });
});

// https://stackoverflow.com/a/6960795
function inspectFile(contents, counter) {
    try {
        const $ = cheerio.load(contents.replace(/\s\s+/g, ' ')); // remove '\n'
        // const $ = cheerio.load(contents);
        if ($('#module')) {
            let regexRemove = /( )+/g;
            let moduleText  = $('#module h1.uk-article-title')
                                .text().replace(regexRemove, '');
            let exportsText = $('#module #componentSource')
                                .text().replace(regexRemove, '');
            let versionText = $('#module #componentVersion')
                                .text().replace(regexRemove, '');
            let phaseText   = $('#module #componentPhase')
                                .text().replace(regexRemove, '');
            const status = {
                module:  moduleText,
                exports: exportsText,
                version: versionText,
                phase:   phaseText
            };

            let data;

            if (counter == 1)
                data = JSON.stringify(status) + '\n';
            else
                data = JSON.stringify(status) + ', \n';

            fs.appendFile('text.json', data, err => {
                if (err) return console.log(err);
            });
            console.log(JSON.stringify(status));

            return counter;

            // let wrappedStatus = '[' + status + ']';

            // console.log(JSON.stringify(status));
            // writeFile(status);
            // writeFile(JSON.parse(status));
            // return status;
            // return {status};
        } else { return null; }
    } catch (e) {
        console.log('cheerio.load error:: ' + e); // handle error
    }
}

async function writeFile(contents, done) {
    await parseDir2;
    let obj = {
        component: contents,
        // toJSON() { return this; }
    };
    // var obj = {};
    // obj.module = contents.module;
    // obj.exports = contents.exports;
    // let data = JSON.stringify(contents);
    let data = JSON.stringify(obj) + ', \n';
    console.log(obj);
    fs.appendFile('text.json', data, err => {
        if (err) return console.log(err);
    });
}

function appendFinal() {
    console.log('DONE DONE DONE');
    fs.appendFile('text.json', ']', (err)=> {
        if (err) return console.log(err);
    }); // close array
}
const axios = require('axios');
// const jsonData = require('../progress.json');
// const wrapper = document.querySelector('#componentProgress');

export const renderComponentProgress = (json)=> {
    return axios({
        method: 'get',
        url: json,
        responseType:'json',
    })
    .then(response => {
        for (let i=0; i < response.data.length; i++)
            postToTable(response.data[i].component);
    })
    .catch(error => {
        console.log(error);
    });
}

export const postToTable = data => {
    let table = document.querySelector('table tbody');
    data = data.component;
    
    let formattedData = document.createElement('tr');
    formattedData.innerHTML = `
        <td class="uk-text-nowrap">
            <a href="module-${data.module}.html">
                ${data.module}
            </a>
        </td>
        <td class="uk-text-nowrap">
            ${data.exports}
        </td>
        <td class="uk-text-center uk-text-nowrap">
            <span class="uk-text-meta">v</span>${data.version}
        </td>
        <td
        data-phase="${data.phase}"
        class="uk-text-center uk-text-nowrap">
            ${data.phase}
        </td>`;
    
    table.append(formattedData);
}

/**
 * @summary Converts a number to the appropriate phase string.
 * @function convertNumbertoComponentPhase
 * @param {Number} number Number to convert to phase string.
 */
const convertNumbertoComponentPhase = number => {
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

// const test = data => {
//     // let table = document.querySelector('table tbody');
//     for (let i=0; i < data.length; i++)
//         console.log(data[i].component.module);
//         // data = data[i].component;
    
// }
// // console.log(jsonData.length);
// test(jsonData);
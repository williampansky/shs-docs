/**
 * "document.ready"
 */
document.addEventListener('DOMContentLoaded', ()=> {
    makeUIkitTables();
    wordBreakLongTableTDs();
    // makeUIkitTablesResponsive();
});



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
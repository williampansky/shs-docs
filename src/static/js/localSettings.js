/**
 * @module Settings
 */
export const Settings = {
    // type: 'noLigatures' || 'withLigatures',
    vars: {
        type: {
            no_ligatures: document.getElementById('type_noLigatures'),
            with_ligatures: document.getElementById('type_withLigatures'),
        },
        // syntax: {
        //     light: document.getElementById('theme_light'),
        //     onedark: document.getElementById('theme_dark'),
        // }
    },

    /**
     * @summary Initiate local user settings via localStorage.
     * @method init
     */
    init: ()=> {
        Settings.setSettings();
        Settings.applySettings();
        Settings.handleFormRadios();
    },

    /**
     * @summary Uses case-switching to determine key for `localStorage.getItem(key)`.
     * @method getSettings
     */
    getSettings: setting => {
        switch (setting) {
            case 'type':
                setting = localStorage.getItem('type');
            break;

            case 'syntax':
                setting = localStorage.getItem('syntax');
            break;
        
            default:
            break;
        }

        return setting;
    },

    /**
     * @summary Sets localStorage via `#settingsModal`.
     * @method setSettings
     * @example localStorage.setItem('type', 'ligatures');
     */
    setSettings: ()=> {
        const settingsSave = document.getElementById('settingsSave');

        settingsSave.addEventListener('click', ()=> {
            if (Settings.vars.type.with_ligatures.checked) {
                localStorage.setItem('type', 'ligatures');
                setTimeout(()=> { Settings.applySettings(); }, 300);
            } else {
                localStorage.setItem('type', 'default');
                setTimeout(()=> { Settings.applySettings(); }, 300);
            }

            // if (Settings.vars.syntax.onedark.checked) {
            //     localStorage.setItem('syntax', 'dark');
            //     setTimeout(()=> { Settings.applySettings(); }, 300);
            // } else {
            //     localStorage.setItem('syntax', 'light');
            //     setTimeout(()=> { Settings.applySettings(); }, 300);
            // }
        });
    },

    /**
     * @method applySettings
     */
    applySettings: ()=> {
        const type = Settings.getSettings('type');
        const ligatures = document.querySelector('link[data-settings="type"]');
        switch (type) {
            case 'ligatures':
                if (ligatures !== null && ligatures !== 'undefined') {
                    if (!Settings.vars.type.with_ligatures.checked)
                        ligatures.remove();
                } else {
                    let style = document.createElement('link');
                    style.rel = 'stylesheet';
                    style.href = 'fonts/FiraCode/fira_code.css';
                    style.setAttribute('data-settings', 'type');
                    document.head.append(style);
                }
            break;
        
            default:
                if (ligatures !== null && ligatures !== 'undefined')
                    ligatures.remove();
            break;
        }

        // const syntaxTheme = Settings.getSettings('syntax');
        // const syntax = document.querySelector('link[data-settings="syntax"]');
        // switch (syntaxTheme) {
        //     case 'onedark':
        //         if (syntax !== null && syntax !== 'undefined') {
        //             if (!Settings.vars.syntax.onedark.checked)
        //                 syntax.remove();
        //         } else {
        //             let style = document.createElement('link');
        //             style.rel = 'stylesheet';
        //             style.href = 'css/prism.onedark.css';
        //             style.setAttribute('data-settings', 'syntax');
        //             document.head.append(style);
        //         }
        //     break;
        
        //     default:
        //         if (syntax !== null && syntax !== 'undefined')
        //             syntax.remove();
        //     break;
        // }
    },


    /**
     * @method handleFormRadios
     */
    handleFormRadios: ()=> {
        const type = Settings.getSettings('type');
        switch (type) {
            case 'ligatures':
                Settings.vars.type.with_ligatures.setAttribute('checked', '');
                Settings.vars.type.no_ligatures.removeAttribute('checked', '');
            break;
                
            default:
                Settings.vars.type.no_ligatures.setAttribute('checked', '');
                Settings.vars.type.with_ligatures.removeAttribute('checked', '');
            break;
        }

        // const syntax = Settings.getSettings('syntax');
        // switch (syntax) {
        //     case 'onedark':
        //         Settings.vars.syntax.onedark.setAttribute('checked', '');
        //         Settings.vars.syntax.light.removeAttribute('checked', '');
        //     break;
                
        //     default:
        //         Settings.vars.syntax.light.setAttribute('checked', '');
        //         Settings.vars.syntax.onedark.removeAttribute('checked', '');
        //     break;
        // }
    }
}
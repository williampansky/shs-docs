/**
 * @module Settings
 */
export const Settings = {
    // type: 'noLigatures' || 'withLigatures',
    vars: {
        type: {
            no_ligatures:   document.getElementById('type_noLigatures'),
            with_ligatures: document.getElementById('type_withLigatures')
        },
        syntax: {
            light:      document.getElementById('theme_light'),
            github:     document.getElementById('theme_github'),
            dark:       document.getElementById('theme_dark'),
            xonokai:    document.getElementById('theme_xonokai')
        }
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
            /**
             * @name type
             * @memberof setSettings
             * @inner
             */
            if (Settings.vars.type.with_ligatures.checked) {
                localStorage.setItem('type', 'ligatures');
                setTimeout(()=> { Settings.applySettings(); }, 300);
            } else {
                localStorage.setItem('type', 'default');
                setTimeout(()=> { Settings.applySettings(); }, 300);
            }

            /**
             * @name syntax
             * @memberof setSettings
             * @inner
             */
            if (Settings.vars.syntax.dark.checked) {
                localStorage.setItem('syntax', 'dark');
                setTimeout(()=> { Settings.applySettings(); }, 300);
            } else if (Settings.vars.syntax.xonokai.checked) {
                localStorage.setItem('syntax', 'xonokai');
                setTimeout(()=> { Settings.applySettings(); }, 300);
            } else if (Settings.vars.syntax.github.checked) {
                localStorage.setItem('syntax', 'github');
                setTimeout(()=> { Settings.applySettings(); }, 300);
            } else {
                localStorage.setItem('syntax', 'light');
                setTimeout(()=> { Settings.applySettings(); }, 300);
            }

            // refresh and settings changes
            setTimeout(()=> {
                window.location.reload();
            }, 600);
        });
    },

    /**
     * @method applySettings
     */
    applySettings: ()=> {
        /**
         * @name type
         * @memberof applySettings
         * @inner
         */
        const type      = Settings.getSettings('type');
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

        /**
         * @name syntax
         * @memberof applySettings
         * @inner
         */
        const syntaxTheme = Settings.getSettings('syntax');
        const syntax      = document.querySelector('link[data-settings="syntax"]');
        switch (syntaxTheme) {
            case 'dark':
                if (syntax !== null && syntax !== 'undefined') {
                    if (!Settings.vars.syntax.dark.checked) syntax.remove();
                } else {
                    let style  = document.createElement('link');
                    style.rel  = 'stylesheet';
                    style.href = 'css/prism.onedark.css';
                    style.setAttribute('data-settings', 'syntax');
                    document.head.append(style);
                }
            break;
        
            case 'xonokai':
                if (syntax !== null && syntax !== 'undefined') {
                    if (!Settings.vars.syntax.xonokai.checked) syntax.remove();
                } else {
                    let style  = document.createElement('link');
                    style.rel  = 'stylesheet';
                    style.href = 'css/prism.xonokai.css';
                    style.setAttribute('data-settings', 'syntax');
                    document.head.append(style);
                }
            break;
        
            case 'github':
                if (syntax !== null && syntax !== 'undefined') {
                    if (!Settings.vars.syntax.github.checked) syntax.remove();
                } else {
                    let style  = document.createElement('link');
                    style.rel  = 'stylesheet';
                    style.href = 'css/prism.ghcolors.css';
                    style.setAttribute('data-settings', 'syntax');
                    document.head.append(style);
                }
            break;
        
            default:
                if (syntax !== null && syntax !== 'undefined') {
                    if (!Settings.vars.syntax.light.checked) syntax.remove();
                } else {
                    let style  = document.createElement('link');
                    style.rel  = 'stylesheet';
                    style.href = 'css/prism.default.css';
                    style.setAttribute('data-settings', 'syntax');
                    document.head.append(style);
                }
            break;
        }
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

        const syntax = Settings.getSettings('syntax');
        switch (syntax) {
            case 'dark':
                Settings.vars.syntax.dark.setAttribute('checked', '');
                Settings.vars.syntax.xonokai.removeAttribute('checked', '');
                Settings.vars.syntax.github.removeAttribute('checked', '');
                Settings.vars.syntax.light.removeAttribute('checked', '');
            break;
                
            case 'xonokai':
                Settings.vars.syntax.xonokai.setAttribute('checked', '');
                Settings.vars.syntax.dark.removeAttribute('checked', '');
                Settings.vars.syntax.github.removeAttribute('checked', '');
                Settings.vars.syntax.light.removeAttribute('checked', '');
            break;
                
            case 'github':
                Settings.vars.syntax.github.setAttribute('checked', '');
                Settings.vars.syntax.dark.removeAttribute('checked', '');
                Settings.vars.syntax.xonokai.removeAttribute('checked', '');
                Settings.vars.syntax.light.removeAttribute('checked', '');
            break;
                
            default:
                Settings.vars.syntax.light.setAttribute('checked', '');
                Settings.vars.syntax.github.removeAttribute('checked', '');
                Settings.vars.syntax.dark.removeAttribute('checked', '');
                Settings.vars.syntax.xonokai.removeAttribute('checked', '');
            break;
        }
    }
}
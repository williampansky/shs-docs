module.exports = {
    plugins: [
        'node_modules/jsdoc-vue-component',
        'plugins/markdown'
    ],
    'jsdoc-vue-component': {
        log: false
    },
    markdown: {
        tags: [
            'author', 
            'classdesc', 
            'description', 
            'param', 
            'property', 
            'returns', 
            'see', 
            'throws', 
            'vue'
        ]
    },
    tags: {
        allowUnknownTags: true,
        dictionaries: [
            'jsdoc', 
            'closure'
        ]
    },
    recurseDepth: 10,
    source: {
        include: [
            'example/'
        ],
        exclude: [
            'src/static/js/bundle.js',
            'src/static/js/clipboard.min.js',
            'src/static/js/linenumber.js',
            'src/static/js/highlight.pack.js',
            'src/static/js/prism-treeview.js',
            'src/static/js/prism.custom.js',
            'src/static/js/prism.min.js',
            'node_modules'
        ],
        includePattern: '.+\\.(js|vue)$',
        excludePattern: '(node_modules/|dist|.min)'
    },
    opts: {
        template:     'src',
        readme:       'example/README.md',
        tutorials:    'example/tutorials',
        encoding:     'utf8',
        destination:  'example/dist',
        recurse:      true,
        verbose:      true
    },
    templates: {
        cleverLinks:    true,
        monospaceLinks: true,
        default: {
            staticFiles: {
                include: [
                    'example/img'
                ]
            }
        }
    },
    docdash: {
        project_title: 'SHS Docs',
        settings_background: '',
        debug: false,
        showStyleguide: true,
        styleguide: {
            colors: {
                primary: [
                    { name: '$color-primary',               hex: '#D7AE45' },
                    { name: '$color-primary-hover',         hex: '#EEC33F' },
                ],
                secondary: [
                    { name: '$color-secondary',             hex: '#D0021B' },
                    { name: '$color-secondary-hover',       hex: '#f90926' },
                    { name: '$color-secondary-alt',         hex: '#C72113' },
                    { name: '$color-secondary-alt-hover',   hex: '#FC3C2C' },
                ],
                neutral: {
                    black: [
                        { name: '$color-black',             hex: '#000' },
                        { name: '$color-black-lighten',     hex: '#1C1C1C' },
                        { name: '$color-black-alt',         hex: '#333333' },
                    ],
                    white: [
                        { name: '$color-white',             hex: '#fff' },
                        { name: '$color-white-alt',         hex: '#F6F6F6' },
                    ],
                    gray: [
                        { name: '$color-gray-lighten-40',   hex: '#EBEBEB' },
                        { name: '$color-gray-lighten-20',   hex: '#DFDFDF' },
                        { name: '$color-gray',              hex: '#979797' },
                        { name: '$color-gray-darken-20',    hex: '#707070' },
                        { name: '$color-gray-darken-40',    hex: '#4A4A4A' },
                    ],
                },
                supplementary: [
                    { name: '$color-spa',                   hex: '#4F89CD' },
                    { name: '$color-spa-alt',               hex: '#346CAE' },

                    { name: '$color-dining',                hex: '#0C9E70' },
                    { name: '$color-dining-alt',            hex: '#087955' },

                    { name: '$color-enhancement',           hex: '#847A71' },
                    { name: '$color-enhancement-alt',       hex: '#5D564E' },

                    { name: '$color-event',                 hex: '#61506E' },
                    { name: '$color-event-alt',             hex: '#4A3858' },
                ],
                event: [
                    { name: '$color-active',                hex: '#4F89CD' },
                    { name: '$color-alert',                 hex: '#FAA05A' },
                    { name: '$color-error',                 hex: '#D0021B' },
                    { name: '$color-success',               hex: '#0C9E70' },
                ]
            },
            fonts: {
                cdn: 'https://fast.fonts.net/cssapi/eafcd160-f807-4cd7-bed7-811ca79de237.css',
                rootSize:           '12px',
                rootLineHeight:     '1.675',
                rootLetterSpacing:  '0.25px',
                families: [
                    { 
                        var: '$font-primary',
                        name: 'Trade Gothic Roman',
                        family: 'Trade Gothic LT W01 Roman, sans-serif'
                    },
                    { 
                        var: '$font-condensed',
                        name: 'Trade Gothic Condensed',
                        family: 'Trade Gothic LT W01 Cn No-_18, sans-serif;'
                    },
                    { 
                        var: '$font-bold-condensed',
                        name: 'Trade Gothic Bold Condensed',
                        family: 'Trade Gothic LT W01 Bd CnNo-20, sans-serif;'
                    },
                ]
            }
        },
        links: {
            repo: {
                type: 'git',
                url:  'git.sabre.com'
            },
            slack: {
                dx:         'shs-dx',
                project_id: 'CCKUXQ2TG'
            }
        },
        menu: {
            // 'Repository': {
            //     href:     'yourrepo.host.com',
            //     target:   '_blank',
            //     id:       'repository',
            //     class:    ''
            // }
        },
        static: true,
        sort:   true,
        disqus: '',
		openGraph: {
			title:     '',
			site_name: '',
			type:      '',
			image:     '',
			url:       ''
		},
		meta: {
			title:        '',
			description:  '',
			keyword:      ''
		},
        search:   true,
        collapse: true,
        typedefs: true,
        removeQuotes: 'none',
        scripts: [],
    }
}
# Markdown Sample File
> An example of a documentation.html partial

## Introduction

### Who is Mandarin Oriental?
Mandarin Oriental Hotel Group (MOHG; Chinese: 文華東方酒店), a member of the Jardine Matheson Group, is an international hotel investment and management group with luxury hotels, resorts and residences in Asia, Europe and the Americas [[Wikipedia][MOHG Wiki Entry]].

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac fringilla nunc, vel pellentesque ante. Vestibulum in luctus nisi. Phasellus eget libero vitae urna convallis suscipit. Pellentesque interdum iaculis nisi quis aliquam. Fusce sit amet lectus et risus aliquet blandit volutpat vitae elit. Suspendisse ac lacus a tortor facilisis semper. Nullam laoreet leo eu nisl porta pellentesque. Suspendisse faucibus nibh nec tortor luctus placerat.

### The Project, At a Glance
You can think of the `mandarinoriental_com` repository project as a single entity with multiple parts (in regards to development; i.e. individual package.json, gulpfile.js, Sass, JS, etc files):
- Core _(Website as a whole)_
	- PHP
	- XML
	- XSLT
	- JavaScript (jQuery, _minified_ but _**not run through Babel**_)
	- Sass
- CBE _(**C**ustom **B**ooking **E**ngine)_
	- Vue.js
	- JavaScript (ES6+, compiled with Webpack[v3]/Babel[v6])
	- Sass
- Gallery-V2 _(Upgraded single-property media gallery)_
	- Vue.js
	- JavaScript (ES6+, compiled with Webpack[v3]/Babel[v6])
	- Sass


## JavaScript Docs
See [jsDocs][jsDocs] for JavaScript source-code documentation; compiled using 
node to parse [JSdoc annotation comments][useJSdoc].

## Version Control

Be sure to set an `svn:ignore` flag on the /assets folder for new builds.

Via the command line, follow these steps:

- `cd` to the project root folder
- `svn delete --keep-local assets`
	- (this removes the /assets folder from version control but leaves the local folder and contents alone)
- Commit your changes to SVN
- `svn propedit svn:ignore .`
	- (this should open up the current ignores list)
- Add `assets` to the list and save the file
- Commit the propedit changes to SVN

If you get an error when running propedit then you need to update your CLI profile to set a preferred editor for that command. If you wanted to edit SVN config files with the nano editor, for instance, you would run this:

- `cd ~`
- `nano .bash_profile`
- `export SVN_EDITOR=nano`

## Symlink

In terminal/cmd, create a symlink named 'cbe' in your `./templates/main/css/scss` folder pointing to `./templates/main/cbe/css/scss`

## ?SHOWXML content

```treeview
root/templates/main/
    └── includes/
    	└── mandarin/
    		└── global/
        		└── template-includes.xsl
```

The Mandarin admin delivers content via the `?SHOWXML` feed, in much the same way that traditional CDE does.

## Module templating

We've utilized a modular approach to file/include development that helps keep files and content node / phpclasses aligned. Though this approach leads to the development of a large number of includes, it produces reusable chunks of dynamic templating for global use. 

Components and template files are configured to support admin-set module ordering and placement, on any given page. Templating has flexible xsl logic to support these dynamic requirements.

## Requirements 

This project requires a corresponding database and CMS, such as the chaincmsseed project.

<!-- LINKS -->
[jsDocs]: ./dist/js/index.html
[useJSdoc]: http://usejsdoc.org/
[MOHG Wiki Entry]: https://www.wikiwand.com/en/Mandarin_Oriental_Hotel_Group
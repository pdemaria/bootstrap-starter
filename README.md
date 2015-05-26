Bootstrap Starter
=================

A basic, responsive, Bootstrap 3.0 template-building environment.. Most likely production ready. The ultimate goal of this project is to create a fairly snappy, bulletproof template-authoring environment with some of my favorite stuff.

##Getting Started
Below follows basic setup, you can go ahead and do your worst just cloning the project, but to work with SASS and really customize things you'll want to follow these steps:
1. Visit https://help.github.com/articles/set-up-git/ for information on setting up Git.
2. Download the Git client (for [Mac](https://windows.github.com/) OR for [Windows](https://windows.github.com/) )
3. You're going to get your hands dirty in the command line and install:
  1. Node.js ([nodejs.org/](http://nodejs.org/))
  2. NPM (which comes with Node.js, but visit [www.npmjs.org](https://www.npmjs.org/) for more information)
  3. Bower (installed using NPM, see [bower.io](http://bower.io/))
  4. Grunt (installed using NPM, see [gruntjs.com](http://gruntjs.com/getting-started))

##Next Steps
`cd` to the bootstrap-starter directory and enter the following command to install all the dependencies and the whatnot: 
``` bash
npm install
``` 
This runs through the `package.json` file and installs all the dependencies this project requires.
 
Next you'll want to run grunt, you can either run: 
``` bash
 grunt build -v 
```
 OR 
 ``` bash
 grunt -v 
 ``` 
 The build task does just that, it builds the thing out, compiles SASS, etc... No watch task, no live reload.
 
 Grunt runs verbose (thus the `-v`, verbose clues you into the errors and the whatnot, down to filenames and line-numbers). A `watch` task will refresh your page/s as you edit (uses `liveReload.js`, install __[http://livereload.com/](the appropriate extension for your browser)__, you'll thank me later) if you're set up for the correct port (`liveReload` uses 35729 by default): `localhost:35729/index.html`.
  
And that's it! Do your worst and customize this thing out, if you do things the hard way you can:
* Customize Bootstrap via `bootstrap-starter/sass/style.scss` (be sure to read the comments, not all variables should be edited, because math)
* Extend Bootstrap and create your own classes using SASS (examples can be found in `style.scss`)
* Quickly develop you're own production ready (I hope) templates and HTML

##Optional
__Bower__ is optional... The components that come with the latest version of this thing should be kept up to date as I work through this thing and get through the kinks. You can update them yourself `cd`-ing to the root folder for this project and running:
``` bash
bower install
```

##To-Do
- [x] ~~Organize dependancies into production-ready directories using Grunt and whatever Tasks might be needed to automate~~
- [x] ~~Add Autoprefixer to build process for Bootstrap CSS~~
- [ ] Add optional versions of index.html, fixed and static header, sidebars, thumbnail grids, common UI etc.
- [ ] Flesh out the SASS components to do some things with sprites, backgrounds etc
- [ ] Fork the Dev branch of this repo (on my to-do list) for shared access and staging to Master
- [ ] Declare production-ready, ducks row in, t's crossed i's dotted

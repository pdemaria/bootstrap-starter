Bootstrap Starter
=================

A basic, responsive, Bootstrap 3.0 template-building environment.. Most likely production ready. The ultimate goal of this project is to create a fairly bulletproof template.

##Getting Started

###The Wussy Way
1. Just Download the Master Zip, and work with whatever resides in the bootstrap starter folder that contains `index.html`, I'll try and keep it up to date, and tidy enough to just dump somewhere and edit. Bootstrap is Vanilla, Javascript and CSS is minified however.. So you may want to get your hands dirty.

###The Way Way
1. Visit https://help.github.com/articles/set-up-git/ for information on setting up Git.
2. Download the Git client (for [https://windows.github.com/](Mac) OR for [https://windows.github.com/](Windows) )
3. You're going to get your hands dirty in the command line and install:
  1. Node.js ([http://nodejs.org/](nodejs.org/))
  2. NPM (which comes with Node.js, but visit [https://www.npmjs.org/](www.npmjs.org) for more information)
  3. Bower (installed using NPM, see [http://bower.io/](bower.io))
  4. Grunt (installed using NPM, see [http://gruntjs.com/getting-started](gruntjs.com))
4. `cd` to the bootstrap-starter directory and enter the following command to install all the dependencies and the whatnot: 
``` bash
npm install
``` 
This runs through the `package.json` file and installs all the dependencies this project requires. 
5. To build out you'll want to run grunt, you can either run: 
``` bash
grunt build
``` 
OR 
``` bash
grunt -v
```
Grunt runs verbose (clueing you into the errors and the whatnot). A `watch` task will refresh your page/s as you edit (uses `liveReload.js`, install __[http://livereload.com/](the appropriate extension for your browser)__, you'll thank me later) if you're set up for the correct port (`liveReload` uses 35729 by default): `localhost:35729/index.html`. 
6. That's it! Do your worst and customize this thing out, if you do things __the Way Way__ you can:
* Customize Bootstrap via `bootstrap-starter/sass/style.scss` (be sure to read the comments, not all variables should be edited)
* Extend Bootstrap and create your own classes using SASS (examples can be found in `style.scss`)
* Quickly develop you're own production ready (I hope) templates and HTML

##Optional
__Bower__ is optional... The components that come with the latest version of this thing should be kept up to date as I work through this thing and get through the kinks. You can update them yourself `cd`-ing to the root folder for this project and running:
``` bash
bower install
```

##To-Do
- [x] Organize dependancies into production-ready directories using Grunt and whatever Tasks might be needed to automate
- [x] Add Autoprefixer to build process for Bootstrap CSS
- [ ] Fork the Dev branch of this repo (on my to-do list) for shared access and staging to Master
- [ ] Add optional versions of index.html, fixed and static header, sidebars, thumbnail grids, common UI etc.
- [ ] Declare production-ready, ducks row in, t's crossed i's dotted

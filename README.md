# reveal.js-basis
Base project which offers a build pipeline for reveal.js presentations.
If you don't know what reveal.js is, check out https://revealjs.com/#/

# Project Initialization

```
cd /path/to/your/project/folder
git clone https://github.com/olada/reveal.js-basis.git .
git submodule init
git submodule update
npm install
npm --prefix ./revealjs install ./revealjs
```

# Manual
Once you have initialized this project, run the command `npm run presentation` 
while you are in the root folder of this project. This will start the
presentation mode and your presentation will be opened in your default
browser.
Now you can edit the file `slides/slides.html`. Every time you save changes
to the _slides.html_ file, you can refresh your browser and the changes will
be loaded.

# Updating reveal.js
Updating the reveal.js part is as easy as running `git submodule update` in
the root project folder.

# How does the Gulp pipeline work?
The npm runner of _reveal.js_ spawns a web server which serves the index.html
inside of the reveal.js folder. Therefore, in essence, the goal of the pipeline 
is to copy the file `./slides/slides.html` into the reveal.js folder and
rename it to _index.html_, so it will be used by the webserver.
This is done so you can have your slides file in a separate folder in
your repository instead of forking the whole reveal.js repo. Also this is
a workaround for the fact that you cannot modify a file of a 
submodule which is managed by a foreign entity.

# Why use reveal.js (and this basis project)?
- Easy usage of distributed versioning control (since you only modify text files)
- web-based (therefore brings all the perks of web-based systems like cross-platform, no special system requirements, etc..)
- looks nice
- because you can
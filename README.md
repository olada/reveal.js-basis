# reveal.js-basis
Serves as a basis if you want to create your own slides but don't want to always clone / fork the latest version of reveal.js

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
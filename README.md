# openwebbu.github.io

## Editing this site locally

* Assets contains the js and css for the whole site
* The rest of the site can be edited in the content section
* Base layouts that the pages use can be found in layouts (and partials for helping to generate those)

* run `npm run build` when you're ready to commit back up to the website (or if serve is being weird)
* run `npm run serve` for quickly working on the site as that shows your edits live

You will need to change a variable in `node_modules/@fortawesome/fontawesome-free/scss/_variables: 

`$fa-font-path:         "../node_modules/@fortawesome/fontawesome-free/webfonts" !default;`

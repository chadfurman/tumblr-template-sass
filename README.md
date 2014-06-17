tumblr-template-sass
====================

Tumblr template using SASS, Compass, Grunt, and Bower.

## INSTALLATION
Run these commands in a terminal
 - git clone https://github.com/shadesoflight/tumblr-template-sass
 - cd tumblr-template-sass
 - npm install
 - bower install
 - grunt

Grunt will end with a watch task, recompiling the templates and sass files when you edit them.
Note that all assets are compiled into theme.tumblr, theme.js, and theme.css in the root of the repository.

 - copy the contents of theme.tumblr to the blog's "edit theme" HTML view
 - upload both theme.js and theme.css as static assets
 - add theme.js to the bottom of the tumblr theme (you'll see the script tag with an empty src attribute)
 - add theme.css to the top of the tumblr theme

For heavy editing and testing, it's good to note that inserting theme.js first means you won't have to close the assets panel.

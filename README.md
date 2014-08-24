tumblr-template-sass
====================

Tumblr template using SASS, Compass, Grunt, and Bower.

<a href="http://gaming-thrones.tumblr.com">Demo</a>

## INSTALLATION
```bash
 npm install -g bower  # bower required
 npm install -g gulp   # gulp required
 gem install compass   # compass required
 git clone https://github.com/shadesoflight/tumblr-template-sass
 cd tumblr-template-sass
 npm install
 bower install
 gulp
```

Gulp will end with a watch task, recompiling the templates and sass files when you edit them.
All assets are compiled into the build directory in the root of the cloned repository.

 - copy the contents of build/theme.tumblr to the theme's HTML editor
 - upload and insert both theme.js and theme.css as static assets

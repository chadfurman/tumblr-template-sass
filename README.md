tumblr-template-sass
====================

Tumblr template using SASS, Compass, Grunt, and Bower.

<a href="http://gaming-thrones.tumblr.com">Demo</a>

## INSTALLATION
```bash
 $ npm install -g bower  # bower required
 $ npm install -g gulp   # gulp required
 $ gem install compass   # compass required
 $ git clone https://github.com/shadesoflight/tumblr-template-sass
 $ cd tumblr-template-sass
 $ npm install
 $ bower install
 $ gulp
```

Gulp will end with a watch task, recompiling the templates and sass files when you edit them.
Note that all assets are compiled into build/theme.tumblr, build/theme.js, and build/theme.css in the root of the repository.

 - copy the contents of build/theme.tumblr/main.tumblr to the theme's HTML editor
 - upload and insert both theme.js and theme.css as static assets


## Notice
Gulp's HTML task will automatically populate your clipboard when it recompiles HTML documents (for easy paste into tumblr).
Currently, there is no way to disable this feature.  Please, be prepared.

Please backup your existing template before using this alpha version.

![Landing Page](https://raw.githubusercontent.com/ShadeLotus/tumblr-template-sass/master/screenshots/landing_page.png)
![Index Page Scrolled](https://raw.githubusercontent.com/ShadeLotus/tumblr-template-sass/master/screenshots/index_page_scrolled.png)

#tumblr-template-sass

Tumblr template using SASS, Compass, Gulp, and Bower.

## INSTALLATION
### Global Assets
I assume you have installed node & npm (node package manager):

+ https://www.ruby-lang.org/
+ http://nodejs.org/
+ https://www.npmjs.com/

### Necessary packages
```bash
 npm install -g bower  # bower required
 gem install compass   # compass required
```
*Note* When installing compass, be sure it's on your global path.  I had to symlink mine.

### Clone, setup, and gulp
```bash
 git clone https://github.com/shadesoflight/tumblr-template-sass
 cd tumblr-template-sass
 npm install
 bower install
 gulp styles
 gulp scripts
 gulp html --clipboard
```

Gulp will build the theme and put it on your clipboard to paste into your blog

*note, if the HTML task does not start, please restart the process*

All assets are compiled into the build directory in the root of the cloned repository.

A concatenated dist/theme.tumblr file is created, which contains the code to paste into your theme editor.  To have this file copied onto your clipboard automatically, use `gulp --clipboard`

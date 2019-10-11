# Simple Before and After
A WordPress plugin to create a simple grid of Before and After images.

## Requirements
* WordPress 5.2+
* PHP 7.0+

## Installation in a WordPress project
To install, download simple-before-and-after.zip from the main directory of this repo. Then add it to the plugins directory of the project and activate it.

Create one or more new Before and After posts. Add Before and After images to each post and save. For best results, images should be at least 485x200 when using the default settings.

By default, a grid displays up to six Before and After posts, selected randomly. Go to Settings > Before and After to customize the global settings for post maximum, image size,  "Before" label, and "After" label.

To display a grid on a WordPress page, use the following shortcode:
```
[simple_before_and_after]
```

Optional attributes for a given grid can be specified in the shortcode, like so:
```
[simple_before_and_after item_total="10" image_width="200" image_height="300" before_label="Meh" after_label="Wow"]
```

Individual Before and After posts can be specified with a comma-separated list of IDs in a grid, like so:
```
[simple_before_and_after ids="2345, 4567, 19"]
```

Shortcode attributes override both global custom settings and default settings. An invalid attribute falls back to the global setting.

## Usage for Development
Clone to a plugins directory:
```
git clone -b master https://github.com/emilyatmobtown/simple-before-and-after.git
```

Build the development files:
```
composer install
npm install
npm run start
```

Lint CSS:
```
gulp styles
```

Lint JS:
```
gulp scripts
```

Lint PHP:
```
composer run lint
```

Build the production files:
```
npm run build
```

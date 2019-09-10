# Simple Before and After
A WordPress plugin to create a simple grid of Before and After images.

## Requirements
* WordPress 5.2+
* PHP 7.0+

## Installation in a WordPress project
To install, download simple-before-and-after.zip from the main directory of this repo. Then add it to the plugins directory of the project and activate it.

Create one or more new Before and After posts. Then add Before and After images to each post. For best results, images should be at least 485x200.

To display the grid on a WordPress page, use the following shortcode:
```
[simple_before_and_after]
```

## Usage for Development
Clone to a plugins directory:
```
git clone -b https://github.com/emilyatmobtown/simple-before-and-after.git
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

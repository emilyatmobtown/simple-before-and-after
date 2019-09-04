import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs'; /* Provides flags to separate dev and prod builds */
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import simpleVars from 'postcss-simple-vars'; /* Rewrites SASS-style variables */
import reporter from 'postcss-reporter'; /* Display pretty errors */
import sourcemaps from 'gulp-sourcemaps'; /* Maps original source files for debugging */
import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import wpPot from "gulp-wp-pot";
import zip from 'gulp-zip';
import info from './package.json';

const PRODUCTION = yargs.argv.prod; /* Defines production flag */

/* Configure BrowserSync */
const server = browserSync.create();

export const serve = done => {
    server.init({
        proxy: 'http://framemender.test/',
        port: 8080
    });
    done();
};

export const reload = done => {
    server.reload();
    done();
};

/* Build the scripts */
export const scripts = () => {
    return src( ['src/js/frontend/simple-before-and-after.js', 'src/js/admin/sba-media.js'] )
    .pipe(
      named()
    )
    .pipe(
        webpack( {
            module: {
                rules: [{
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }]
            },
            mode: PRODUCTION ? 'production' : 'development',
            devtool: !PRODUCTION ? 'inline-source-map' : false,
            output: {
                filename: '[name].js'
            },
        })
    )
    .pipe(
        dest( 'dist/js' )
    );
}

/* Build the styles */
export const styles = () => {
    return src( 'src/scss/simple-before-and-after.scss' )
    .pipe(
        gulpif( !PRODUCTION, sourcemaps.init() )
    )
    .pipe(
        postcss([
            simpleVars(),
            autoprefixer({
                cascade: false /* Prevent extra indent on prefixed properties to align with WordPress CSS standards */
            }),
            stylelint(),
            reporter({
                clearMessages: true,
            }),
        ])
    )
    .pipe(
        gulpif( !PRODUCTION, sourcemaps.write() )
    )
    .pipe(
        rename( function ( path ) {
            path.extname = '.css';
        })
    )
    .pipe(
        dest( 'dist/css' )
    )
    .pipe(
        gulpif( PRODUCTION,
            postcss([
                cssnano()
            ])
        )
    )
    .pipe(
        gulpif( PRODUCTION,
            rename( function ( path ) {
                path.extname = '.min.css';
            })
        )
    )
    .pipe(
        gulpif( PRODUCTION,
            dest( 'dist/css' ) /* Add minified stylesheet to dist */
        )
    )
    .pipe(
        server.stream()
    );
}

/* Process images */
export const images = () => {
    return src( 'src/img/**/*.{jpg,jpeg,png,svg,gif}' )
    .pipe(
        gulpif( PRODUCTION, imagemin() )
    )
    .pipe(
        dest( 'dist/img' )
    );
}

/* Prepare POT file for translation */
export const pot = () => {
    return src( '**/*.php' )
    .pipe(
        wpPot( {
            domain: 'simple-before-and-after',
            package: info.name
        })
    )
    .pipe( dest( `languages/${info.name}.pot` ) );
};

/* Watch for changes */
export const watchForChanges = () => {
    watch( 'src/scss/**/*.scss', styles );
    watch( 'src/images/**/*.{jpg,jpeg,png,svg,gif}', series (images, reload ) );
    watch( ['src/**/*', '!src/{images,js,scss}', '!src/{images,js,scss}/**/*'], series( copy, reload ) );
    watch( 'src/js/**/*.js', series( scripts, reload ) );
    watch( '**/*.php', reload );
}

/* Copy files */
export const copy = () => {
    return src( ['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'] )
    .pipe(
        dest( 'dist' )
    );
}

/* Prepare package for distribution */
export const compress = () => {
    return src([
        "**/*",
        "!node_modules{,/**}",
        "!bundled{,/**}",
        "!src{,/**}",
        "!.babelrc",
        "!.gitignore",
        "!gulpfile.babel.js",
        "!package.json",
        "!package-lock.json",
        ])
        .pipe(
            zip( `${info.name}.zip` )
        )
        .pipe(
            dest( '.' )
        );
};

/* Delete files */
export const clean = () => del( ['dist'] );

/* Build dev */
export const dev = series( clean, parallel( styles, images, copy, scripts ), serve, watchForChanges )

/* Build prod */
export const build = series( clean, parallel( styles, images, copy, scripts ), pot, compress )

/* Define default */
export default dev;

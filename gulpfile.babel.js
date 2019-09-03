import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs'; /* Provides flags to separate dev and prod builds */
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps'; /* Maps original source files for debugging */
import autoprefixer from 'autoprefixer';
import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import named from 'vinyl-named';

const PRODUCTION = yargs.argv.prod; /* Defines production flag */

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
    }))
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
        sass().on( 'error', sass.logError )
    )
    .pipe(
        gulpif( PRODUCTION, postcss( [ autoprefixer ] ) )
    )
    .pipe(
        gulpif( PRODUCTION, cleanCss( { compatibility: 'ie8' } ) )
    )
    .pipe(
        gulpif( !PRODUCTION, sourcemaps.write() )
    )
    .pipe(
        dest( 'dist/css' )
    );
}

/* Process images */
export const images = () => {
    return src( 'src/img/**/*.{jpg,jpeg,png,svg,gif}' )
    .pipe(
        gulpif( PRODUCTION, imagemin() )
    )
    .pipe(
        dest('dist/img')
    );
}

/* Watch for changes */
export const watchForChanges = () => {
      watch( 'src/scss/**/*.scss', styles) ;
      watch( 'src/images/**/*.{jpg,jpeg,png,svg,gif}', images );
      watch( ['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'], copy );
}

/* Copy files */
export const copy = () => {
    return src( ['src/**/*','!src/{images,js,scss}','!src/{images,js,scss}/**/*'] )
    .pipe(
        dest('dist')
    );
}

/* Delete files */
export const clean = () => del(['dist']);

/* Build dev */
export const dev = series( clean, parallel( styles, images, copy ), watchForChanges )

/* Build prod */
export const build = series( clean, parallel( styles, images, copy ) )

/* Define default */
export default dev;

import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs'; /* Provides flags to separate dev and prod builds */
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano'; /* Minifies CSS */
import simpleVars from 'postcss-simple-vars'; /* Rewrites SASS-style variables */
import reporter from 'postcss-reporter'; /* Display pretty errors */
import sourcemaps from 'gulp-sourcemaps'; /* Maps original source files for debugging */
import autoprefixer from 'autoprefixer';
import stylelint from 'stylelint'; /* Lints CSS */
import merge from 'merge-stream';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import del from 'del';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint'; /* Lints JS */
import uglify from 'gulp-uglify'; /* Minifies and compresses JS */
import browserSync from 'browser-sync';
import wpPot from "gulp-wp-pot"; /* Generates POT files for translation */
import plumber from "gulp-plumber";
import notify from "gulp-notify"; /* Outputs messages to the console */
import zip from 'gulp-zip';
import info from './package.json'; /* Grabs data from package.json */

const PRODUCTION = yargs.argv.prod; /* Defines production flag */

/* Configure BrowserSync */
const server = browserSync.create();

/* Custom error handler */
const errorHandler = err => {
	notify.onError({
		title: 'Gulp error in ' + err.plugin,
		message:  err.toString()
	})(err);
};

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

/* Define the source files and destinations for each script set */
const scriptFiles = [
	{
		scriptSrc: 'src/js/frontend/simple-before-and-after.js',
		scriptDest: 'dist/js/frontend'
	},
	{
		scriptSrc: 'src/js/admin/sba-media.js',
		scriptDest: 'dist/js/admin'
	}
];

/* Process and merge all scripts */
export const scripts = () => {
	const scriptTasks = scriptFiles.map( function( scriptTask )  {
		return processScript(
			src( scriptTask.scriptSrc ),
			{ scriptDest: scriptTask.scriptDest }
		);
	});

	return merge( scriptTasks );
}

/* Build each script set */
const processScript = ( stream, options = { styleDest: 'dist/js' } ) => {
	return stream
	.pipe(
		plumber( { errorHandler: errorHandler } )
	)
	.pipe(
		gulpif( !PRODUCTION, sourcemaps.init() ) /* Add sourcemaps if in dev mode */
	)
	.pipe(
		eslint()
	)
	.pipe(
		eslint.format() /* Output linting messages to console */
	)
	.pipe(
		babel()
	)
	.pipe(
		gulpif( !PRODUCTION, sourcemaps.write() )
	)
	.pipe(
		dest( options.scriptDest )
	)
	.pipe(
		gulpif( PRODUCTION, uglify() ) /* Minify if in prod mode */
	)
	.pipe(
		gulpif( PRODUCTION,
			rename( function ( path ) {
				path.extname = '.min.js'; /* Add minified file if in prod mode */
			})
		)
	)
	.pipe(
		gulpif( PRODUCTION,
			dest( options.scriptDest ) /* Add minified script to dist */
		)
	)
	.on( 'error', function ( err ) {
		this.emit( 'end' ); /* Emit 'end' in order to move to next task */
	})
	.pipe(
		server.stream() /* Inject updated JS to page and reload browser */
	);
}

/* Define the source files and destinations for each stylesheet set */
const styleFiles = [
	{
		styleSrc: 'src/scss/frontend/simple-before-and-after.scss',
		styleDest: 'dist/css/frontend'
	},
	{
		styleSrc: 'src/scss/admin/sba-admin.scss',
		styleDest: 'dist/css/admin'
	},
];

/* Process and merge all styles */
export const styles = () => {
	const styleTasks = styleFiles.map( function( styleTask )  {
		return processStyle(
			src( styleTask.styleSrc ),
			{ styleDest: styleTask.styleDest }
		);
	});

	return merge( styleTasks );
}

/* Build each style set */
const processStyle = ( stream, options = { styleDest: 'dist/css' } ) => {
	return stream
	.pipe(
		plumber( { errorHandler: errorHandler } )
	)
	.pipe(
		gulpif( !PRODUCTION, sourcemaps.init() ) /* Add sourcemaps if in dev mode */
	)
	.pipe(
		postcss([
			simpleVars(),
			autoprefixer({
				cascade: false /* Prevent extra indent on prefixed properties to align with WordPress CSS standards */
			}),
			stylelint(),
			reporter({
				clearAllMessages: true,
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
		dest( options.styleDest )
	)
	.pipe(
		gulpif( PRODUCTION,
			postcss([
				cssnano() /* Minify if in prod mode */
			])
		)
	)
	.pipe(
		gulpif( PRODUCTION,
			rename( function ( path ) {
				path.extname = '.min.css'; /* Add minified file if in prod mode */
			})
		)
	)
	.pipe(
		gulpif( PRODUCTION,
			dest( options.styleDest ) /* Add minified stylesheet to dist */
		)
	)
	.on( 'error', function ( err ) {
		this.emit( 'end' ); /* Emit 'end' in order to move to next task */
	})
	.pipe(
		server.stream() /* Inject updated CSS to page and reload browser */
	);
}

/* Process images */
export const images = () => {
	return src( 'src/img/**/*.{jpg,jpeg,png,svg,gif}' )
	.pipe(
		plumber( { errorHandler: errorHandler } )
	)
	.pipe(
		gulpif( PRODUCTION, imagemin() )
	)
	.on( 'error', function ( err ) {
		this.emit( 'end' ); /* Emit 'end' in order to move to next task */
	})
	.pipe(
		dest( 'dist/img' )
	);
}

/* Prepare POT file for translation */
export const pot = () => {
	return src( '**/*.php' )
	.pipe(
		plumber( { errorHandler: errorHandler } )
	)
	.pipe(
		wpPot( {
			domain: 'simple-before-and-after',
			package: info.name
		})
	)
	.on( 'error', function ( err ) {
		this.emit( 'end' ); /* Emit 'end' in order to move to next task */
	})
	.pipe( dest( `languages/${info.name}.pot` ) );
};

/* Watch for changes */
export const watchForChanges = () => {
	watch( 'src/scss/**/*.scss', styles );
	watch( 'src/images/**/*.{jpg,jpeg,png,svg,gif}', series( images, reload ) );
	watch( [ 'src/**/*', '!src/{images,js,scss}', '!src/{images,js,scss}/**/*' ], series( copy, reload ) );
	watch( 'src/js/**/*.js', series( scripts, reload ) );
	watch( '**/*.php', reload );
}

/* Copy files */
export const copy = () => {
	return src( [ 'src/**/*', '!src/{images,js,scss}', '!src/{images,js,scss}/**/*' ] )
	.pipe(
		dest( 'dist' )
	);
}

/* Prepare package for distribution */
export const compress = () => {
	return src([
		"**/*",
		"!node_modules{,/**}",
		"!src{,/**}",
		"!vendor{,/**}",
		"!.babelrc",
		"!.browserslistrc",
		"!.eslintrc",
		"!.gitignore",
		"!.stylelintrc",
		"!gulpfile.babel.js",
		"!**.zip",
		"!composer.json",
		"!composer.lock",
		"!package.json",
		"!package-lock.json",
		])
		.pipe(
			plumber( { errorHandler: errorHandler } )
		)
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

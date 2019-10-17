var i, j;
var parents = document.querySelectorAll( '.sba-grid-item' );

// Toggle 'inactive' class on grid item contents
for ( i = 0; i < parents.length; i++ ) {
	parents[i].addEventListener( 'click', function() {
		for ( j = 0; j < this.children.length; j++ ) {
			this.children[j].classList.toggle( 'inactive' );
		}
	});
}

// Add class for non-touch devices
if ( ! ( 'ontouchstart' in document.documentElement ) ) {
	document.documentElement.className += ' no-touch';
}

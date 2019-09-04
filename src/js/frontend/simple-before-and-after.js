// Add class for non-touch devices
if ( !( 'ontouchstart' in document.documentElement ) ) {
    document.documentElement.className += " no-touch";
}

// Toggle 'inactive' class on grid item contents
let parents = document.querySelectorAll( '.sba-grid-item' );
parents.forEach( function( parent ) {
    parent.addEventListener( 'click', function() {
        this.childNodes.forEach( function ( child ) {
            child.classList.toggle( 'inactive' );
        });
    });
});

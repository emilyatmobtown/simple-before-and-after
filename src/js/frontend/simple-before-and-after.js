if ( !( 'ontouchstart' in document.documentElement ) ) {
    document.documentElement.className += " no-touch";
}

let parents = document.querySelectorAll( '.sba-grid-item' );

parents.forEach( function( parent ) {
    parent.addEventListener( 'click', function() {
        this.childNodes.forEach( function ( child ) {
            child.classList.toggle( 'inactive' );
        });
    });
});

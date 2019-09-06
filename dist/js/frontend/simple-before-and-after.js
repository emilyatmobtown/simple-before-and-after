"use strict";

var parents = document.querySelectorAll('.sba-grid-item'); // Add class for non-touch devices

if (!('ontouchstart' in document.documentElement)) {
    document.documentElement.className += ' no-touch';
} // Toggle 'inactive' class on grid item contents


parents.forEach(
    function (parent) {
        parent.addEventListener(
            'click', function () {
                this.childNodes.forEach(
                    function (child) {
                        child.classList.toggle('inactive');
                    }
                );
            }
        );
    }
);
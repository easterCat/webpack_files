/**
 * Created by EmmaWu on 2016/11/24.
 */

//vendor
import './sass/vendor/grids-responsive-min.css';
import './sass/vendor/animate.css';

//app
import './official.html';
import './sass/official.scss';

let navContainer = document.getElementsByClassName('nav')[0];
let scrolling = false;
let scrolledPast = false;

window.addEventListener('scroll', function(e) {
    scrolling = true;
});

setInterval(() => {
    // when `scrolling` becomes true...
    if(scrolling) {
        // set it back to false
        scrolling = false;
        // check scroll position
        if (window.scrollY > 200) {
            // user has scrolled > 400px from top since last check
            if ( !scrolledPast ) {
                addShadow();
            }

        } else {
            // user has scrolled back <= 100px from top since last check
            if ( scrolledPast ) {
                removeShadow();
            }
        }
    }
// take a breath.. hold event listener from firing for 100ms
}, 100);

//
// [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
//     img.setAttribute('src', img.getAttribute('data-src'));
//     img.onload = function() {
//         img.removeAttribute('data-src');
//         img.className += " animated slideInUp";
//     };
// });

function addShadow() {
    scrolledPast = true;
    navContainer.className = 'nav shadow';
}

function removeShadow() {
    scrolledPast = false;
    navContainer.className = 'nav';
}

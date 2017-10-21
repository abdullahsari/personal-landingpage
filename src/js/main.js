import Animate from './Animate';

{
    'use strict';

    window.addEventListener('load', () => {

        // Declare and instantiate animation object
        const anim = new Animate();

        // Fade out loader
        const loader = document.getElementsByClassName('loader')[0];
        loader.style.opacity = 0;

        // Wait for fade out to complete and run after half a second
        setTimeout(() => {

            // Remove loader from DOM
            loader.parentNode.removeChild(loader);

            // Start animation
            anim.start();
        }, 500);
    });
}
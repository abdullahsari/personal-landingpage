import { TweenLite, TimelineLite } from 'gsap';

/**
 * The animate class is responsible for introducing the page to the visitor
 */
export default class Animate {
    constructor() {
        this.elements = {};
        this.retrieve();
        this.init();
    }

    /**
     * Retrieves all needed = doM elements and stores them in a Map
     */
    retrieve() {
        const titles = document.getElementsByClassName('title');
        this.elements.left = document.querySelector('.block--left');
        this.elements.image = document.querySelector('.block__bg-img');
        this.elements.ctaWrapper = document.querySelector('.cta');
        this.elements.cta = document.querySelector('.cta a');
        this.elements.title = titles[0];
        this.elements.socials = document.querySelectorAll('.social__link');
        this.elements.sub =  titles[1];
        this.elements.right = document.querySelector('.block--right');
        this.elements.content = document.getElementsByClassName('content');
        this.elements.body = document.querySelector('body');
    }

    /**
     * Positions the elements to their initial states
     */
    init() {
        TweenLite.set(this.elements.left, { xPercent: -100 });
        TweenLite.set(this.elements.image, { xPercent: 90 });
        TweenLite.set(this.elements.cta, { x: (this.elements.cta.offsetWidth * 2) });
        TweenLite.set(this.elements.title, { xPercent: -100, autoAlpha: 0 });
        TweenLite.set(this.elements.sub, { xPercent: -100, autoAlpha: 0 });
        TweenLite.set(this.elements.socials, { autoAlpha: 0 });
        TweenLite.set(this.elements.content, { y: 5, autoAlpha: 0 });
    }

    /**
     * Starts the animation
     */
    start() {
        const timeline = new TimelineLite();
        timeline
            .to(this.elements.left, 0.1, { autoAlpha: 1 })
            .to(this.elements.left, 1.2, { xPercent: 0, ease: Power4.easeInOut })
            .to(this.elements.image, 0, {autoAlpha: 1 }, "-= 1.2")
            .to(this.elements.image, 1.2, { autoAlpha: 1, xPercent: 0, ease: Power4.easeInOut }, "-= 1.2")
            .to(this.elements.title, 0.7, { xPercent: 0, autoAlpha: 1, ease: Power4.easeInOut, delay: 0.5 }, "-= 1.2")
            .to(this.elements.sub, 0.7, { xPercent: 0, autoAlpha: 1, ease: Power4.easeInOut, delay: 0.55 }, "-= 1.15")
            .to(this.elements.cta, 0.7, { x: 0, ease: Power4.easeInOut, autoAlpha: 1, delay: 0.55, onCompleteScope: this.elements.cta, onComplete: () => { this.end(); } }, "-= 1.1")
            .staggerTo(this.elements.socials, 0.3, { autoAlpha: 1 }, 0.05, "-= 0.1")
            .staggerTo(this.elements.content, 0.35, { y: 0, autoAlpha: 1, ease: Sine.easeOut }, 0.1, "-= 0.05");
    }

    /**
     * Deals with the final state
     */
    end() {
        TweenLite.set(this.elements.ctaWrapper, { css: { overflow: 'visible' } });
        TweenLite.set(this.elements.body, { css: { overflowY: 'visible' } });
    }
}
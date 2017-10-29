import { TweenLite, TimelineLite } from 'gsap';

/**
 * The animate class is responsible for introducing the page to the visitor
 */
export default class Animate {
    constructor() {
        this.elements = new Map();
        this.retrieve();
        this.init();
    }

    /**
     * Retrieves all needed DOM elements and stores them in a Map
     */
    retrieve() {
        const titles = document.getElementsByClassName('title');
        this.elements.set('left', document.querySelector('.block--left'));
        this.elements.set('image', document.querySelector('.block__bg-img'));
        this.elements.set('ctaWrapper', document.querySelector('.cta'));
        this.elements.set('cta', document.querySelector('.cta a'));
        this.elements.set('title', titles[0]);
        this.elements.set('socials', document.querySelectorAll('.social__link'));
        this.elements.set('sub', titles[1]);
        this.elements.set('right', document.querySelector('.block--right'));
        this.elements.set('content', document.getElementsByClassName('content'));
        this.elements.set('body', document.querySelector('body'));
    }

    /**
     * Positions the elements to their initial states
     */
    init() {
        TweenLite.set(this.elements.get('left'), { xPercent: -100 });
        TweenLite.set(this.elements.get('image'), { xPercent: 90 });
        TweenLite.set(this.elements.get('cta'), { x: (this.elements.get('cta').offsetWidth * 2) });
        TweenLite.set(this.elements.get('title'), { xPercent: -100, autoAlpha: 0 });
        TweenLite.set(this.elements.get('sub'), { xPercent: -100, autoAlpha: 0 });
        TweenLite.set(this.elements.get('socials'), { autoAlpha: 0 });
        TweenLite.set(this.elements.get('content'), { y: 5, autoAlpha: 0 });
    }

    /**
     * Starts the animation
     */
    start() {
        const timeline = new TimelineLite();
        timeline
            .to(this.elements.get('left'), 0.1, { autoAlpha: 1 })
            .to(this.elements.get('left'), 1.2, { xPercent: 0, ease: Power4.easeInOut })
            .to(this.elements.get('image'), 0, {autoAlpha: 1 }, "-= 1.2")
            .to(this.elements.get('image'), 1.2, { autoAlpha: 1, xPercent: 0, ease: Power4.easeInOut }, "-= 1.2")
            .to(this.elements.get('title'), 0.7, { xPercent: 0, autoAlpha: 1, ease: Power4.easeInOut, delay: 0.5 }, "-= 1.2")
            .to(this.elements.get('sub'), 0.7, { xPercent: 0, autoAlpha: 1, ease: Power4.easeInOut, delay: 0.55 }, "-= 1.15")
            .to(this.elements.get('cta'), 0.7, { x: 0, ease: Power4.easeInOut, autoAlpha: 1, delay: 0.55, onCompleteScope: this.elements.get('cta'), onComplete: () => { this.end(); } }, "-= 1.1")
            .staggerTo(this.elements.get('socials'), 0.3, { autoAlpha: 1 }, 0.05, "-= 0.1")
            .staggerTo(this.elements.get('content'), 0.35, { y: 0, autoAlpha: 1, ease: Sine.easeOut }, 0.1, "-= 0.05");
    }

    /**
     * Deals with the final state
     */
    end() {
        TweenLite.set(this.elements.get('ctaWrapper'), { css: { overflow: 'visible' } });
        TweenLite.set(this.elements.get('body'), { css: { overflowY: 'visible' } });
    }
}
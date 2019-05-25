import Page from './page.js';
import { ScrollElement } from "./common.js";
import Swiper from 'swiper';

export default class Main extends Page {
    constructor() {
        super();
        this.scrollList = [...this.scrollList, 
            new ScrollElement('cta', $('main .cta'),  $('main .cta')),
            new ScrollElement('product_twenty', $('.products .twenty'), $(".products .twenty")),
            new ScrollElement('product_fifteen',  $('.products .fifteen'), $(".products .fifteen")),
            new ScrollElement('product_diy',  $('.products .diy'), $(".products .diy")),
            new ScrollElement('social', $('.social'), $('.social'))
        ];
    }

    init() {
        super.init();
        this.initSwiper();
    }

    initSwiper() {
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            simulateTouch: false,
            speed: 1500,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3500,
            },
        });
    }

}

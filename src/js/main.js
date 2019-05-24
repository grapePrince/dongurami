import Page from "./page.js";
import Swiper from 'swiper';

export default class Main extends Page {
    constructor() {
        super();
        this.scrollList = [...this.scrollList, 
            { 
                name: "cta",
                scrollValue: 400,
                $el: $("main .cta")
            },
            { 
                name: "product_twenty",
                scrollValue: 700,
                $el: $(".products .twenty")
            },
            { 
                name: "product_fifteen",
                scrollValue: 1400,
                $el: $(".products .fifteen")
            },
            { 
                name: "product_diy",
                scrollValue: 2100,
                $el: $(".products .diy")
            },
            { 
                name: "social",
                scrollValue: 2800,
                $el: $(".social")
            }
        ];
    }

    init() {
        super.init();
        initSwiper();
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

import Page from './page.js';
import { ScrollElement } from "./common.js";


export default class Main extends Page {
    constructor() {
        super();
        // this.scrollList = [...this.scrollList, 
        //     new ScrollElement('cta', $('main .cta'),  $('main .cta')),
        //     new ScrollElement('product_twenty', $('.products .twenty'), $(".products .twenty")),
        //     new ScrollElement('product_fifteen',  $('.products .fifteen'), $(".products .fifteen")),
        //     new ScrollElement('product_diy',  $('.products .diy'), $(".products .diy")),
        //     new ScrollElement('social', $('.social'), $('.social'))
        // ];
    }

    init() {
        super.init();
    }

}

import Page from './page.js';
import { ScrollElement } from "./common.js";


export default class Main extends Page {
    constructor() {
        super();
        this.scrollList = [...this.scrollList, 
             new ScrollElement('introduce1', $('.introduce .introduce1 .img'),  $('.main-header')),
             new ScrollElement('introduce2', $('.introduce .introduce2 .img'),  $('.introduce .introduce2'))             
        ];
    }

    init() {
        super.init();
    }

}

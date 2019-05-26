import { ScrollElement } from "./common.js";

export default class Page {
    constructor() {
        this.scrollList = [
            new ScrollElement('header', $('.main-header'), $(".feature_services"))
        ];
        this.$els = [];
    }

    init() {
        this.$els['hamburger'] = $('.main-header .hamburger');
        this.$els['header_close'] = $('.close');
        this.$els['logo'] = $('.main-header h1');
        this.$els['gnb_menu_list'] = $('.main-header nav > ul > li');
        this.$els['gnb_menu_list_text'] = $('.main-header nav > ul > li > a');
        this.$els['gnb_menu_sublist'] = $('.main-header nav > ul > li > div > ul > li');
    
        $(window).on('scroll', (e) => this.scrollHandler(e));
        this.$els['logo'].on('mouseenter ', (e) => this.hoverLogo(e));
        this.$els['logo'].on('mouseleave', (e) => this.hoveroutLogo(e));
        this.$els['gnb_menu_list'].on('mouseenter', { type: 'list' }, (e) => this.hoverGnbMenuList(e));
        this.$els['gnb_menu_list_text'].on('mouseenter',  { type: 'a' }, (e) => this.hoverGnbMenuList(e));
        this.$els['gnb_menu_sublist'].on('mouseenter', (e) => this.hoverGnbMenuSubList(e));
        this.$els['hamburger'].on('click', (e) => this.clickHambergur(e));
        this.$els['header_close'].on('click', (e) => this.clickHeaderClose(e));

        this.scrollHandler(); 
    }

    getCurrentPage() {
        const $body = $(document.body);
        if ($body.hasClass('index')) {
            return 'index';
        } else if($body.hasClass('introduce')) {
            return 'introduce';
        }
    }

    scrollHandler() {
        const scroll = $(window).scrollTop();
        this.toggleScrollOnOffEl(scroll);
    }
    

    toggleScrollOnOffEl(scroll) {
        const $body = $(document.body);
        const scrollList = this.scrollList;

        for (var i = 0 ; i < scrollList.length ; i++) {
            var currentEl = scrollList[i];
            if ( scroll > currentEl.scrollValue()) {
                currentEl.$el.addClass('scroll_on');
            } else if ( scroll <= currentEl.scrollValue()) {
                currentEl.$el.removeClass('scroll_on');
                if (currentEl.name === 'header') {
                    $body.removeClass('header_opened');
                }
            }
        }
    }

    hoverLogo(e) {
        this.$els['logo']
        .removeClass("init")
        .removeClass("hoverout")
        .addClass("hover");
    }

    hoveroutLogo(e) {
        this.$els['logo']
        .removeClass("init")
        .removeClass("hover")
        .addClass("hoverout");
    }

    hoverGnbMenuList(e) {
        var $current = $(e.currentTarget);

        if (e.data.type === 'a') {
            $current = $current.parent();
        }

        var firstClassName = $current[0].classList[0];
        var selectedChildText = '';
        var $subListTexts = $current.find('div > ul > li a');

        $subListTexts.css('color', '');

        if (firstClassName == 'introduce') {
            $current[0].className = 'introduce dongurami_introduce';
            selectedChildText = $current.find('div > ul > li.dongurami_introduce a');
        } else if (firstClassName == 'make') {
            $current[0].className = 'make make_guide';
            selectedChildText = $current.find('div > ul > li.make_guide a');
        } else if (firstClassName == 'sample') {
            $current[0].className = 'sample sample_all';
            selectedChildText = $current.find('div > ul > li.sample_all a');
        } else if (firstClassName == 'download') {
            $current[0].className = 'download download_asset';
            selectedChildText = $current.find('div > ul > li.download_asset a');
        }

        selectedChildText.css('color', 'rgb(245,177,162)');
    }

    hoverGnbMenuSubList(e) {
        var $current = $(e.currentTarget);
        var className = $current[0].className;
        var $parent = $current.parent().parent().parent();
        var firstClassName = $parent[0].classList[0];
        var $subListTexts = $parent.find('div > ul > li a');
        var selectedChildText = $current.find('a');
    
        $parent[0].className = firstClassName + ' ' + className;
        $subListTexts.css('color', '');
        selectedChildText.css('color', 'rgb(245,177,162)'); 
    }


    clickHambergur() {
        this.toggleHamburger('on');
    }

    clickHeaderClose() {
        this.toggleHamburger('off');
    }

    toggleHamburger(state) {
        if (state === 'on') {
            $(document.body).addClass('header_opened');
        } else {
            $(document.body).removeClass('header_opened');
        }
    }

}
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
        return $body.attr("class").split(" ")[0];
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

export class Main extends Page {
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

export class Introduce extends Page {
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


export class Process extends Page {
    constructor() {
        super();
        this.$elSection = $('main > section');
    }

    init() {
        let passiveSupported = false;

        super.init();
        this.currentScrollTop = $(window).scrollTop();

        try {
            window.addEventListener('test', null, Object.defineProperty(
                {}, 
                'passive', 
                { get: function() { 
                    passiveSupported = { passive: true }; 
                } }
            ));
        } catch(err) {}

        if (passiveSupported) {
            window.addEventListener('wheel', (e) => this.wheelHandler(e), {passive: false});
        } else {
            $(window).on('wheel', (e) => this.wheelHandler(e));
        }
    }

    wheelHandler(e) {
        const delta = (e.originalEvent) ? e.originalEvent.deltaY : e.deltaY;
        const sectionClassList = this.$elSection.attr("class").split(" ");
        let currentNumber = Number(sectionClassList[0].slice(-1));
        let nextClassName;

        // scroll down
        if (delta > 0) {
            if (currentNumber !== 6) {
                currentNumber++;
                e.preventDefault();
            }
        // scroll up
        } else {
            if (currentNumber > 1 && $(window).scrollTop() === 0) {
                currentNumber--;
            } 
        }
            
        sectionClassList.shift();
        nextClassName = `process${currentNumber} ${sectionClassList.join(' ')}`;
        this.$elSection.attr("class", nextClassName);

        if (currentNumber === 2) {
            $('video').get(0).currentTime = 0;
            $('video').get(0).play();
        }
    }
}

export class Sample extends Page {
    constructor() {
        super();
        this.sampleList_height_odd = 0;
        this.sampleList_height_even = 0;
        this.margin = 80;
        this.imageWidth = 400;
        this.loadQueue = 0;

        this.listTemplate = '<li class="sample_item before_calculate {{ItemClass}}"><img src="resource/images/samples/item{{ItemName}}.jpg" alt="item{{ItemName}}"><a href="" class="detail btn_normal btn_dark_normal btn_slide ">크게보기</a></li>';
    }

    init() {
        super.init();
        $("#filter").selectmenu({
                position: {
                    at: 'center bottom',   // 이 위치에다가
                    my: 'center top'         // 이 위치를 맞춘다
                }
            }
        );

        const urlList = location.href.split('?');
        if (urlList.length > 0) {
            const query = urlList[1];
            $('#filter').val(query);
            $("#filter").selectmenu("refresh");
        }

        this.renderSampleList();
    }

    scrollHandler() {
        super.scrollHandler();

        // 스크롤이 끝에 닿으면 샘플 리스트를 더 로드한다. 
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            this.renderSampleList();
        }
    }

    renderSampleList() {
        $('.loading').addClass('on');
        setTimeout(() => {
            const listHtml = this.generateNext10FileListHtml();
            $(".sample_list").append(listHtml);
            this.caculateTop();
        }, 3000);
    }

    generateNext10FileListHtml() {
        let returnHtml = "";
        for(let i = 0 ; i < 10 ; i++) {
            const fileName = this.pad(this.randomNumber(1, 30));            
            returnHtml += this.listTemplate.replace('{{ItemName}}', fileName)
                              .replace("{{ItemClass}}", (i%2 === 0) ? "even" : "odd");
        }
        return returnHtml;
    }

    pad(number) {
        return ('00' + number).slice(-3);
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    caculateTop() {
        const itemList = $('.sample_list .sample_item.before_calculate');

        for( let i = 0 ; i < itemList.length ; i++) {
            const $item = $(itemList[i]);
            const $img =  $item.find("img");
            const renderHeight = $img.height();
            this.loadQueue++;
            if (renderHeight > 0) {
                this.imageLoaded($item);
            } else {
                $img.on("load", () => this.imageLoaded($item));
            }           
        }
    }

    imageLoaded($item) {
        const $img =  $item.find("img");
        const renderHeight = $img.height();
        const isEven = $item.hasClass("even");
        let list_height;
        let left;

        if (isEven) {
            list_height = this.sampleList_height_even;
            this.sampleList_height_even = this.sampleList_height_even + renderHeight + 80;
            left = 0;
        } else {
            list_height = this.sampleList_height_odd;
            left = 480;
            this.sampleList_height_odd = this.sampleList_height_odd + renderHeight + 80;
        }

        $item.css("top", `${list_height}px`);
        $item.css("left", `${left}px`);
        $item.removeClass("before_calculate");              

        this.loadQueue--;
        
        if(this.loadQueue === 0) {
            $(".sample_list").css("height", `${Math.max(this.sampleList_height_even, this.sampleList_height_odd)}px`);
            $('.loading').removeClass('on');
        }
    }

}
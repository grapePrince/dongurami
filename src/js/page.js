export default class Page {
    constructor() {
        this.scrollList = [
            { 
                name: "header",
                scrollValue: 800,
                $el: $(".main-header")
            }
        ];
        this.$els = [];
        this.logo_animation = [];
    }

    init() {
        this.$els["hamburger"] = $(".main-header .hamburger");
        this.$els["header_close"] = $(".close");
        this.$els["logo"] = $(".main-header h1 a");
        this.$els["gnb_menu_list"] = $(".main-header nav > ul > li");
        this.$els["gnb_menu_list_text"] = $(".main-header nav > ul > li > a");
        this.$els["gnb_menu_sublist"] = $(".main-header nav > ul > li > div > ul > li");
    
        $(window).on("scroll", scrollHandler);
        this.$els["logo"].on("mouseenter ", hoverLogo);
        this.$els["logo"].on("mouseleave", hoveroutLogo);
        this.$els["gnb_menu_list"].on("mouseenter", { type: "list" }, hoverGnbMenuList);
        this.$els["gnb_menu_list_text"].on("mouseenter",  { type: "a" }, hoverGnbMenuList);
        this.$els["gnb_menu_sublist"].on("mouseenter", hoverGnbMenuSubList);
        this.$els["hamburger"].on("click", clickHambergur);
        this.$els["header_close"].on("click", clickHeaderClose);

        scrollHandler();
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
        toggleScrollEl(scroll);
    }
    

    toggleScrollEl(scroll) {
        const $body = $(document.body);
        const scrollList = this.scrollList;

        for (var i = 0 ; i < scrollList.length ; i++) {
            var currentEl = scrollList[i];
            if ( scroll > currentEl.scrollValue) {
                currentEl.$el.addClass("scroll_on");
            } else if ( scroll <= currentEl.scrollValue) {
                currentEl.$el.removeClass("scroll_on");
                if (currentEl.name === "header") {
                    $body.removeClass("header_opened");
                }
            }
        }
    }

    hoverLogo(e) {
        $(".main-header h1 a > .after").css("animation", "none");
        $(".main-header h1 a > .after").css("left", "100%");

        $(".main-header h1 a div span.after").css("animation", "none");
        $(".main-header h1 a div span.after").css("left", "0");

        this.logo_animation[0] = setTimeout(function(){ 
            $(".main-header h1 a div:nth-child(1) .after")
            .css("animation", "logo_fade_to_right 0.5s forwards");
        }, 100);

        this.logo_animation[1] = setTimeout(function(){ 
            $(".main-header h1 a div:nth-child(2) .after")
            .css("animation", "logo_fade_to_right 0.5s forwards");
        }, 500);

        this.logo_animation[2] = setTimeout(function(){ 
            $(".main-header h1 a div:nth-child(3) .after")
            .css("animation", "logo_fade_to_right 0.5s forwards");
        }, 1000);

        this.logo_animation[3] = setTimeout(function(){ 
            $(".main-header h1 a div:nth-child(4) .after")
            .css("animation", "logo_fade_to_right 0.5s forwards");
        }, 1500);
    }

    hoveroutLogo(e) {
        clearTimeout(this.logo_animation[0]);
        clearTimeout(this.logo_animation[1]);
        clearTimeout(this.logo_animation[2]);
        clearTimeout(this.logo_animation[3]);

        $(".main-header h1 a > .after").css("animation", "logo_fade_to_right 0s forwards");
        $(".main-header h1 a > .after").css("left", "100%");
        $(".main-header h1 a div span.after").css("animation", "logo_fade_to_right 0s forwards");
        $(".main-header h1 a div span.after").css("left", "100%");
    }


    hoverGnbMenuList(e) {
        var $current = $(e.currentTarget);

        if (e.data.type === "a") {
            $current = $current.parent();
        }

        var firstClassName = $current[0].classList[0];
        var selectedChildText = "";
        var $subListTexts = $current.find("div > ul > li a");

        $subListTexts.css("color", "");

        if (firstClassName == "introduce") {
            $current[0].className = "introduce dongurami_introduce";
            selectedChildText = $current.find("div > ul > li.dongurami_introduce a");
        } else if (firstClassName == "make") {
            $current[0].className = "make make_guide";
            selectedChildText = $current.find("div > ul > li.make_guide a");
        } else if (firstClassName == "sample") {
            $current[0].className = "sample sample_all";
            selectedChildText = $current.find("div > ul > li.sample_all a");
        } else if (firstClassName == "download") {
            $current[0].className = "download download_asset";
            selectedChildText = $current.find("div > ul > li.download_asset a");
        }

        selectedChildText.css("color", "rgb(245,177,162)");
    }

    hoverGnbMenuSubList(e) {
        var $current = $(e.currentTarget);
        var className = $current[0].className;
        var $parent = $current.parent().parent().parent();
        var firstClassName = $parent[0].classList[0];
        var $subListTexts = $parent.find("div > ul > li a");
        var selectedChildText = $current.find("a");
    
        $parent[0].className = firstClassName + " " + className;
        $subListTexts.css("color", "");
        selectedChildText.css("color", "rgb(245,177,162)"); 
    }


    clickHambergur() {
        toggleHamburger("on");
    }

    clickHeaderClose() {
        toggleHamburger("off");
    }

    toggleHamburger(state) {
        if (state === "on") {
            $(document.body).addClass("header_opened");
        } else {
            $(document.body).removeClass("header_opened");
        }
    }

}
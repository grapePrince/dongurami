
var $els = [];
var logo_animation = [];

$(window).on("load", function(){
    inint();
    
}); 
  
function inint() {
    $els["hamburger"] = $(".main-header .hamburger");
    $els["header_close"] = $(".close");
    $els["logo"] = $(".main-header h1 a");
    $els["gnb_menu_list"] = $(".main-header nav > ul > li");
    $els["gnb_menu_list_text"] = $(".main-header nav > ul > li > a");
    $els["gnb_menu_sublist"] = $(".main-header nav > ul > li > div > ul > li");

    $(window).on("scroll", scrollHandler);
    $els["logo"].on("mouseenter ", hoverLogo);
    $els["logo"].on("mouseleave", hoveroutLogo);
    $els["gnb_menu_list"].on("mouseenter", { type: "list" }, hoverGnbMenuList);
    $els["gnb_menu_list_text"].on("mouseenter",  { type: "a" }, hoverGnbMenuList);
    $els["gnb_menu_sublist"].on("mouseenter", hoverGnbMenuSubList);
    $els["hamburger"].on("click", clickHambergur);
    $els["header_close"].on("click", clickHeaderClose)
    
    scrollHandler();
    initSwiper();
} 


function initSwiper() {
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


function scrollHandler() {
    var scroll = $(window).scrollTop();
    scroll_list.toggleScrollEl(scroll);
}


function hoverLogo(e) {
    $(".main-header h1 a > .after").css("animation", "none");
    $(".main-header h1 a > .after").css("left", "100%");

    $(".main-header h1 a div span.after").css("animation", "none");
    $(".main-header h1 a div span.after").css("left", "0");

    logo_animation[0] = setTimeout(function(){ 
        $(".main-header h1 a div:nth-child(1) .after")
        .css("animation", "logo_fade_to_right 0.5s forwards");
    }, 100);

    logo_animation[1] = setTimeout(function(){ 
        $(".main-header h1 a div:nth-child(2) .after")
        .css("animation", "logo_fade_to_right 0.5s forwards");
    }, 500);

    logo_animation[2] = setTimeout(function(){ 
        $(".main-header h1 a div:nth-child(3) .after")
        .css("animation", "logo_fade_to_right 0.5s forwards");
    }, 1000);

    logo_animation[3] = setTimeout(function(){ 
        $(".main-header h1 a div:nth-child(4) .after")
        .css("animation", "logo_fade_to_right 0.5s forwards");
    }, 1500);
}

function hoveroutLogo(e) {
    clearTimeout(logo_animation[0]);
    clearTimeout(logo_animation[1]);
    clearTimeout(logo_animation[2]);
    clearTimeout(logo_animation[3]);

    $(".main-header h1 a > .after").css("animation", "logo_fade_to_right 0s forwards");
    $(".main-header h1 a > .after").css("left", "100%");
    $(".main-header h1 a div span.after").css("animation", "logo_fade_to_right 0s forwards");
    $(".main-header h1 a div span.after").css("left", "100%");
}


function hoverGnbMenuList(e) {
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

function hoverGnbMenuSubList(e) {
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


function clickHambergur() {
    toggleHamburger("on");
}

function clickHeaderClose() {
    toggleHamburger("off");
}

function toggleHamburger(state) {
    if (state === "on") {
        $(document.body).addClass("header_opened");
    } else {
        $(document.body).removeClass("header_opened");
    }
}


var scroll_list = (function () {
    var scrollList = [
        { 
            name: "header",
            scrollValue: 800,
            $el: $(".main-header")
        },
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

    var toggleScrollEl = function(scroll) {
        for (var i = 0 ; i < scrollList.length ; i++) {
            var currentEl = scrollList[i];
            if ( scroll > currentEl.scrollValue) {
                currentEl.$el.addClass("scroll_on");
            } else if ( scroll <= currentEl.scrollValue) {
                currentEl.$el.removeClass("scroll_on");
                if (currentEl.name === "header") {
                    $(document.body).removeClass("header_opened");
                }
            }
        }
    }

    return { 
        toggleScrollEl : toggleScrollEl
    };
})();

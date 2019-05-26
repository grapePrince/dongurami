
export class ScrollElement {
    constructor(name, $el, $scrollBase) {
        this.name = name;
        this.$el = $el;
        this.$scrollBase = $scrollBase;
        
        if (name === "header") {
            this.scrollValue = this.scrollValueHeader;
        } else if (name === "introduce1") {
            this.scrollValue = this.scrollValueIntroduce1;
        } else if (name === "introduce2") {
            this.scrollValue = this.scrollValueIntroduce2;
        }
    }
    scrollValue() {
        return this.$scrollBase.offset().top - $(window).height();
    }
    scrollValueHeader() {
        if (this.$scrollBase.length) {
            return this.$scrollBase.offset().top + this.$scrollBase.height();
        } else {
            return this.$el.height() * 3;
        }
    }
    scrollValueIntroduce1() {
        return this.$scrollBase.height() * 2;
    }
    scrollValueIntroduce2() {
        return this.$scrollBase.offset().top;
    }
}
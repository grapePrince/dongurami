export class ScrollElement {
    constructor(name, $el, $scrollBase) {
        this.name = name;
        this.$el = $el;
        this.$scrollBase = $scrollBase;
        
        if (name === "header") {
            this.scrollValue = this.scrollValueHeader;
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
}
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
        return this.$scrollBase.offset().top + this.$scrollBase.height();
    }
}
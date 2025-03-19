export default class Component {
    props;
    state;
    $container;

    constructor(props = {}) {
        this.props = props;
        this.$container = document.createElement("div"); // 페이지 컨테이너 생성
        this.setup();
        this.setEvent();
        this.render();
    }

    setup() {
        this.loadCSS("/style/index.css");
    }

    template() {
        return "";
    }

    render() {
        this.$container.innerHTML = this.template();
        this.mounted();
    }

    mounted() {}

    setEvent() {}

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    addEvent(eventType, selector, callback) {
        this.$container.addEventListener(eventType, (event) => {
            if (!event.target.closest(selector)) return;
            callback(event);
        });
    }

    loadCSS(href) {
        if (document.querySelector(`link[href="${href}"]`)) return;

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    }

    getContainer() {
        return this.$container;
    }
}

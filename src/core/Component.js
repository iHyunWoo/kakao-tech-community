export default class Component {
    props;
    state;
    $container;

    constructor(props = {}) {
        this.props = props;
        this.$container = document.createElement("div"); // 페이지 컨테이너 생성
        this._globalEvents = [];  // unmount 시 해제하기 위해 글로벌 이벤트 추적
        this.setup();
        this.setEvent();
        this.render();
        this.initLoadingIndicator();
    }

    setup() {
        this.loadCSS("/style/loading-indicator.css");
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

    unmount() {
        // 글로벌 이벤트 제거
        this._globalEvents.forEach(({ eventType, callback }) => {
            window.removeEventListener(eventType, callback);
        });
        this._globalEvents = [];
    }

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

    addGlobalEvent(eventType, callback) {
        window.addEventListener(eventType, callback);
        this._globalEvents.push({ eventType, callback });
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

    initLoadingIndicator() {
        if (!document.querySelector(".loading-overlay")) {
            this.$loading = document.createElement("div");
            this.$loading.className = "loading-overlay hidden";
            this.$loading.innerHTML = `<div class="loading-spinner"></div>`;
            document.body.appendChild(this.$loading);
        } else {
            this.$loading = document.querySelector(".loading-overlay");
        }
    }

    showLoading() {
        if (this.$loading) {
            this.$loading.classList.remove("hidden");
            this.$loading.classList.add("active");
        }
    }

    hideLoading() {
        if (this.$loading) {
            this.$loading.classList.add("hidden");
            this.$loading.classList.remove("active");
        }
    }
}

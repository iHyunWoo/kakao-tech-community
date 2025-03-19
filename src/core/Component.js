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

    // initLoadingIndicator() {
    //     if (!document.querySelector(".loading-overlay")) {
    //         this.$loading = document.createElement("div");
    //         this.$loading.className = "loading-overlay hidden";
    //         this.$loading.innerHTML = `<div class="loading-spinner"></div>`;
    //         document.body.appendChild(this.$loading);
    //     } else {
    //         this.$loading = document.querySelector(".loading-overlay");
    //     }
    // }
    //
    // showLoading() {
    //     this.$loading.classList.remove("hidden");
    // }
    //
    // hideLoading() {
    //     this.$loading.classList.add("hidden");
    // }
    // 🔥 로딩 UI 추가
    initLoadingIndicator() {
        setTimeout(() => {
            if (!document.querySelector(".loading-overlay")) {
                this.$loading = document.createElement("div");
                this.$loading.className = "loading-overlay hidden";
                this.$loading.innerHTML = `<div class="loading-spinner"></div>`;
                document.body.appendChild(this.$loading);
            } else {
                this.$loading = document.querySelector(".loading-overlay");
            }
        }, 0);
    }

    // 🔥 `requestAnimationFrame()`으로 UI 업데이트
    showLoading() {
        requestAnimationFrame(() => {
            if (this.$loading) {
                this.$loading.classList.remove("hidden");
                this.$loading.style.opacity = "1"; // 🔥 명시적으로 opacity 설정
            } else {
                console.warn("🚨 showLoading() 호출되었지만, this.$loading이 설정되지 않음.");
            }
        });
    }

    hideLoading() {
        requestAnimationFrame(() => {
            if (this.$loading) {
                this.$loading.style.opacity = "0"; // 🔥 애니메이션을 위해 opacity 먼저 변경
                setTimeout(() => {
                    this.$loading.classList.add("hidden");
                }, 300); // 🔥 transition 시간 후 hidden 추가
            }
        });
    }
}

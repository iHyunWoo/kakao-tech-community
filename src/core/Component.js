import {htmlToVNode, renderVNode} from "./v-dom/V-DOM.js";
import {diffing} from "./v-dom/diffing.js";
import {patchToDOM} from "./v-dom/patchToDOM.js";

export default class Component {
    props;
    state;
    $container;
    _globalEvents = [];  // unmount 시 해제하기 위해 글로벌 이벤트 추적
    _vnode = null;  // 가상 dom에 사용할 vnode 객체

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
        // this.$container.innerHTML = this.template();
        this._renderWithVDOM()
        this.mounted();
    }

    _renderWithVDOM() {
        const newNode = htmlToVNode(this.template());

        if(!this._vnode) {
            // template을 기반으로 VNode 생성
            const $element = renderVNode(newNode);
            this.$container.innerHTML = "";
            this.$container.append($element);
        } else {
            // VNode 객체가 존재한다면, 변경사항 비교 후 렌더링
            const patchNode = diffing(this._vnode, newNode);
            patchToDOM(this.$container, patchNode);
        }
        this._vnode = newNode;
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
        console.time("render")
        this.state = { ...this.state, ...newState };
        this.render();
        console.timeEnd("render")
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
        if (!document.querySelector("#component-loading-spinner")) {
            this.$loading = document.createElement("div");
            this.$loading.className = "loading-overlay hidden";
            this.$loading.innerHTML = `<div id="component-loading-spinner" class="loading-spinner"></div>`;
            document.body.appendChild(this.$loading);
            // this.$container.appendChild(this.$loading);
        } else {
            this.$loading = document.querySelector("#component-loading-spinner");
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

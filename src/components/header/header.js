import Component from "../../core/component.js";

const loadHeaderCSS = () => {
    if (!document.querySelector("#header-style")) {
        const link = document.createElement("link");
        link.id = "header-style";
        link.rel = "stylesheet";
        link.href = "../../components/header/Header.css"; // CSS 파일 경로
        document.head.appendChild(link);
    }
};

export default class Header extends  Component {
    setup() {
        this.state = {
            showBackButton: this.props.showBackButton,
            showProfile: this.props.showProfile,
            userProfileImage: this.props.userProfileImage,
        };
        loadHeaderCSS()
    }

    template() {
        return `
            <header class="header">
                <div class="header-left">
                    ${this.state.showBackButton ? `
                        <button id="header-back-button">
                            <img width="48px" height="48px" src="/resources/back-arrow.svg" alt=""/>
                        </button>
                    ` : "" }
                </div>
                <h1 class="header-title">아무 말 대잔치</h1>
                <div class="header-right">
                    ${this.state.showProfile ? `
                        <button id="header-profile-button">
                            <img width="36px" height="36px" src="${this.state.userProfileImage}" alt=""/>
                        </button>
                    ` : ""}
                </div>
            </header>
            <hr class="header-hr">
        `
    }

    setEvent() {

    }
}
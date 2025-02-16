import Component from "../../core/component.js";

const loadHeaderCSS = () => {
    if (!document.querySelector("#header-style")) {
        const link = document.createElement("link");
        link.id = "header-style";
        link.rel = "stylesheet";
        link.href = "/components/header/header.css";
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
                            <img id="header-profile-image" width="36px" height="36px" src="https://placehold.co/36" alt=""/>
                        </button>
                        <ul id="header-profile-dropdown-menu" class="hidden">
                           <li class="header-profile-dropdown-item" id="header-profile-dropdown-edit-profile-button">회원정보 수정</li>
                           <li class="header-profile-dropdown-item" id="header-profile-dropdown-edit-password-button">비밀번호 수정</li>
                           <li class="header-profile-dropdown-item" id="header-profile-dropdown-logout-button">로그아웃</li> 
                        </ul>
                    ` : ""}
                </div>
            </header>
            <hr class="header-hr">
        `
    }

    setEvent() {
        const backButton = document.querySelector("#header-back-button");
        backButton.addEventListener("click", () => {
            history.back()
        })

        const profileButton = document.getElementById("header-profile-button");
        profileButton.addEventListener("click", () => {
            const dropdown = document.getElementById("header-profile-dropdown-menu");
            dropdown.classList.toggle("hidden");
        })

        const profileEditButton = document.getElementById("header-profile-dropdown-edit-profile-button")
        profileEditButton.addEventListener("click", () => {
            window.location.href = "/pages/profile/edit/profile-edit-page.html"
        })

        const passwordEditButton = document.getElementById("header-profile-dropdown-edit-password-button")
        passwordEditButton.addEventListener("click", () => {
            window.location.href = "/pages/profile/password-edit/password-edit-page.html"
        })
    }
}
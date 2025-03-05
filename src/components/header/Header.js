import loadCSS from "/util/loadCSS.js";
import {navigateTo} from "/util/navigateTo.js";
import { ROUTES } from "/constants/routes.js";

export default function Header({ showBackButton = false, showProfile = true, userProfileImage = "https://placehold.co/36" }) {
    loadCSS("style/header.css");

    const container = document.createElement("header");
    container.classList.add("header");

    container.innerHTML = `
        <div class="header-left">
            ${showBackButton ? `
                <button id="header-back-button">
                    <img width="48px" height="48px" src="/resources/back-arrow.svg" alt="뒤로 가기"/>
                </button>
            ` : "" }
        </div>
        <h1 class="header-title">아무 말 대잔치</h1>
        <div class="header-right">
            ${showProfile ? `
                <button id="header-profile-button">
                    <img id="header-profile-image" width="36px" height="36px" src="${userProfileImage}" alt="프로필"/>
                </button>
                <ul id="header-profile-dropdown-menu" class="hidden">
                    <li class="header-profile-dropdown-item" id="header-profile-dropdown-edit-profile-button">회원정보 수정</li>
                    <li class="header-profile-dropdown-item" id="header-profile-dropdown-edit-password-button">비밀번호 수정</li>
                    <li class="header-profile-dropdown-item" id="header-profile-dropdown-logout-button">로그아웃</li> 
                </ul>
            ` : ""}
        </div>
    `;

    // 이벤트 리스너 추가
    if (showBackButton) {
        container.querySelector("#header-back-button").addEventListener("click", () => history.back());
    }

    if (showProfile) {
        const profileButton = container.querySelector("#header-profile-button");
        const dropdownMenu = container.querySelector("#header-profile-dropdown-menu");

        profileButton.addEventListener("click", () => {
            dropdownMenu.classList.toggle("hidden");
        });

        // 회원정보 수정
        container.querySelector("#header-profile-dropdown-edit-profile-button").addEventListener("click", () => {
            navigateTo(ROUTES.PROFILE_EDIT);
        });

        // 비밀번호 수정
        container.querySelector("#header-profile-dropdown-edit-password-button").addEventListener("click", () => {
            navigateTo(ROUTES.PASSWORD_EDIT);
        });

        // 로그아웃
        container.querySelector("#header-profile-dropdown-logout-button").addEventListener("click", () => {
            localStorage.removeItem('isLoggedIn');
            navigateTo(ROUTES.LOGIN);
        });
    }

    return container;
}

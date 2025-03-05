import loadCSS from "../../util/loadCSS.js";
import {navigateTo} from "../../util/navigateTo.js";
import {ROUTES} from "../../constants/routes.js";
import {validateEmail, validatePassword} from "../../util/validators.js";

export default function LoginPage() {
    loadCSS("/style/index.css")
    loadCSS("/style/login-page.css")

    const container = document.createElement("div");

    container.innerHTML = `
     <div class="login-container">
        <h2 class="login-title">로그인</h2>
        <form id="login-form">
            <label class="login-label" for="email">이메일</label>
            <input class="login-input" type="text" id="email" placeholder="이메일을 입력하세요">
            <p class="login-alert-message" id="email-alert-message">* helper text</p>
            <label class="login-label" for="password">비밀번호</label>
            <input class="login-input" type="password" id="password" placeholder="비밀번호를 입력하세요">
            <p class="login-alert-message" id="password-alert-message">* helper text</p>
            <input class="login-button" type="submit" value="로그인">
        </form>
        <a id="signup-button">회원가입</a>
    </div>
    `;

    function onLoginButtonClick(event) {
        event.preventDefault();

        const email = container.querySelector("#email").value.trim();
        const emailAlert = container.querySelector("#email-alert-message");
        const isValidEmail = validateEmail(email);

        if (isValidEmail) {
            emailAlert.style.visibility = "hidden";
        } else {
            emailAlert.textContent = "올바른 이메일 주소 형식을 입력해주세요.";
            emailAlert.style.visibility = "visible";
            return;
        }

        const password = container.querySelector("#password").value.trim();
        const passwordAlert = container.querySelector("#password-alert-message");
        const isValidPassword = validatePassword(password);

        if (!password) {
            passwordAlert.textContent = "비밀번호를 입력해주세요";
            passwordAlert.style.visibility = "visible";
            return;
        }

        if (!isValidPassword) {
            passwordAlert.textContent = "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개씩 포함해야 합니다.";
            passwordAlert.style.visibility = "visible";
            return;
        }

        // 로그인 성공
        localStorage.setItem("isLoggedIn", "true");
        navigateTo(ROUTES.POSTS);
    }

    function onSignupButtonClick() {
        navigateTo(ROUTES.SIGNUP);
    }

    function addEventListeners() {
        container.querySelector("#signup-button").addEventListener("click", onSignupButtonClick);
        container.querySelector("#login-form").addEventListener("submit", onLoginButtonClick);
    }

    addEventListeners();

    return container;
}

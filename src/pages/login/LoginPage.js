import loadCSS from "../../util/loadCSS.js";
import {navigateTo} from "../../util/navigateTo.js";
import {ROUTES} from "../../constants/routes.js";
import {validateEmail, validatePassword} from "../../util/validators.js";
import {login} from "../../api/userApi.js";

export default function LoginPage() {
    loadCSS("/style/index.css")
    loadCSS("/style/login-page.css")

    const $container = document.createElement("div");
    $container.id = "container";

    $container.innerHTML = `
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

    const $emailInput = $container.querySelector("#email");
    const $passwordInput = $container.querySelector("#password");
    const $emailAlert = $container.querySelector("#email-alert-message");
    const $passwordAlert = $container.querySelector("#password-alert-message");
    const $loginForm = $container.querySelector("#login-form");
    const $signupButton = $container.querySelector("#signup-button");

    // 이메일 유효성 검사
    function checkEmail(email) {
        if (!validateEmail(email)) {
            $emailAlert.textContent = "올바른 이메일 주소 형식을 입력해주세요.";
            $emailAlert.style.visibility = "visible";
            return false;
        }
        $emailAlert.style.visibility = "hidden";
        return true;
    }

    // 비밀번호 유효성 검사
    function checkPassword(password) {
        if (!password) {
            $passwordAlert.textContent = "비밀번호를 입력해주세요";
            $passwordAlert.style.visibility = "visible";
            return false;
        }

        if (!validatePassword(password)) {
            $passwordAlert.textContent = "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개씩 포함해야 합니다.";
            $passwordAlert.style.visibility = "visible";
            return false;
        }

        $passwordAlert.style.visibility = "hidden";
        return true;
    }

    // 로그인 API 요청
    async function handleLogin(email, password) {
        try {
            await login(email, password);
            alert("로그인 성공!");
            navigateTo(ROUTES.POSTS); // 게시판으로 이동
        } catch (error) {
            alert(`로그인 실패: ${error.message}`);
        }
    }

    // 로그인 버튼 (폼 제출) 동작
    function onLoginSubmit(event) {
        event.preventDefault(); // 기본 동작 차단

        const email = $emailInput.value.trim();
        const password = $passwordInput.value.trim();

        if (!checkEmail(email) || !checkPassword(password)) return; // 유효성 검사 실패 시 중단

        handleLogin(email, password);
    }

    // 회원가입 이동 버튼
    function onSignupClick() {
        navigateTo(ROUTES.SIGNUP);
    }

    // 이벤트 바인딩
    function addEventListeners() {
        $loginForm.addEventListener("submit", onLoginSubmit);
        $signupButton.addEventListener("click", onSignupClick);
    }

    addEventListeners(); // 초기화

    return $container;
}

import loadCSS from "../../util/loadCSS.js";
import {navigateTo} from "../../util/navigateTo.js";
import {ROUTES} from "../../constants/routes.js";
import {validateEmail, validatePassword} from "../../util/validators.js";

export default function SignupPage() {
    loadCSS("/style/index.css")
    loadCSS("style/signup-page.css");

    const container = document.createElement("section");
    container.id = "signup-section";

    container.innerHTML = `
        <h2 id="signup-title">회원가입</h2>

        <div>
            <div id="profile-image-div">
                <p class="title">프로필 사진</p>
                <p class="signup-alert-message" id="profile-image-alert-message">* 프로필 사진을 추가해주세요.</p>
            </div>
            <div id="profile-image-upload-div">
                <input type="file" id="profile-image-input" accept="image/*" hidden/>
                <button id="profile-image-button">
                    <img id="profile-image" src="/resources/plus-in-circle.png" alt=""/>
                </button>
            </div>

            <form id="signup-form">
                <label class="signup-label" for="email">이메일*</label>
                <input class="signup-input" type="text" id="email" placeholder="이메일을 입력하세요">
                <p class="signup-alert-message" id="email-alert-message"></p>

                <label class="signup-label" for="password">비밀번호*</label>
                <input class="signup-input" type="password" id="password" placeholder="비밀번호를 입력하세요">
                <p class="signup-alert-message" id="password-alert-message"></p>

                <label class="signup-label" for="password-confirm">비밀번호 확인*</label>
                <input class="signup-input" type="password" id="password-confirm" placeholder="비밀번호를 한번 더 입력하세요">
                <p class="signup-alert-message" id="password-confirm-alert-message"></p>

                <label class="signup-label" for="nickname">닉네임*</label>
                <input class="signup-input" type="text" id="nickname" placeholder="닉네임을 입력하세요">
                <p class="signup-alert-message" id="nickname-alert-message"></p>

                <input class="signup-button" type="submit" value="회원가입">
            </form>
        </div>
        <a id="login-button">로그인하러 가기</a>
    `;

    // 🔥 프로필 이미지 업로드 이벤트 처리
    const profileImageInput = container.querySelector("#profile-image-input");
    const profileImageButton = container.querySelector("#profile-image-button");
    const profileImage = container.querySelector("#profile-image");
    const profileAlertMessage = container.querySelector("#profile-image-alert-message");

    profileImageButton.addEventListener("click", () => profileImageInput.click());

    profileImageInput.addEventListener("change", (e) => {
        const file = profileImageInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
                profileAlertMessage.style.visibility = "hidden";
            };
            reader.readAsDataURL(file);
        }
    });

    // 폼 제출 이벤트 처리
    container.querySelector("#signup-form").addEventListener("submit", (e) => {
        e.preventDefault();
        handleSignup();
    });

    // 로그인 버튼 클릭 시 로그인 페이지로 이동
    container.querySelector("#login-button").addEventListener("click", () => {
        navigateTo(ROUTES.LOGIN);
    });

    // 🔥 회원가입 처리 함수
    function handleSignup() {
        // 프로필 이미지 확인
        if (!profileImageInput.files.length) {
            profileAlertMessage.style.visibility = "visible";
            return;
        } else {
            profileAlertMessage.style.visibility = "hidden";
        }

        // 이메일 검증
        const email = container.querySelector("#email").value.trim();
        const emailAlert = container.querySelector("#email-alert-message");
        if (!validateEmail(email)) {
            emailAlert.textContent = "올바른 이메일 주소 형식을 입력해주세요.";
            emailAlert.style.visibility = "visible";
            return;
        }
        emailAlert.style.visibility = "hidden";

        // 비밀번호 검증
        const password = container.querySelector("#password").value.trim();
        const passwordAlert = container.querySelector("#password-alert-message");
        if (!password) {
            passwordAlert.textContent = "비밀번호를 입력해주세요.";
            passwordAlert.style.visibility = "visible";
            return;
        }
        if (!validatePassword(password)) {
            passwordAlert.textContent = "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개씩 포함해야 합니다.";
            passwordAlert.style.visibility = "visible";
            return;
        }
        passwordAlert.style.visibility = "hidden";

        // 비밀번호 확인 검증
        const passwordConfirm = container.querySelector("#password-confirm").value.trim();
        const passwordConfirmAlert = container.querySelector("#password-confirm-alert-message");
        if (!passwordConfirm) {
            passwordConfirmAlert.textContent = "비밀번호를 한번 더 입력해주세요.";
            passwordConfirmAlert.style.visibility = "visible";
            return;
        }
        if (password !== passwordConfirm) {
            passwordConfirmAlert.textContent = "비밀번호가 다릅니다.";
            passwordConfirmAlert.style.visibility = "visible";
            return;
        }
        passwordConfirmAlert.style.visibility = "hidden";

        // 닉네임 검증
        const nickname = container.querySelector("#nickname").value.trim();
        const nicknameAlert = container.querySelector("#nickname-alert-message");
        if (nickname.includes(" ")) {
            nicknameAlert.textContent = "띄어쓰기를 없애주세요.";
            nicknameAlert.style.visibility = "visible";
            return;
        }
        if (nickname.length > 10) {
            nicknameAlert.textContent = "닉네임은 최대 10자까지 작성 가능합니다.";
            nicknameAlert.style.visibility = "visible";
            return;
        }
        nicknameAlert.style.visibility = "hidden";

        // 후에 이메일, 닉네임 중복 체크 로직 추가 가능

        // ✅ 회원가입 성공 시 로그인 페이지로 이동
        alert("회원가입이 완료되었습니다!");
        navigateTo(ROUTES.LOGIN);
    }

    return container;
}

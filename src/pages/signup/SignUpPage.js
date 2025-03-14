import loadCSS from "../../util/loadCSS.js";
import { navigateTo } from "../../util/navigateTo.js";
import { ROUTES } from "../../constants/routes.js";
import { validateEmail, validatePassword } from "../../util/validators.js";
import { register } from "../../api/userApi.js";
import {uploadImageToImgBB} from "../../api/imgbbApi.js";

export default function SignupPage() {
    loadCSS("/style/index.css");
    loadCSS("/style/signup-page.css");

    const $container = document.createElement("section");
    $container.id = "signup-section";

    $container.innerHTML = `
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

    const $profileImageInput = $container.querySelector("#profile-image-input");
    const $profileImageButton = $container.querySelector("#profile-image-button");
    const $profileImage = $container.querySelector("#profile-image");
    const $profileAlert = $container.querySelector("#profile-image-alert-message");
    const $emailInput = $container.querySelector("#email");
    const $passwordInput = $container.querySelector("#password");
    const $passwordConfirmInput = $container.querySelector("#password-confirm");
    const $nicknameInput = $container.querySelector("#nickname");
    const $signupForm = $container.querySelector("#signup-form");
    const $loginButton = $container.querySelector("#login-button")

    // alert message
    const $emailAlert = $container.querySelector("#email-alert-message");
    const $passwordAlert = $container.querySelector("#password-alert-message");
    const $passwordConfirmAlert = $container.querySelector("#password-confirm-alert-message");
    const $nicknameAlert = $container.querySelector("#nickname-alert-message");

    let selectedImageFile = null;

    // 프로필 이미지 미리보기
    $profileImageButton.addEventListener("click", () => $profileImageInput.click());
    $profileImageInput.addEventListener("change", () => {
        const file = $profileImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                $profileImage.src = e.target.result;
                $profileAlert.style.visibility = "hidden";
                selectedImageFile = file;
            };
            reader.readAsDataURL(file);
        }
    });

    function checkProfileImage() {
        if (!$profileImageInput.files.length) {
            $profileAlert.style.visibility = "visible";
            return false;
        }
        $profileAlert.style.visibility = "hidden";
        return true;
    }

    function checkEmail(email) {
        if (!validateEmail(email)) {
            $emailAlert.textContent = "올바른 이메일 주소 형식을 입력해주세요.";
            $emailAlert.style.visibility = "visible";
            return false;
        }
        $emailAlert.style.visibility = "hidden";
        return true;
    }

    function checkPassword(password) {
        if (!password) {
            $passwordAlert.textContent = "비밀번호를 입력해주세요.";
            $passwordAlert.style.visibility = "visible";
            return false;
        }
        if (!validatePassword(password)) {
            $passwordAlert.textContent = "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개 포함해야 합니다.";
            $passwordAlert.style.visibility = "visible";
            return false;
        }
        $passwordAlert.style.visibility = "hidden";
        return true;
    }

    function checkPasswordConfirm(password, confirm) {
        if (password !== confirm) {
            $passwordConfirmAlert.textContent = "비밀번호가 다릅니다.";
            $passwordConfirmAlert.style.visibility = "visible";
            return false;
        }
        $passwordConfirmAlert.style.visibility = "hidden";
        return true;
    }

    function checkNickname(nickname) {
        if (nickname.includes(" ")) {
            $nicknameAlert.textContent = "띄어쓰기를 없애주세요.";
            $nicknameAlert.style.visibility = "visible";
            return false;
        }
        if (nickname.length > 10) {
            $nicknameAlert.textContent = "닉네임은 최대 10자까지 작성 가능합니다.";
            $nicknameAlert.style.visibility = "visible";
            return false;
        }
        $nicknameAlert.style.visibility = "hidden";
        return true;
    }

    // 회원가입 요청
    async function handleSignup() {
        const email = $emailInput.value.trim();
        const password = $passwordInput.value.trim();
        const passwordConfirm = $passwordConfirmInput.value.trim();
        const nickname = $nicknameInput.value.trim();

        if (!checkProfileImage() || !checkEmail(email) || !checkPassword(password) ||
            !checkPasswordConfirm(password, passwordConfirm) || !checkNickname(nickname)) return;

        let imageUrl = "";
        // 이미지가 있다면 이미지 업로드
        if (selectedImageFile) {
            try {
                imageUrl = await uploadImageToImgBB(selectedImageFile);
            } catch (error) {
                alert("이미지 업로드에 실패했습니다. 잠시 후 시도해주세요.")
                return;
            }
        }

        try {
            await register(email, password, nickname, imageUrl);
            alert("회원가입이 완료되었습니다!");
            navigateTo(ROUTES.LOGIN); // 로그인 페이지로 이동
        } catch (error) {
            alert(`회원가입 실패: ${error.message}`);
        }
    }

    // 이벤트 바인딩
    function addEventListeners() {
        $signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleSignup();
        });

        $loginButton.addEventListener("click", () => {
            navigateTo(ROUTES.LOGIN);
        });
    }

    addEventListeners()

    return $container;
}

import loadCSS from "../../util/loadCSS.js";
import {validatePassword} from "../../util/validators.js";
import {updatePassword} from "../../api/userApi.js";
import {navigateTo} from "../../util/navigateTo.js";
import {ROUTES} from "../../constants/routes.js";

export default function PasswordEditPage() {
    loadCSS("/style/index.css")
    loadCSS("style/password-edit-page.css");

    const container = document.createElement("div");
    container.id = "container";

    container.innerHTML = `
        <h2 id="password-edit-header">비밀번호 수정</h2>

        <label class="password-label" for="password">비밀번호*</label>
        <input class="password-input" type="password" id="password" placeholder="비밀번호를 입력하세요">
        <p class="password-alert-message" id="password-alert-message"></p>

        <label class="password-label" for="password-confirm">비밀번호 확인*</label>
        <input class="password-input" type="password" id="password-confirm" placeholder="비밀번호를 한번 더 입력하세요">
        <p class="password-alert-message" id="password-confirm-alert-message"></p>

        <input class="password-edit-button" type="submit" id="password-edit-submit-button" value="수정하기">
    `;

    // 비밀번호 확인 검증 함수
    function validatePasswordConfirm(password, passwordConfirm) {
        return password === passwordConfirm;
    }

    // 비밀번호 수정 처리
    async function handlePasswordEdit() {
        const password = container.querySelector("#password").value.trim();
        const passwordConfirm = container.querySelector("#password-confirm").value.trim();
        const passwordAlert = container.querySelector("#password-alert-message");
        const passwordConfirmAlert = container.querySelector("#password-confirm-alert-message");

        // 비밀번호 유효성 검사
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

        // 비밀번호 확인 검사
        if (!passwordConfirm) {
            passwordConfirmAlert.textContent = "비밀번호를 한번 더 입력해주세요.";
            passwordConfirmAlert.style.visibility = "visible";
            return;
        }
        if (!validatePasswordConfirm(password, passwordConfirm)) {
            passwordConfirmAlert.textContent = "비밀번호가 다릅니다.";
            passwordConfirmAlert.style.visibility = "visible";
            return;
        }
        passwordConfirmAlert.style.visibility = "hidden";

        try {
            await updatePassword(password);
            alert("비밀번호가 수정되었습니다!");
            navigateTo(ROUTES.POSTS); // 게시판으로 이동
        } catch (error) {
            alert(error.message);
        }
    }

    container.querySelector("#password-edit-submit-button").addEventListener("click", handlePasswordEdit);

    return container;
}

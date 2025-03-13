import loadCSS from "../../util/loadCSS.js";
import { updateUserInfo } from "../../api/userApi.js";
import { navigateTo } from "../../util/navigateTo.js";
import { ROUTES } from "../../constants/routes.js";

export default function ProfileEditPage() {
    loadCSS("/style/index.css");
    loadCSS("/style/profile-edit-page.css");

    const container = document.createElement("div");
    container.id = "container";

    container.innerHTML = `
        <h2 id="profile-edit-header">회원정보 수정</h2>

        <p class="profile-edit-title">프로필 사진*</p>
        <div id="profile-image-container">
            <input id="profile-edit-profile-image-input" type="file" accept="image/*" hidden>
            <img id="profile-edit-profile-image" src="https://placehold.co/150" alt=""/>
            <div id="profile-edit-profile-image-edit-button">
                <p id="profile-edit-profile-image-edit-button-text">변경</p>
            </div>
        </div>

        <p class="profile-edit-title">이메일</p>
        <p id="profile-edit-email">-</p>

        <p class="profile-edit-title">닉네임</p>
        <input id="profile-edit-nickname-input" type="text" value="-">
<!--        <button id="profile-edit-nickname-edit-button">닉네임 수정하기</button>-->

        <button id="profile-edit-submit-edit-button">수정완료</button>
        <button id="profile-edit-delete-account-button">회원 탈퇴</button>
    `;

    const $nicknameInput = container.querySelector("#profile-edit-nickname-input");
    const $imageInput = container.querySelector("#profile-edit-profile-image-input");
    const $imageEditButton = container.querySelector("#profile-edit-profile-image-edit-button");
    const $imagePreview = container.querySelector("#profile-edit-profile-image");
    const $email = container.querySelector("#profile-edit-email");
    const $submitButton = container.querySelector("#profile-edit-submit-edit-button");

    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
        $email.textContent = userInfo.email;
        $nicknameInput.value = userInfo.nickname;
        $imagePreview.src = userInfo.profileImageUrl;
    }

    let selectedImageUrl = ""; // 선택된 이미지 URL (임시)

    // 프로필 이미지 클릭 이벤트 (파일 선택 열기)
    $imageEditButton.addEventListener("click", () => $imageInput.click());

    // 이미지 파일 선택 시 미리보기 변경
    $imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $imagePreview.src = e.target.result; // 미리보기 반영
                selectedImageUrl = "https://placehold.co/600x400"; // 임시 고정 URL. 사진 업로드 구현 후 변경
            };
            reader.readAsDataURL(file);
        }
    });

    // 수정 완료
    $submitButton.addEventListener("click", handleSubmit);

    // 제출
    async function handleSubmit() {
        const nickname = $nicknameInput.value.trim();

        // 닉네임 검증
        if (!nickname) {
            alert("닉네임을 입력해주세요.");
            return;
        }
        if (nickname.includes(" ")) {
            alert("닉네임에는 공백이 포함될 수 없습니다.");
            return;
        }
        if (nickname.length > 10) {
            alert("닉네임은 최대 10자까지 가능합니다.");
            return;
        }

        const profileImageUrl = selectedImageUrl || "https://placehold.co/150";

        try {
            await updateUserInfo(nickname, profileImageUrl); // API 호출
            alert("프로필이 수정되었습니다.");

            // 로컬 유저 정보 갱신
            const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
            userInfo.nickname = nickname;
            userInfo.profileImageUrl = profileImageUrl;
            localStorage.setItem("user", JSON.stringify(userInfo));

            navigateTo(ROUTES.POSTS); // 게시판으로 이동
        } catch (error) {
            alert(error.message);
        }
    }

    return container;
}

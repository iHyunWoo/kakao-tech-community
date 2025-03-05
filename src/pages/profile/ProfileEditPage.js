import loadCSS from "../../util/loadCSS.js";
import Modal from "../../components/modal/modal.js";

export default function ProfileEditPage() {
    loadCSS("style/profile-edit-page.css");

    const container = document.createElement("div");
    container.id = "profile-edit-container";

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
        <p id="profile-edit-email">jrwedo7@gmail.com</p>

        <p class="profile-edit-title">닉네임</p>
        <input id="profile-edit-nickname-input" type="text" value="kevin.joung">
        <button id="profile-edit-nickname-edit-button">닉네임 수정하기</button>

        <button id="profile-edit-delete-account-button">회원 탈퇴</button>
        <button id="profile-edit-submit-edit-button">수정완료</button>
    `;

    // 🔥 회원 탈퇴 모달 생성
    const deleteAccountModal = Modal({
        title: "회원탈퇴 하시겠습니까?",
        content: "작성된 게시글과 댓글은 삭제됩니다.",
        confirmText: "확인",
        onConfirm: () => {
            console.log("회원 탈퇴 요청");
        }
    });

    container.appendChild(deleteAccountModal.container); // ✅ 모달을 추가

    // 🔥 프로필 이미지 변경 이벤트 처리
    const profileImageInput = container.querySelector("#profile-edit-profile-image-input");
    const profileImage = container.querySelector("#profile-edit-profile-image");
    const profileImageEditButton = container.querySelector("#profile-edit-profile-image-edit-button");

    profileImageEditButton.addEventListener("click", () => profileImageInput.click());

    profileImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 🔥 회원 탈퇴 버튼 이벤트 처리
    container.querySelector("#profile-edit-delete-account-button").addEventListener("click", () => {
        deleteAccountModal.open();
    });

    return container;
}

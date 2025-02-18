import Header from "../../../components/header/header.js";
import Modal from "../../../components/modal/modal.js";

// 회원 탈퇴 모달
const deleteAccountModal = new Modal(
    document.getElementById("modal"),
    {
        title: '회원탈퇴 하시겠습니까?',
        content: '작성된 게시글과 댓글은 삭제됩니다.',
        confirmText: '확인',
        onConfirm: () => {

        },
    }
)

function onDeleteAccountButtonClick() {
    deleteAccountModal.open();
}

function onProfileImageChange(e) {
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        const $profileImage = document.getElementById("profile-edit-profile-image")
        reader.onload = (e) => {
            $profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function addEventListeners() {
    const $deleteAccountButton = document.getElementById("profile-edit-delete-account-button");
    $deleteAccountButton.addEventListener('click', onDeleteAccountButtonClick);

    const $profileImageEditButton = document.getElementById("profile-edit-profile-image-edit-button")
    const $profileImageInput = document.getElementById("profile-edit-profile-image-input");
    $profileImageEditButton.addEventListener('click', () => {
        $profileImageInput.click();
    });
    $profileImageInput.addEventListener('change', onProfileImageChange);
}

function init() {
    const $header = new Header(
        document.getElementById("header"),
        { showBackButton: true, showProfile: true },
    )

    addEventListeners()
}

init()
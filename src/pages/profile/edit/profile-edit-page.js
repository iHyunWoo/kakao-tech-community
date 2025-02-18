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

function addEventListeners() {
    const $deleteAccountButton = document.getElementById("profile-edit-delete-account-button");
    $deleteAccountButton.addEventListener('click', onDeleteAccountButtonClick);
}

function init() {
    const $header = new Header(
        document.getElementById("header"),
        { showBackButton: true, showProfile: true },
    )

    addEventListeners()
}

init()
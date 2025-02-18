import Header from "../../../components/header/header.js";
import CommentList from "../components/comment-list/comment-list.js";
import PostDetail from "../components/post-detail/post-detail.js";
import {getPostDetail} from "../../../repositories/post/post-repository.js";
import Modal from "../../../components/modal/modal.js";

const urlParams = new URLSearchParams(window.location.search);
const postId= parseInt(urlParams.get("id"));
const post = getPostDetail(postId)

// 게시글 삭제 모달
const deletePostModal = new Modal(
    document.getElementById("modal"),
    {
        title: '게시글을 삭제하시겠습니까?',
        content: '삭제한 내용은 복구 할 수 없습니다.',
        confirmText: '확인',
        onConfirm: () => {

        },
})

// 댓글 삭제 모달
const deleteCommentModal = new Modal(
    document.getElementById("modal"),
    {
        title: '댓글을 삭제하시겠습니까?',
        content: '삭제한 내용은 복구 할 수 없습니다.',
        confirmText: '확인',
        onConfirm: () => {

        },
    }
)

function onEditPostButtonClick() {
    window.location.href = `/pages/post/form/post-form-page.html?mode=update&id=${postId}`
}

function onDeletePostButtonClick() {
    deletePostModal.open()
}

function onDeleteCommentButtonClick() {
    deleteCommentModal.open();
}

function addEventListeners() {
    const $editButton = document.getElementById("edit-button");
    if ($editButton) {
        $editButton.addEventListener("click", onEditPostButtonClick);
    }

    const $deleteButton = document.getElementById("delete-button");
    if ($deleteButton) {
        $deleteButton.addEventListener("click", onDeletePostButtonClick);
    }

    const $deleteCommentButtons = document.querySelectorAll(".comment-delete-button");
    if ($deleteCommentButtons) {
        $deleteCommentButtons.forEach(($deleteCommentButton) => {
            $deleteCommentButton.addEventListener("click", onDeleteCommentButtonClick);
        })

    }

}

async function init() {
    const $header = new Header(
        document.getElementById("header"),
        { showBackButton: true, showProfile: true },
    )

    const $postDetail = new PostDetail(
        document.getElementById("post-detail-section"),
    { post: post }
    )

    const $commentList = new CommentList(
        document.querySelector("#comment-list"),
        { comments: post.comments }
    )

    addEventListeners()
}

init();
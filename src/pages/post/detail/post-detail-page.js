import Header from "../../../components/header/header.js";
import CommentList from "../components/comment-list/comment-list.js";
import PostDetail from "../components/post-detail/post-detail.js";
import {getPostDetail} from "../../../repositories/post/post-repository.js";

const urlParams = new URLSearchParams(window.location.search);
const postId= parseInt(urlParams.get("id"));
const post = getPostDetail(postId)

function onEditPostButtonClick() {
    window.location.href = `/pages/post/form/post-form-page.html?mode=update&id=${postId}`
}

function onDeletePostButtonClick() {

}

function addEventListeners() {
    const $editButton = document.getElementById("edit-button");
    $editButton.addEventListener("click", onEditPostButtonClick);

    const $deleteButton = document.getElementById("delete-button");
    $deleteButton.addEventListener("click", onDeletePostButtonClick);
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
import PostList from "./components/post-list/post-list.js";
import Header from "../../components/header/header.js";
import {getPosts} from "../../repositories/post/post-repository.js";

function fetchPosts() {
    return getPosts();
}

function onPostCreateClick() {
    window.location.href = '/pages/post/form/post-form-page.html?mode=create'
}

function onPostDetailClick(id) {
    window.location.href = `/pages/post/detail/post-detail-page.html?id=${id}`
}

function addEventListeners() {
    const postCreateButton = document.getElementById("write-post-button")
    postCreateButton.addEventListener("click",  () => {
        // 게시물 작성으로 이동
        onPostCreateClick()
    })

    const postItems = document.querySelectorAll('.post-item')
    postItems.forEach(item => {
        const postId = item.dataset.id
        item.addEventListener("click", () => {
            // 게시물 상세로 이동
            onPostDetailClick(postId)
        });
    })

}

async function init() {
    const $header = new Header(
        document.getElementById("header"),
        { showBackButton: false, showProfile: true },
    )
    const $postList = new PostList(
        document.querySelector("#post-list"),
        { posts: [] }
    )

    const posts = fetchPosts();
    $postList.setPosts(posts);

    addEventListeners()
}

init();

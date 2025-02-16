import PostList from "./components/post-list/post-list.js";
import Header from "../../components/header/header.js";

async function fetchPosts() {
    return [
        {
            id: 1,
            title: "제목 1",
            likes: 0,
            comments: 0,
            views: 0,
            date: "2024-02-15 00:00:00",
            author: {
                name: "더미 작성자 1",
                profileImage: "https://placehold.co/36"
            }
        },
        {
            id: 2,
            title: "제목 2",
            likes: 0,
            comments: 0,
            views: 0,
            date: "2024-02-15 00:00:00",
            author: {
                name: "더미 작성자 2",
                profileImage: "https://placehold.co/36"
            }
        },
        {
            id: 3,
            title: "제목 3",
            likes: 0,
            comments: 0,
            views: 0,
            date: "2024-02-15 00:00:00",
            author: {
                name: "더미 작성자 3",
                profileImage: "https://placehold.co/36"
            }
        },
        {
            id: 4,
            title: "제목 4",
            likes: 0,
            comments: 0,
            views: 0,
            date: "2024-02-15 00:00:00",
            author: {
                name: "더미 작성자 4",
                profileImage: "https://placehold.co/36"
            }
        },
        {
            id: 5,
            title: "제목 5",
            likes: 0,
            comments: 0,
            views: 0,
            date: "2024-02-15 00:00:00",
            author: {
                name: "더미 작성자 5",
                profileImage: "https://placehold.co/36"
            }
        },
    ];
}

function onWritePostButtonClick() {

}

function onPostDetailClick() {
    window.location.href = '/pages/community/detail/post-detail.html'
}

function addEventListeners() {
    const button = document.getElementById("write-post-button")
    button.addEventListener("click",  () => {
        // 게시물 작성으로 이동
        onWritePostButtonClick()
    })

    const postItems = document.querySelectorAll('.post-item')
    postItems.forEach(item => {
        item.addEventListener("click", () => {
            // 게시물 상세로 이동
            onPostDetailClick()
        });
    })

}

async function init() {
    const $header = new Header(
        document.getElementById("header"),
        { showBackButton: true, showProfile: true },
    )
    const $postList = new PostList(
        document.querySelector("#post-list"),
        { posts: [] }
    )

    const posts = await fetchPosts();
    $postList.setPosts(posts);

    addEventListeners()
}

init();
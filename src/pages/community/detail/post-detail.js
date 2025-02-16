import Header from "../../../components/header/header.js";
import CommentList from "../components/comment-list/comment-list.js";

async function fetchComments() {
    return  [
        {
            id: 1,
            comment: "댓글 내용",
            date: "2024-02-15 00:00:00",
            isMine: true,
            author: {
                name: "더미 작성자 1",
                profileImage: "https://placehold.co/36"
            }
        },
        {
            id: 2,
            comment: "댓글 내용",
            date: "2024-02-15 00:00:00",
            isMine: false,
            author: {
                name: "더미 작성자 2",
                profileImage: "https://placehold.co/36"
            }
        },
        {
            id: 3,
            comment: "댓글 내용",
            date: "2024-02-15 00:00:00",
            isMine: false,
            author: {
                name: "더미 작성자 3",
                profileImage: "https://placehold.co/36"
            }
        },
        {
            id: 4,
            comment: "댓글 내용",
            date: "2024-02-15 00:00:00",
            isMine: false,
            author: {
                name: "더미 작성자 4",
                profileImage: "https://placehold.co/36"
            }
        }
    ]
}

function addEventListeners() {

}

async function init() {
    const $header = new Header(
        document.getElementById("header"),
        { showBackButton: true, showProfile: true },
    )

    const $commentList = new CommentList(
        document.querySelector("#comment-list"),
        { comments: [] }
    )

    const comments = await fetchComments();
    $commentList.setPosts(comments);

    addEventListeners()
}

init();
import Header from "../../../components/header/header.js";
import PostForm from "../components/post-form/post-form.js";
import {getPostDetail} from "../../../repositories/post/post-repository.js";

function init() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    let post = {}
    if (mode === "update") {
        const postId = params.get("id");
        post = getPostDetail(postId);
        console.log(post)
    }

    const $header = new Header(
        document.getElementById("header"),
        { showBackButton: true, showProfile: true },
    )

    const $form = new PostForm(
        document.getElementById("post-form"),
        { mode: mode, post: post }
    )
}

init()
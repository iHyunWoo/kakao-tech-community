import Header from "../../../components/header/header.js";
import PostForm from "../components/post-form/post-form.js";
import PostRepository from "../../../repositories/post/post-repository.js";

async function init() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    let post = {}
    if (mode === "update") {
        const postId = params.get("id");
        post = await PostRepository.getPost(postId)
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

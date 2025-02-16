import Header from "../../../components/header/header.js";
import PostForm from "../components/post-form/post-form.js";

function init() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    const $header = new Header(
        document.getElementById("header"),
        { showBackButton: true, showProfile: true },
    )

    const $form = new PostForm(
        document.getElementById("post-form"),
        { mode: mode, post: {} }
    )
}

init()
import Header from "../../../components/header/header.js";

function init() {
    const $header = new Header(
        document.getElementById("header"),
        { showBackButton: true, showProfile: true },
    )
}

init()
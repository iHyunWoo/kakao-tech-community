import Component from "../../../../core/component.js";

const loadCSS = () => {
    if (!document.querySelector("#post-form-style")) {
        const link = document.createElement("link");
        link.id = "post-form-style";
        link.rel = "stylesheet";
        link.href = "/pages/post/components/post-form/post-form.css";
        document.head.appendChild(link);
    }
};

export default class PostForm extends Component {
    setup() {
        this.state = { mode: this.props.mode , post: this.props.post }
        loadCSS()
    }

    template() {
        return `
            <div id="post-form-container">
                <h2 id="post-form-header">${this.state.mode === "create" ? "게시글 작성" : "게시글 수정"}</h2>
                
                <p class="post-form-title">제목*</p>
                <input id="post-form-title-input" type="text" placeholder="제목을 입력해주세요. (최대 26글자)">
                
                <p class="post-form-title">내용*</p>
                <textarea id="post-form-content-textarea" placeholder="내용을 입력해주세요."></textarea>
                
                <p class="post-form-title">이미지</p>
                <input id="post-form-image-input" type="file" accept="image/*">
                
                <button id="post-form-submit-button">완료</button>
            </div>
        `
    }
}
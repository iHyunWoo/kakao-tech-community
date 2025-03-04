import Component from "../../../../core/component.js";

export default class PostForm extends Component {
    setup() {
        this.state = { mode: this.props.mode , post: this.props.post }
        this.loadCSS(
            "post-form-style",
            "/pages/post/components/post-form/post-form.css",
        )
    }

    template() {
        const { mode, post} = this.state;
        return `
            <div id="post-form-container">
                <h2 id="post-form-header">${mode === "create" ? "게시글 작성" : "게시글 수정"}</h2>
                
                <p class="post-form-title">제목*</p>
                <input 
                    id="post-form-title-input" 
                    type="text" 
                    placeholder="제목을 입력해주세요. (최대 26글자)" 
                    value="${mode === "update" ? post.title : "" }"
                >
                
                <p class="post-form-title">내용*</p>
                <textarea id="post-form-content-textarea" placeholder="내용을 입력해주세요.">${mode === "update" ? post.content : ""}</textarea>
                
                <p class="post-form-title">이미지</p>
                <div id="post-form-image-section">
                    <input id="post-form-image-input" type="file" accept="image/*" hidden>
                    <label for="post-form-image-input" id="post-form-image-button">파일 선택</label>
                    <p id="post-form-image-name">선택된 파일 없음</p>
                </div>
                
                <button id="post-form-submit-button">완료</button>
            </div>
        `
    }

    mounted() {
        const $imageInput = document.getElementById("post-form-image-input");
        const $imageName = document.getElementById("post-form-image-name");
        if (this.state.mode === "update") {
            $imageName.textContent = this.state.post.imageUrl
        }

        $imageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                $imageName.textContent = file ? file.name : "선택된 파일 없음";
            }
        })
    }
}

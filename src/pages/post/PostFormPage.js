import {createPost, getPost, updatePost} from "../../api/postApi.js";
import { ROUTES } from "../../constants/routes.js";
import Component from "../../core/Component.js";
import {navigate} from "../../router.js";
import MarkdownEditor from "./component/MarkdownEditor.js";

export default class PostFormPage extends Component {
    setup() {
        const postId = this.props
        this.state = {
            mode: Object.keys(postId).length === 0 ? "create" : "update", // "create" or "update"
            postId: postId || null,
            post: { title: "", content: "" },
        };

        this.loadCSS("/style/post-form-page.css");

        if (this.state.mode === "update" && this.state.postId) {
            this.loadPostData();
        }
    }

    template() {
        const { post, mode } = this.state;

        return `
        <div id="post-form-container">
            <h2 id="post-form-header">${mode === "create" ? "게시글 작성" : "게시글 수정"}</h2>
            
            <p class="post-form-title">제목*</p>
            <input 
                id="post-form-title-input" 
                type="text" 
                placeholder="제목을 입력해주세요. (최대 26글자)" 
                value="${post.title || ''}"
            >
            
            <p class="post-form-title">내용*</p>
            <div id="editor-container"></div>
            
            <button id="post-form-submit-button">완료</button>
        </div>
        `;
    }

    mounted() {
        if (!this.$editor) {
            this.$editor = new MarkdownEditor({
                initialContent: this.state.post.content
            })

            const $editorContainer = this.$container.querySelector("#editor-container");
            $editorContainer.appendChild(this.$editor.getContainer());
        }
    }

    setEvent() {
        this.addEvent("click", "#post-form-submit-button", () => this.handleSubmit());
    }

    async loadPostData() {
        this.showLoading()
        try {
            const response = await getPost(this.state.postId);
            const postData = response.data;
            if (postData) {
                this.setState({ post: { ...postData } });
                this.$editor.setContent(postData.content);
            }
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
        } finally {
            this.hideLoading();
        }
    }

    async handleSubmit() {
        const title = this.$container.querySelector("#post-form-title-input").value.trim();
        const content = this.$editor.getContent();
        const { mode, postId } = this.state;

        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        this.showLoading();

        try {
            if (mode === "create") {
                await createPost(title, content);
                alert("게시글이 작성되었습니다.");
            } else {
                await updatePost(postId, title, content);
                alert("게시글이 수정되었습니다.");
            }
            navigate(ROUTES.POSTS);
        } catch (error) {
            console.error("게시글 저장 실패:", error);
        } finally {
            this.hideLoading();
        }
    }
}


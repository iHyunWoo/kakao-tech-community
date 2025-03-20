import {createPost, getPost, updatePost} from "../../api/postApi.js";
import { navigateTo } from "../../util/navigateTo.js";
import { ROUTES } from "../../constants/routes.js";
import {uploadImageToImgBB} from "../../api/imgbbApi.js";
import Component from "../../core/Component.js";

export default class PostFormPage extends Component {
    setup() {
        this.state = {
            mode: this.props.mode, // "create" or "update"
            postId: this.props.postId || null,
            post: { title: "", content: "", imageUrl: "" },
            selectedImageFile: null,
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
            <textarea id="post-form-content-textarea" placeholder="내용을 입력해주세요.">${post.content || ''}</textarea>
            
            <p class="post-form-title">이미지</p>
            <div id="post-form-image-section">
                <input id="post-form-image-input" type="file" accept="image/*" hidden>
                <label for="post-form-image-input" id="post-form-image-button">파일 선택</label>
                <p id="post-form-image-name">${post.imageUrl || "선택된 파일 없음"}</p>
            </div>
            
            <button id="post-form-submit-button">완료</button>
        </div>
        `;
    }

    mounted() {
        if (this.state.mode === "update" && this.state.postId) {
            this.loadPostData();
        }
    }

    setEvent() {
        this.addEvent("change", "#post-form-image-input", (e) => this.handleImageUpload(e));
        this.addEvent("click", "#post-form-submit-button", () => this.handleSubmit());
    }

    async loadPostData() {
        this.showLoading()
        try {
            const response = await getPost(this.state.postId);
            const postData = response.data;
            if (postData) {
                this.setState({ post: { ...postData } });
            }
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
        } finally {
            this.hideLoading();
        }
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.setState({ selectedImageFile: file });
            this.$container.querySelector("#post-form-image-name").textContent = file.name;
        } else {
            this.setState({ selectedImageFile: null });
            this.$container.querySelector("#post-form-image-name").textContent = "선택된 파일 없음";
        }
    }

    async handleSubmit() {
        const title = this.$container.querySelector("#post-form-title-input").value.trim();
        const content = this.$container.querySelector("#post-form-content-textarea").value.trim();
        const { mode, postId, selectedImageFile, post } = this.state;

        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        this.showLoading();
        let imageUrl = post.imageUrl;
        if (selectedImageFile) {
            try {
                imageUrl = await uploadImageToImgBB(selectedImageFile);
            } catch (error) {
                alert("이미지 업로드에 실패했습니다. 잠시 후 시도해주세요.");
                this.hideLoading();
                return;
            }
        }

        try {
            if (mode === "create") {
                await createPost(title, content, imageUrl);
                alert("게시글이 작성되었습니다.");
            } else {
                await updatePost(postId, title, content, imageUrl);
                alert("게시글이 수정되었습니다.");
            }
            navigateTo(ROUTES.POSTS);
        } catch (error) {
            console.error("게시글 저장 실패:", error);
        } finally {
            this.hideLoading();
        }
    }
}


// export default function PostForm({ mode, postId }) {
//     loadCSS("/style/index.css");
//     loadCSS("/style/post-form-page.css");
//
//     const container = document.createElement("div");
//
//     let post = { title: "", content: "", imageUrl: "" };
//     let selectedImageFile = null;
//
//     // 초기 데이터 로드
//     async function loadPostData() {
//         if (mode === "update" && postId) {
//             const fetchedPost = await getPost(postId);
//             const postData = fetchedPost.data;
//             if (postData) post = { title: postData.title, content: postData.content, imageUrl: postData.imageUrl };
//         }
//
//         renderForm(post);
//         setupEventListeners();
//     }
//
//     // 폼 렌더링 함수
//     function renderForm(post) {
//         container.innerHTML = `
//         <div id="post-form-container">
//             <h2 id="post-form-header">${mode === "create" ? "게시글 작성" : "게시글 수정"}</h2>
//
//             <p class="post-form-title">제목*</p>
//             <input
//                 id="post-form-title-input"
//                 type="text"
//                 placeholder="제목을 입력해주세요. (최대 26글자)"
//                 value="${post.title || ''}"
//             >
//
//             <p class="post-form-title">내용*</p>
//             <textarea id="post-form-content-textarea" placeholder="내용을 입력해주세요.">${post.content || ''}</textarea>
//
//             <p class="post-form-title">이미지</p>
//             <div id="post-form-image-section">
//                 <input id="post-form-image-input" type="file" accept="image/*" hidden>
//                 <label for="post-form-image-input" id="post-form-image-button">파일 선택</label>
//                 <p id="post-form-image-name">${post.imageUrl || "선택된 파일 없음"}</p>
//             </div>
//
//             <button id="post-form-submit-button">완료</button>
//         </div>
//         `;
//     }
//
//     // 이벤트 리스너 설정
//     function setupEventListeners() {
//         const $imageInput = container.querySelector("#post-form-image-input");
//         const $imageName = container.querySelector("#post-form-image-name");
//         const $submitButton = container.querySelector("#post-form-submit-button");
//         $imageInput.addEventListener("change", (e) => {
//             const file = e.target.files[0];
//             if (file) {
//                 $imageName.textContent = file.name;
//                 selectedImageFile = file;
//             } else {
//                 $imageName.textContent = "선택된 파일 없음";
//                 selectedImageFile = null;
//             }
//         });
//
//         // 제출 버튼 클릭 이벤트
//         $submitButton.addEventListener("click", handleSubmit);
//     }
//
//     // 제출 처리 함수
//     async function handleSubmit() {
//         const $titleInput = container.querySelector("#post-form-title-input");
//         const $contentTextarea = container.querySelector("#post-form-content-textarea");
//
//         const title = $titleInput.value.trim();
//         const content = $contentTextarea.value.trim();
//
//         if (!title || !content) {
//             alert("제목과 내용을 입력해주세요.");
//             return;
//         }
//
//         let imageUrl = post.imageUrl;
//         // 이미지가 있다면 이미지 업로드
//         if (selectedImageFile) {
//             try {
//                 imageUrl = await uploadImageToImgBB(selectedImageFile);
//             } catch (error) {
//                 alert("이미지 업로드에 실패했습니다. 잠시 후 시도해주세요.")
//                 return;
//             }
//         }
//
//         // 폼 제출
//         try {
//             if (mode === "create") {
//                 await createPost(title, content, imageUrl);
//                 alert("게시글이 작성되었습니다.");
//             } else {
//                 await updatePost(postId, title, content, imageUrl);
//                 alert("게시글이 수정되었습니다.");
//             }
//             navigateTo(ROUTES.POSTS);
//         } catch (error) {
//             console.error("게시글 저장 실패:", error);
//         }
//     }
//
//     loadPostData();
//
//     return container;
// }

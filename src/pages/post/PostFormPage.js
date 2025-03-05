import loadCSS from "../../util/loadCSS.js";
import {getPost} from "../../api/postApi.js";
import {navigateTo} from "../../util/navigateTo.js";
import {ROUTES} from "../../constants/routes.js";

export default function PostForm({ mode, postId }) {
    loadCSS("/style/index.css")
    loadCSS("style/post-form-page.css");

    const container = document.createElement("div");

    container.innerHTML = `<h2 id="post-form-header">로딩 중...</h2>`;

    let post = { title: "", content: "", imageUrl: "" };

    async function loadPostData() {
        if (mode === "update" && postId) {
            post = await getPost(postId) || post;
        }

        container.innerHTML = `
        <div id="post-form-container">
            <h2 id="post-form-header">${mode === "create" ? "게시글 작성" : "게시글 수정"}</h2>
            
            <p class="post-form-title">제목*</p>
            <input 
                id="post-form-title-input" 
                type="text" 
                placeholder="제목을 입력해주세요. (최대 26글자)" 
                value="${post.title}"
            >
            
            <p class="post-form-title">내용*</p>
            <textarea id="post-form-content-textarea" placeholder="내용을 입력해주세요.">${post.content}</textarea>
            
            <p class="post-form-title">이미지</p>
            <div id="post-form-image-section">
                <input id="post-form-image-input" type="file" accept="image/*" hidden>
                <label for="post-form-image-input" id="post-form-image-button">파일 선택</label>
                <p id="post-form-image-name">${post.imageUrl || "선택된 파일 없음"}</p>
            </div>
            
            <button id="post-form-submit-button">완료</button>
        </div>
        `;

        setupEventListeners();
    }

    // 이벤트 리스너 등록
    function setupEventListeners() {
        const imageInput = container.querySelector("#post-form-image-input");
        const imageName = container.querySelector("#post-form-image-name");

        imageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                imageName.textContent = file.name;
            }
        });

        async function handleSubmit() {
            const title = container.querySelector("#post-form-title-input").value.trim();
            const content = container.querySelector("#post-form-content-textarea").value.trim();

            if (!title || !content) {
                alert("제목과 내용을 입력해주세요.");
                return;
            }

            const formData = { title, content, imageUrl: imageName.textContent === "선택된 파일 없음" ? "" : imageName.textContent };

            try {
                if (mode === "create") {
                    // await createPost(formData);
                    alert("게시글이 작성되었습니다.");
                } else {
                    // await updatePost(postId, formData);
                    alert("게시글이 수정되었습니다.");
                }
                navigateTo(ROUTES.POSTS);
            } catch (error) {
                console.error("게시글 저장 실패:", error);
            }
        }

        container.querySelector("#post-form-submit-button").addEventListener("click", handleSubmit);
    }

    loadPostData();

    return container;
}


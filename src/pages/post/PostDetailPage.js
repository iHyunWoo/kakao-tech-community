import loadCSS from "../../util/loadCSS.js";
import {deletePost, getPost} from "../../api/postApi.js";
import Modal from "../../components/modal/modal.js";
import {navigateTo} from "../../util/navigateTo.js";
import {ROUTES} from "../../constants/routes.js";
import {getComments, deleteComment} from "../../api/commentApi.js";

export default function PostDetailPage(postId) {
    loadCSS("/style/index.css")
    loadCSS("/style/post-detail-page.css")

    const container = document.createElement("div");

    // 전체 화면
    container.innerHTML = `
    <div id="post-detail-section"></div>
    <div id="comment-section">
      <div id="comment-write-div">
        <label>
          <textarea id="comment-editor" placeholder="댓글을 남겨주세요!"></textarea>
        </label>
        <hr>
        <button id="comment-write-button">댓글 등록</button>
      </div>
      <div id="comment-list"></div>
    </div>
    <div id="modal"></div>
  `;

    // 게시글 삭제 모달
    const deletePostModal = Modal({
        title: "게시글을 삭제하시겠습니까?",
        content: "삭제한 내용은 복구할 수 없습니다.",
        confirmText: "확인",
        onConfirm: async () => {
            await handleDeletePost(postId);
        }
    });

    // 댓글 삭제 모달
    const deleteCommentModal = Modal({
        title: "댓글을 삭제하시겠습니까?",
        content: "삭제한 내용은 복구할 수 없습니다.",
        confirmText: "확인",
        onConfirm: async (commentId) => {
            await handleDeleteComment(commentId);
        }
    });

    // 모달을 container에 추가
    container.appendChild(deletePostModal.container);
    container.appendChild(deleteCommentModal.container);

    // 게시글 삭제 API 호출
    async function handleDeletePost(postId) {
        try {
            const response = await deletePost(postId);
            alert("게시글이 삭제되었습니다.");
            navigateTo(ROUTES.POSTS);
        } catch (error) {
            console.error("게시글 삭제 실패:", error);
        }
    }

    // 댓글 삭제 API 호출
    async function handleDeleteComment(commentId) {
        try {
            const response = await deleteComment(commentId);
            alert("댓글이 삭제되었습니다.");
            await renderPost(); // 댓글 목록 갱신
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
        }
    }

    // 화면에 게시글 및 댓글을 렌더링
    async function renderPost() {
        const [post, comments] = await Promise.all([
            getPost(postId),
            getComments(postId)
        ]);

        if (!post) {
            container.querySelector("#post-detail-section").innerHTML = `<p>게시글을 찾을 수 없습니다.</p>`;
            container.querySelector("#comment-list").innerHTML = "";
            return;
        }

        // 게시글 상세 영역 업데이트
        container.querySelector("#post-detail-section").innerHTML = `
        <div id="post-detail">
            <div id="top-section">
                <h2 id="post-title">${post.title}</h2>
                <div id="post-info">
                    <div id="post-user">
                        <img id="post-user-image" src="${post.author.profileImageUrl}" alt="">
                        <p id="post-user-name">${post.author.name}</p>
                        <p id="post-created-at">${post.createdAt}</p>
                    </div>
                    ${post.isMine ? `
                        <div id="edit-delete-button">
                            <button class="edit-delete-button" id="edit-button">수정</button>
                            <button class="edit-delete-button" id="delete-button">삭제</button>
                        </div>
                    ` : ""}
                </div>
            </div>
            <hr>
            <div id="content-section">
                ${post.imageUrl ? `<img id="content-image" src="${post.imageUrl}" alt="">` : ""}
                <p id="content-text">${post.content}</p>
                <div id="content-stats">
                    <div class="content-stats" id="content-like-stat">
                        <p>${post.likeCount}</p>
                        <p>좋아요</p>
                    </div>
                    <div class="content-stats" id="content-view-stat">
                        <p>${post.viewCount}</p>
                        <p>조회수</p>
                    </div>
                    <div class="content-stats" id="content-comment-stat">
                      <p>${post.commentCount}</p>
                      <p>댓글</p>
                    </div>
                </div>
            </div>
            <hr>
        </div>
        `;

        // 댓글 목록 영역 업데이트
        container.querySelector("#comment-list").innerHTML = `
            ${comments.length > 0 ? comments.map(comment => `
            <div class="comment-item">
              <div class="comment-top-section">
                <div class="comment-user-date">   
                  <img class="comment-user-image" src="${comment.author.profileImageUrl}" alt="">
                  <p class="comment-user-name">${comment.author.name}</p>
                  <p class="comment-date">${comment.createdAt}</p>
                </div>
                ${comment.isMine ? `
                  <div class="comment-edit-delete-button">
                    <button class="comment-edit-button">수정</button>
                    <button class="comment-delete-button" data-comment-id="${comment.id}">삭제</button>
                  </div>
                ` : ""}
                </div>
                <p class="comment-comment">${comment.content}</p>
            </div>
            `).join("")
            : `<p>댓글이 없습니다.</p>`
            }
        `;

        // post 수정 버튼
        const editButton = container.querySelector("#edit-button");
        if (editButton) {
            editButton.addEventListener("click", () => {
                navigateTo(ROUTES.POST_FORM(postId))
            });
        }
        // post 삭제 버튼
        const deleteButton = container.querySelector("#delete-button");
        if (deleteButton) {
            deleteButton.addEventListener("click", () => {
                deletePostModal.open();
            });
        }
        // 댓글 삭제 버튼
        container.querySelectorAll(".comment-delete-button").forEach(button => {
            button.addEventListener("click", (e) => {
                const commentId = e.currentTarget.getAttribute("data-comment-id");
                deleteCommentModal.open(commentId);
            });
        });
    }


    renderPost();

    return container;
}

import loadCSS from "../../util/loadCSS.js";
import { deletePost, getPost } from "../../api/postApi.js";
import Modal from "../../components/modal/modal.js";
import { navigateTo } from "../../util/navigateTo.js";
import { ROUTES } from "../../constants/routes.js";
import {getComments, deleteComment, createComment} from "../../api/commentApi.js";
import CommentListItem from "./component/CommentListItem.js";

export default function PostDetailPage(postId) {
    loadCSS("/style/index.css");
    loadCSS("/style/post-detail-page.css");

    const container = document.createElement("div");
    container.id = "container";

    let cursor = null;
    let isLoading = false;
    let hasNextPage = true;

    container.innerHTML = `
        <div id="post-detail-section"></div>
        <div id="comment-section">
          <div id="comment-write-div">
            <label><textarea id="comment-editor" placeholder="댓글을 남겨주세요!"></textarea></label>
            <hr>
            <button id="comment-write-button">댓글 등록</button>
          </div>
          <div id="comment-list"></div>
        </div>
        <div id="modal"></div>
    `;

    const $postDetailSection = container.querySelector("#post-detail-section");
    const $commentList = container.querySelector("#comment-list");
    const $commentEditor = container.querySelector("#comment-editor");
    const $commentWriteButton = container.querySelector("#comment-write-button");

    const deletePostModal = Modal({
        title: "게시글을 삭제하시겠습니까?",
        content: "삭제한 내용은 복구할 수 없습니다.",
        confirmText: "확인",
        onConfirm: async () => await handleDeletePost(postId),
    });

    const deleteCommentModal = Modal({
        title: "댓글을 삭제하시겠습니까?",
        content: "삭제한 내용은 복구할 수 없습니다.",
        confirmText: "확인",
        onConfirm: async (commentId) => await handleDeleteComment(commentId),
    });

    container.appendChild(deletePostModal.container);
    container.appendChild(deleteCommentModal.container);

    // 게시글 렌더링
    async function renderPost() {
        try {
            const response = await getPost(postId);
            const post = response.data;


            if (!post) {
                $postDetailSection.innerHTML = `<p>게시글을 찾을 수 없습니다.</p>`;
                return;
            }
            $postDetailSection.innerHTML = createPostTemplate(post);
            bindPostEvents();
        } catch (error) {
            console.error("게시글 조회 실패:", error);
        }
    }

    // 댓글 로드
    async function loadMoreComments() {
        if (isLoading || !hasNextPage) return;
        isLoading = true;

        try {
            const { data } = await getComments(postId, cursor);
            const comments = data.comments
            if (comments.length === 0 && !cursor) {
                hasNextPage = false;
                return;
            }

            comments.forEach(comment => {
                const commentItem = CommentListItem(comment, { onDelete: handleDeleteComment });
                $commentList.appendChild(commentItem);
            });
            const nextCursor = comments[comments.length - 1].id;
            cursor = nextCursor;
            if (!nextCursor) hasNextPage = false; // 다음 페이지 없으면 종료
        } catch (error) {
            console.error("댓글 로드 실패:", error);
        } finally {
            isLoading = false;
        }
    }

    // 게시글 삭제
    async function handleDeletePost(postId) {
        try {
            await deletePost(postId);
            alert("게시글이 삭제되었습니다.");
            navigateTo(ROUTES.POSTS);
        } catch (error) {
            console.error("게시글 삭제 실패:", error);
        }
    }

    // 댓글 작성
    async function handleWriteComment() {
        const content = $commentEditor.value.trim();
        if (!content) {
            alert("댓글을 입력해주세요.");
            return;
        }

        try {
            await createComment(postId, content); // 댓글 작성 API 호출
            alert("댓글이 등록되었습니다.");
            // 초기화 후 다시 로드
            $commentEditor.value = "";
            $commentList.innerHTML = "";
            cursor = null;
            hasNextPage = true;
            await loadMoreComments();
        } catch (error) {
            console.error("댓글 등록 실패:", error);
        }
    }

    // 댓글 삭제
    async function handleDeleteComment(commentId) {
        try {
            await deleteComment(postId, commentId);
            alert("댓글이 삭제되었습니다.");
            $commentList.innerHTML = ""; // 초기화
            cursor = null;
            hasNextPage = true;
            await loadMoreComments(); // 새로 로드
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
        }
    }

    // 게시글 템플릿
    function createPostTemplate(post) {
        return `
        <div id="post-detail">
            <div id="top-section">
                <h2 id="post-title">${post.title}</h2>
                <div id="post-info">
                    <div id="post-user">
                        <img id="post-user-image" src="${post.user.profileImageUrl}" alt="">
                        <p id="post-user-name">${post.user.nickname}</p>
                        <p id="post-created-at">${post.createdAt}</p>
                    </div>
                    ${post.isMine ? `
                    <div>
                        <button class="edit-delete-button" id="edit-button">수정</button>
                        <button  class="edit-delete-button" id="delete-button">삭제</button>
                    </div>` : ""}
                </div>
            </div>
            <hr>
            <div id="content-section">
                ${post.imageUrl ? `<img src="${post.imageUrl}" alt="">` : ""}
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
        </div>`;
    }

    // 게시글 이벤트
    function bindPostEvents() {
        const editButton = container.querySelector("#edit-button");
        const deleteButton = container.querySelector("#delete-button");

        if (editButton) editButton.addEventListener("click", () => navigateTo(ROUTES.POST_FORM(postId)));
        if (deleteButton) deleteButton.addEventListener("click", () => deletePostModal.open());
    }

    // 무한 스크롤 감지
    function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadMoreComments();
        }
    }

    window.addEventListener("scroll", handleScroll);
    $commentWriteButton.addEventListener("click", handleWriteComment);

    // 초기 렌더링
    renderPost();
    loadMoreComments();

    return container;
}

import {deletePost, getPost, togglePostLike} from "../../api/postApi.js";
import Modal from "../../components/modal/modal.js";
import { ROUTES } from "../../constants/routes.js";
import {getComments, deleteComment, createComment} from "../../api/commentApi.js";
import CommentListItem from "./component/CommentListItem.js";
import {formatDateTime} from "../../util/dateUtil.js";
import Component from "../../core/Component.js";
import {navigate} from "../../router.js";
import renderMarkdown from "../../util/renderMarkdown.js";

const pageLimit = 10;
export default class PostDetailPage extends Component {
    renderCommentCount = 0;
    setup() {
        this.state = {
            postId: this.props,
            post: null,
            isPostLoading: false,
            comments: [],
            cursor: null,
            isLoading: false,
            hasNextPage: true,
        };

        this.loadCSS("/style/post-detail-page.css");
        this.loadCSS("/style/loading-indicator.css");

        this.deletePostModal = new Modal({
            title: "게시글을 삭제하시겠습니까?",
            content: "삭제한 내용은 복구할 수 없습니다.",
            confirmText: "확인",
            onConfirm: async () => await this.handleDeletePost(),
        });

        this.deleteCommentModal = new Modal({
            title: "댓글을 삭제하시겠습니까?",
            content: "삭제한 내용은 복구할 수 없습니다.",
            confirmText: "확인",
            onConfirm: async (commentId) => await this.handleDeleteComment(commentId),
        });

        this.fetchPost();
    }

    template() {
        const { post, isPostLoading } = this.state;

        return `
        <div id="post-detail-container">
            <div id="post-detail-section">
                ${isPostLoading ? "" : post ? `
                <div id="post-detail">
                    <div id="top-section">
                        <div id="post-user">
                            <img id="post-user-image" src="${post.user.profileImageUrl}" alt="">
                            <p id="post-user-name">${post.user.nickname}</p>
                        </div>
                        <h2 id="post-title">${post.title}</h2>
                        <div id="post-info">
                            <div id="post-meta">
                                <p id="post-created-at">${formatDateTime(post.createdAt)}</p>
                                <p id="post-view-count">조회수: ${post.viewCount}</p>
                            </div>
                            ${post.isMine ? `
                            <div>
                                <button class="edit-delete-button" id="edit-button">수정</button>
                                <button class="edit-delete-button" id="delete-button">삭제</button>
                            </div>` : ""}
                        </div>
                    </div>
                    <hr>
                    <div id="content-section">
                        <div id="content-text">${renderMarkdown(post.content)}</div>
                        <div class="content-stats ${post.isLiked ? "liked" : ""}" id="content-like-stat">
                            <img width="24px" height="24px" src="${post.isLiked ? "/resources/thumbs-up.svg" : "/resources/thumbs-up-purple.svg"}" alt="좋아요">
                            <p id="content-like-stat-count">${post.likeCount}</p>
                        </div>
                    </div>
                </div>` : ""}
            </div>
            <div id="comment-section">
                <div>
                    ${isPostLoading ? "" : post ? `
                    <div id="content-comment-stat">
                        <p>댓글</p>
                        <p id="comment-count">${post.commentCount}</p>
                    </div>
                    <div id="comment-write-div">
                        <label><textarea id="comment-editor" placeholder="댓글을 남겨주세요!"></textarea></label>
                        <hr>
                        <button id="comment-write-button">댓글 등록</button>
                    </div>` : ""}
                </div>
                <div id="comment-list"></div>
                <div id="pagination-loading-indicator" style="display: ${(this.state.hasNextPage && !this.state.isPostLoading) ? "block" : "none"};">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        </div>

    `;
    }

    mounted() {
        this.getContainer().appendChild(this.deletePostModal.getContainer());
        this.getContainer().appendChild(this.deleteCommentModal.getContainer());
        this.renderNewComments();
        this.observeLoadingIndicator();
    }

    setEvent() {
        this.addEvent("click", "#comment-write-button", () => this.handleWriteComment());
        this.addEvent("click", "#content-like-stat", () => this.handleLikeToggle());
        this.addEvent("click", "#edit-button", () => this.onEditPostPress());
        this.addEvent("click", "#delete-button", () => this.onDeletePostPress());
    }


    observeLoadingIndicator() {
        const $indicator = this.$container.querySelector(".loading-spinner");
        if (!$indicator) return;

        this.observer?.disconnect();
        this.observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !this.state.isLoading && this.state.hasNextPage) {
                this.fetchComments();
            }
        });
        this.observer.observe($indicator);
    }

    renderNewComments() {
        const $commentList = this.$container.querySelector("#comment-list");

        const commentToRender = this.state.comments.slice(this.renderCommentCount)
        commentToRender.forEach(comment => {
            const commentItem = new CommentListItem({
                comment,
                onDelete: () => this.onDeleteCommentPress(comment.id)
            });
            $commentList.appendChild(commentItem.getContainer());
        });
        this.renderCommentCount = this.state.comments.length;
    }

    async fetchPost() {
        this.showLoading();
        this.setState({ isPostLoading: true });
        try {
            const response = await getPost(this.state.postId);
            const post = response.data;

            if (!post) {
                this.$container.querySelector("#post-detail-section").innerHTML = `<p>게시글을 찾을 수 없습니다.</p>`;
                return;
            }

            this.setState({ post });
        } catch (error) {
            console.error("게시글 조회 실패:", error);
        } finally {
            this.hideLoading()
            this.setState({ isPostLoading: false });
        }
    }

    async fetchComments() {
        if (this.state.isLoading || !this.state.hasNextPage) return;

        this.setState({ isLoading: true });

        try {
            const { data } = await getComments(this.state.postId, this.state.cursor, pageLimit);
            const newComments = data.comments;

            if (newComments.length === 0) {
                this.setState({ hasNextPage: false, isLoading: false });
                return;
            }

            const $commentList = this.$container.querySelector("#comment-list");
            $commentList.innerHTML = "";

            this.renderCommentCount = 0
            this.setState({
                comments: [...this.state.comments, ...newComments],
                cursor: newComments[newComments.length - 1].id,
                hasNextPage: Boolean(newComments[newComments.length - 1].id),
                isLoading: false,
            });

        } catch (error) {
            console.error("댓글 로드 실패:", error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    async handleWriteComment() {
        const $commentEditor = this.$container.querySelector("#comment-editor");
        const content = $commentEditor.value.trim();

        if (!content) {
            alert("댓글을 입력해주세요.");
            return;
        }

        this.showLoading();
        try {
            await createComment(this.state.postId, content);
            alert("댓글이 등록되었습니다.");

            const $commentList = this.$container.querySelector("#comment-list");
            $commentList.innerHTML = "";

            this.renderCommentCount = 0
            this.setState({ comments: [], cursor: null, hasNextPage: true });
            this.fetchComments();
            $commentEditor.value = "";
        } catch (error) {
            console.error("댓글 등록 실패:", error);
        } finally {
            this.hideLoading();
        }
    }

    async handleDeleteComment(commentId) {
        this.showLoading();
        try {
            await deleteComment(this.state.postId, commentId);
            alert("댓글이 삭제되었습니다.");

            this.renderCommentCount = 0
            this.setState({ post: {...this.state.post, commentCount: this.state.post.commentCount - 1}, comments: [], cursor: null, hasNextPage: true });
            this.fetchComments();
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
        } finally {
            this.hideLoading();
        }
    }

    async handleDeletePost() {
        this.showLoading();
        try {
            await deletePost(this.state.postId);
            alert("게시글이 삭제되었습니다.");
            navigate(ROUTES.POSTS);
        } catch (error) {
            console.error("게시글 삭제 실패:", error);
        } finally {
            this.hideLoading();
        }
    }

    async handleLikeToggle() {
        this.showLoading();
        const response = await togglePostLike(this.state.postId);
        this.hideLoading();
        if (response) {
            const isLiked = response.data;
            const updatedPost = { ...this.state.post, likeCount: this.state.post.likeCount + (isLiked ? 1 : -1), isLiked: isLiked };
            this.setState({ post: updatedPost });
        }
    }

    onEditPostPress() {
        navigate(ROUTES.POST_FORM(this.state.postId))
    }

    onDeletePostPress() {
        this.deletePostModal.open();
    }

    onDeleteCommentPress(commentId) {
        this.deleteCommentModal.open(commentId);
    }
}

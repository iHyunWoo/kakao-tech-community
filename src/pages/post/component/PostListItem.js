import {navigateTo} from "../../../util/navigateTo.js";
import {ROUTES} from "../../../constants/routes.js";
import {formatDateTime} from "../../../util/dateUtil.js";

export default function PostListItem(post) {
    const $postItem = document.createElement("div");
    $postItem.className = "post-item";
    $postItem.setAttribute("role", "button");
    $postItem.setAttribute("data-id", post.id);
    $postItem.innerHTML = `
        <h2 class="post-title">${post.title}</h2>
        <div class="post-stats-date">
            <div class="post-stats">
                좋아요 ${post.likeCount} 댓글 ${post.commentCount} 조회수 ${post.viewCount}
            </div>
            <p class="post-date">${formatDateTime(post.createdAt)}</p>
        </div>
        <hr class="post-hr">
        <div class="post-user">
            <img class="post-user-image" src="${post.user.profileImageUrl}" alt="프로필 이미지">
            <p class="post-user-name">${post.user.nickname}</p>
        </div>
    `;
    $postItem.addEventListener("click", () => {
        navigateTo(ROUTES.POST_DETAIL(post.id));
    });
    return $postItem;
}

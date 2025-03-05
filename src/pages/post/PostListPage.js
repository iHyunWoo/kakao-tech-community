import loadCSS from "../../util/loadCSS.js";
import {ROUTES} from "../../constants/routes.js";
import {navigateTo} from "../../util/navigateTo.js";
import {getPosts} from "../../api/postApi.js";

export default function PostListPage() {
    loadCSS("/style/index.css")
    loadCSS("/style/post-list-page.css")

    const container = document.createElement("div");

    container.innerHTML = `
    <div id="top-section">
        <p id="top-hello">안녕하세요,<br>아무 말 대잔치 <strong>게시판</strong> 입니다.</p>
        <button id="write-post-button">게시글 작성</button>
    </div>

    <div id="post-list" class="post-list"></div>
    `;

    async function renderPosts() {
        const postListContainer = container.querySelector("#post-list");
        postListContainer.innerHTML = `<p>게시글을 불러오는 중...</p>`;

        const posts = await getPosts();
        if (posts.length === 0) {
            postListContainer.innerHTML = `<p>게시글이 없습니다.</p>`;
            return;
        }

        postListContainer.innerHTML = posts
            .map(post => `
                <div class="post-item" role="button" data-id="${post.id}">
                    <h2 class="post-title">${post.title}</h2>
                    <div class="post-stats-date">
                        <div class="post-stats">
                            좋아요 ${post.likeCount} 댓글 ${post.commentCount} 조회수 ${post.viewCount}
                        </div>
                        <p class="post-date">${post.createdAt}</p>
                    </div>
                    <hr class="post-hr">
                    <div class="post-user">
                        <img class="post-user-image" src="${post.author.profileImageUrl}" alt="프로필 이미지">
                        <p class="post-user-name">${post.author.name}</p>
                    </div>
                </div>
            `)
            .join("");

        // 게시글 클릭 시 상세 페이지 이동
        container.querySelectorAll(".post-item").forEach(postItem => {
            postItem.addEventListener("click", () => {
                const postId = postItem.getAttribute("data-id");
                navigateTo(ROUTES.POST_DETAIL(postId));
            });
        });
    }

    container.querySelector("#write-post-button").addEventListener("click", () => {
        navigateTo(ROUTES.POST_FORM())
    })


    renderPosts();

    return container;
}

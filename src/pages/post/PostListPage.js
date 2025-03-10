import loadCSS from "../../util/loadCSS.js";
import { ROUTES } from "../../constants/routes.js";
import { navigateTo } from "../../util/navigateTo.js";
import { getPosts } from "../../api/postApi.js";

export default function PostListPage() {
    loadCSS("/style/index.css");
    loadCSS("/style/post-list-page.css");

    const $container = document.createElement("div");

    $container.innerHTML = `
        <div id="top-section">
            <p id="top-hello">안녕하세요,<br>아무 말 대잔치 <strong>게시판</strong> 입니다.</p>
            <button id="write-post-button">게시글 작성</button>
        </div>
        <div id="post-list" class="post-list"></div>
    `;

    const $postList = $container.querySelector("#post-list");

    let isLoading = false; // 중복 로딩 방지
    let hasNextPage = true; // 다음 페이지 존재 여부
    let cursor = null; // 마지막 데이터의 id (커서)

    // 게시글 렌더링
    async function fetchPosts() {
        if (isLoading || !hasNextPage) return;

        isLoading = true;

        try {
            const { data } = await getPosts(cursor); // 커서 기반 데이터 가져오기
            const posts = data.posts
            if (posts.length === 0 && !cursor) {
                renderEmptyMessage($postList);
                hasNextPage = false;
                return;
            }

            // 뷰에 렌더링
            addPostList(posts, $postList);
            const nextCursor = posts[posts.length - 1].id
            cursor = nextCursor;
            if (!nextCursor) hasNextPage = false; // 다음 페이지 없으면 종료
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
        } finally {
            isLoading = false;
        }
    }

    // 무한 스크롤 감지
    function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 100) { // 끝에서 100px 남기고 로드
            fetchPosts();
        }
    }

    // 글쓰기 버튼
    function addEventListeners() {
        $container.querySelector("#write-post-button").addEventListener("click", () => {
            navigateTo(ROUTES.POST_FORM());
        });

        window.addEventListener("scroll", handleScroll); // 무한 스크롤 감지
    }

    addEventListeners();
    fetchPosts(); // 초기 데이터 불러오기

    return $container;
}

function addPostList(posts, $postList) {
    posts.forEach(post => {
        const $postItem = createPostItem(post);
        $postList.appendChild($postItem);
    });
}

/* 게시글 없을 때 메시지 */
function renderEmptyMessage($postList) {
    $postList.innerHTML = `<p>게시글이 없습니다.</p>`;
}

function createPostItem(post) {
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
            <p class="post-date">${post.createdAt}</p>
        </div>
        <hr class="post-hr">
        <div class="post-user">
            <img class="post-user-image" src="${post.user.profileImageUrl}" alt="프로필 이미지">
            <p class="post-user-name">${post.user.name}</p>
        </div>
    `;
    $postItem.addEventListener("click", () => {
        navigateTo(ROUTES.POST_DETAIL(post.id));
    });
    return $postItem;
}

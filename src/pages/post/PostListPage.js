import loadCSS from "../../util/loadCSS.js";
import { ROUTES } from "../../constants/routes.js";
import { navigateTo } from "../../util/navigateTo.js";
import { getPosts } from "../../api/postApi.js";
import PostListItem from "./component/PostListItem.js";

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

    // 받아온 post를 렌더링
    function addPostList(posts, $postList) {
        posts.forEach(post => {
            const $postItem = PostListItem(post);
            $postList.appendChild($postItem);
        });
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

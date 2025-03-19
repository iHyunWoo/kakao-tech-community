import { ROUTES } from "../../constants/routes.js";
import { navigateTo } from "../../util/navigateTo.js";
import { getPosts } from "../../api/postApi.js";
import PostListItem from "./component/PostListItem.js";
import Component from "../../core/Component.js";

export default class PostListPage extends Component {
    setup() {
        this.state = {
            posts: [],
            isLoading: false,
            hasNextPage: true,
            cursor: null, // 마지막 데이터의 id
        };

        this.loadCSS("/style/post-list-page.css");
    }

    template() {
        return `
        <div id="top-section">
            <p id="top-hello">안녕하세요,<br>아무 말 대잔치 <strong>게시판</strong> 입니다.</p>
            <button id="write-post-button">게시글 작성</button>
        </div>
        <div id="post-list" class="post-list">
        </div>
        `;
    }

    mounted() {
        this.fetchPosts(); // 초기 데이터 불러오기
        window.addEventListener("scroll", this.handleScroll.bind(this)); // 무한 스크롤 감지
    }

    setEvent() {
        this.addEvent("click", "#write-post-button", () => {
            navigateTo(ROUTES.POST_FORM());
        });
    }

    async fetchPosts() {
        if (this.state.isLoading || !this.state.hasNextPage) return;

        this.setState({ isLoading: true });

        try {
            const { data } = await getPosts(this.state.cursor); // 커서 기반 데이터 가져오기
            const newPosts = data.posts;

            if (newPosts.length === 0) {
                this.setState({ hasNextPage: false });
                return;
            }

            const nextCursor = newPosts[newPosts.length - 1].id;
            this.setState({
                posts: [...this.state.posts, ...newPosts],
                cursor: nextCursor,
                hasNextPage: Boolean(nextCursor),
            });

        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        super.render();

        // 렌더 시 PostListItem 컴포넌트를 추가
        const $postList = this.$container.querySelector("#post-list");
        this.state.posts.forEach(post => {
            const postItem = new PostListItem({ post });
            $postList.appendChild(postItem.getContainer());
        });
    }

    handleScroll() {
        if (this.state.isLoading || !this.state.hasNextPage) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        console.log(scrollTop, scrollHeight, clientHeight)
        if (scrollTop + clientHeight >= scrollHeight - 100) { // 끝에서 100px 남기고 로드
            this.fetchPosts();
        }
    }
}

// export default function PostListPage() {
//     loadCSS("/style/index.css");
//     loadCSS("/style/post-list-page.css");
//
//     const $container = document.createElement("div");
//
//     $container.innerHTML = `
//         <div id="top-section">
//             <p id="top-hello">안녕하세요,<br>아무 말 대잔치 <strong>게시판</strong> 입니다.</p>
//             <button id="write-post-button">게시글 작성</button>
//         </div>
//         <div id="post-list" class="post-list"></div>
//     `;
//
//     const $postList = $container.querySelector("#post-list");
//
//     let isLoading = false; // 중복 로딩 방지
//     let hasNextPage = true; // 다음 페이지 존재 여부
//     let cursor = null; // 마지막 데이터의 id (커서)
//
//     // 게시글 렌더링
//     async function fetchPosts() {
//         if (isLoading || !hasNextPage) return;
//
//         isLoading = true;
//
//         try {
//             const { data } = await getPosts(cursor); // 커서 기반 데이터 가져오기
//             const posts = data.posts
//             if (posts.length === 0) {
//                 hasNextPage = false;
//                 return;
//             }
//
//             // 뷰에 렌더링
//             addPostList(posts, $postList);
//             const nextCursor = posts[posts.length - 1].id
//             cursor = nextCursor;
//             if (!nextCursor) hasNextPage = false; // 다음 페이지 없으면 종료
//         } catch (error) {
//             console.error("게시글 불러오기 실패:", error);
//         } finally {
//             isLoading = false;
//         }
//     }
//
//     // 받아온 post를 렌더링
//     function addPostList(posts, $postList) {
//         posts.forEach(post => {
//             const $postItem = PostListItem(post);
//             $postList.appendChild($postItem);
//         });
//     }
//
//     // 무한 스크롤 감지
//     function handleScroll() {
//         const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//
//         if (scrollTop + clientHeight >= scrollHeight - 100) { // 끝에서 100px 남기고 로드
//             fetchPosts();
//         }
//     }
//
//     // 글쓰기 버튼
//     function addEventListeners() {
//         $container.querySelector("#write-post-button").addEventListener("click", () => {
//             navigateTo(ROUTES.POST_FORM());
//         });
//
//         window.addEventListener("scroll", handleScroll); // 무한 스크롤 감지
//     }
//
//     addEventListeners();
//     fetchPosts(); // 초기 데이터 불러오기
//
//     return $container;
// }

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
            <p id="top-hello">오늘도 성장하는 하루,<br> <strong>오늘공부</strong>와 함께해요!</p>
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

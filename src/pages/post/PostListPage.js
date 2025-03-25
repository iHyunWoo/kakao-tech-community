import { ROUTES } from "../../constants/routes.js";
import { getPosts } from "../../api/postApi.js";
import PostListItem from "./component/PostListItem.js";
import Component from "../../core/Component.js";
import {navigate} from "../../router.js";

const pageLimit = 10;
export default class PostListPage extends Component {
    renderPostCount = 0;
    setup() {
        this.state = {
            posts: [],
            isLoading: false,
            hasNextPage: true,
            cursor: null, // 마지막 데이터의 id
        };

        this.loadCSS("/style/post-list-page.css");
        this.loadCSS("/style/loading-indicator.css");
    }

    template() {
        return `
        <div> 
            <div id="top-section">
                <p id="top-hello">오늘도 성장하는 하루,<br> <strong>오늘공부</strong>와 함께해요!</p>
                <button id="write-post-button">게시글 작성</button>
            </div>
            <div id="post-list-container">
                <div id="post-list" class="post-list">
                </div>
                <div id="pagination-loading-indicator" style="display: ${this.state.hasNextPage ? "block" : "none"};">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        </div>
        `;
    }

    mounted() {
        this.renderNewPosts()
        this.observeLoadingIndicator()
    }

    setEvent() {
        this.addEvent("click", "#write-post-button", () => {
            navigate(ROUTES.POST_FORM());
        });
    }

    observeLoadingIndicator() {
        const $indicator = this.$container.querySelector(".loading-spinner");
        if (!$indicator) return;

        this.observer?.disconnect();
        this.observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !this.state.isLoading && this.state.hasNextPage) {
                this.fetchPosts();
            }
        });
        this.observer.observe($indicator);
    }

    renderNewPosts() {
        const $postList = this.$container.querySelector("#post-list");
        if (!$postList) return;

        const postsToRender = this.state.posts.slice(this.renderPostCount);
        postsToRender.forEach(post => {
            const item = new PostListItem({ post });
            $postList.appendChild(item.getContainer());
        });
        this.renderPostCount = this.state.posts.length;
    }

    async fetchPosts() {
        if (this.state.isLoading || !this.state.hasNextPage) return;

        this.setState({ isLoading: true });

        try {
            const { data } = await getPosts(this.state.cursor, pageLimit); // 커서 기반 데이터 가져오기
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
}

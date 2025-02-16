import Component from "../../../../core/component.js";

const loadCSS = () => {
    if (!document.querySelector("#post-list-style")) {
        const link = document.createElement("link");
        link.id = "post-list-style";
        link.rel = "stylesheet";
        link.href = "./components/post-list/post-list.css";
        document.head.appendChild(link);
    }
};

export default class PostList extends Component {
    setup() {
        this.state = {posts: this.props.posts};
        loadCSS()
    }

    template() {
        return `
            <div class="post-list">
                ${this.state.posts
            .map(post => ( `
                <div class="post-item" role="button ">
                    <h2 class="post-title">${post.title}</h2>
                    <div class="post-stats-date">
                        <div class="post-stats">
                            좋아요 ${post.likes} 댓글 ${post.comments} 조회수 ${post.views}
                        </div>
                        <p class="post-date">${post.date}</p>
                    </div>
                    <hr class="post-hr">
                    <div class="post-user">
                        <img class="post-user-image" src="${post.author.profileImage}" alt="">
                        <p class="post-user-name">${post.author.name}</p>
                    </div>
                </div>
            `))
            .join("")
        }
            </div>
        `
    }

    setEvent() {
        this.addEvent("click", ".post-item", (event) => {

        })
    }

    setPosts(posts) {
        this.setState({posts});
    }
}

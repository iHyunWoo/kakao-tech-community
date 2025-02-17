import Component from "../../../../core/component.js";
import {getPostDetail} from "../../../../repositories/post/post-repository.js";

const loadCSS = () => {
    if (!document.querySelector("#post-detail-style")) {
        const link = document.createElement("link");
        link.id = "post-detail-style";
        link.rel = "stylesheet";
        link.href = "/pages/post/components/post-detail/post-detail.css";
        document.head.appendChild(link);
    }
};

export default class PostDetail extends Component {
    setup() {
        this.state = { post: this.props.post };

        loadCSS();
    }

    template() {
        const post = this.state.post;
        return `
            <div id="post-detail">
                <div id="top-section">
                  <h2 id="post-title">${post.title}</h2>
                  <div id="post-info">
                    <div id="post-user">
                      <img id="post-user-image" src="${post.author.profileImage}" alt="">
                      <p id="post-user-name">${post.author.name}</p>
                      <p id="post-created-at">${post.date}</p>
                    </div>
                    ${post.isMine ? `
                    <div id="edit-delete-button">
                      <button class="edit-delete-button" id="edit-button">수정</button>
                      <button class="edit-delete-button" id="delete-button">삭제</button>
                    </div>
                    ` : ""}
                  </div>
                </div>
                <hr>
                <div id="content-section">
                  <img id="content-image" src="${post.imageUrl}" alt="">
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
                <hr>
            </div>
        `
    }
}
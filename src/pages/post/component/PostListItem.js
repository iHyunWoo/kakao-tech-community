import {ROUTES} from "../../../constants/routes.js";
import {formatDateTime} from "../../../util/dateUtil.js";
import Component from "../../../core/Component.js";
import {navigate} from "../../../router.js";

export default class PostListItem extends Component {
    setup() {
        this.state = {
            post: this.props.post,
        }
    }

    template() {
        const {id, title, imageUrl, likeCount, commentCount, createdAt, user} = this.state.post;

        return `
        <div class="post-card" role="button" data-id="${id}">
            ${
            imageUrl
            ? `<img class="post-card-thumbnail" src="${imageUrl}" alt="${title}" />`
            : `<div class="post-card-thumbnail placeholder"></div>`
            }
            <div class="post-card-body">
                <h2 class="post-card-title">${title}</h2>
                <div class="post-card-meta">
                    <span class="post-time">${formatDateTime(createdAt)}</span>
                    <span class="post-comments">· ${commentCount}개의 댓글</span>
                </div>
            </div>
            <div class="post-card-footer">
                <div class="post-card-author">
                    <img src="${user.profileImageUrl}" class="author-image" alt="작성자 이미지">
                    <span class="author-name">${user.nickname}</span>
                </div>
                <div class="post-card-like">
                    <img width="24" height="24" src="/resources/thumbs-up-purple.svg" alt="좋아요">
                    <span class="like-count">${likeCount}</span>
                </div>
                </div>
          </div>
        `;

    }

    setEvent() {
        this.addEvent("click", ".post-card", () => {
            navigate(ROUTES.POST_DETAIL(this.state.post.id));
        });
    }
}


import {navigateTo} from "../../../util/navigateTo.js";
import {ROUTES} from "../../../constants/routes.js";
import {formatDateTime} from "../../../util/dateUtil.js";
import Component from "../../../core/Component.js";

export default class PostListItem extends Component {
    setup() {
        this.state = {
            post: this.props.post,
        }
    }

    template() {
        const {id, title, likeCount, commentCount, viewCount, createdAt, user} = this.state.post;

        return `
        <div class="post-item" role="button" data-id="${id}">
            <h2 class="post-title">${title}</h2>
            <div class="post-stats-date">
                <div class="post-stats">
                    좋아요 ${likeCount} 댓글 ${commentCount} 조회수 ${viewCount}
                </div>
                <p class="post-date">${formatDateTime(createdAt)}</p>
            </div>
            <hr class="post-hr">
            <div class="post-user">
                <img class="post-user-image" src="${user.profileImageUrl}" alt="프로필 이미지">
                <p class="post-user-name">${user.nickname}</p>
            </div>
        </div>
        `;
    }

    setEvent() {
        this.addEvent("click", ".post-item", () => {
            navigateTo(ROUTES.POST_DETAIL(this.state.post.id));
        });
    }
}


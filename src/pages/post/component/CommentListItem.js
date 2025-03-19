import {formatDateTime} from "../../../util/dateUtil.js";
import Component from "../../../core/Component.js";

export default class CommentListItem extends Component {
    setup() {
        this.state = {
            comment: this.props.comment, // 댓글 데이터 저장
            onDelete: this.props.onDelete, // 삭제 이벤트 핸들러 저장
        };
    }

    template() {
        const { id, content, createdAt, user, isMine } = this.state.comment;

        return `
        <div class="comment-item">
            <div class="comment-top-section">
                <div class="comment-user-date">   
                    <img class="comment-user-image" src="${user.profileImageUrl}" alt="프로필 이미지">
                    <p class="comment-user-name">${user.nickname}</p>
                    <p class="comment-date">${formatDateTime(createdAt)}</p>
                </div>
                ${isMine ? `
                <div class="comment-edit-delete-button">
                    <button class="comment-delete-button" data-comment-id="${id}">삭제</button>
                </div>
               ` : ""}
            </div>
            <p class="comment-comment">${content}</p>
        </div>
        `;
    }

    setEvent() {
        this.addEvent("click", ".comment-delete-button", (event) => {
            const commentId = event.target.dataset.commentId;
            if (this.state.onDelete) this.state.onDelete(commentId);
        });
    }
}

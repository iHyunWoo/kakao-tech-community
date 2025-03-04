import Component from "../../../../core/component.js";

export default class CommentList extends Component {
    setup() {
        this.state = {comments: this.props.comments};
        this.loadCSS(
            "comment-list-style",
            "/pages/post/components/comment-list/comment-list.css"
        );
    }

    template() {
        return `
           ${this.state.comments
            .map(comment => (`
                <div id="comment-item">
                    <div id="comment-top-section">
                        <div id="comment-user-date">   
                            <img id="comment-user-image" src="${comment.author.profileImageUrl}" alt="">
                            <p id="comment-user-name">${comment.author.name}</p>
                            <p id="comment-date">${comment.createdAt}</p>
                        </div>
                        ${comment.isMine ? `
                        <div id="comment-edit-delete-button">
                            <button class="comment-edit-button">수정</button>
                            <button class="comment-delete-button">삭제</button>
                        </div>
                        `: ""}
                    </div>
                    <p id="comment-comment">${comment.content}</p>
                </div>
            `))
            .join("")
        }
        `
    }
}

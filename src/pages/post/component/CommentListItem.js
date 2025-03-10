export default function CommentListItem(comment, { onDelete }) {
    const isMineButtons = comment.isMine ? `
        <div class="comment-edit-delete-button">
            <button class="comment-delete-button" data-comment-id="${comment.id}">삭제</button>
        </div>
    ` : '';

    const $commentItem = document.createElement("div");
    $commentItem.className = "comment-item";
    $commentItem.innerHTML = `
        <div class="comment-item">
            <div class="comment-top-section">
                <div class="comment-user-date">   
                    <img class="comment-user-image" src="${comment.user.profileImageUrl}" alt="">
                    <p class="comment-user-name">${comment.user.nickname}</p>
                    <p class="comment-date">${comment.createdAt}</p>
                </div>
                ${comment.isMine ? `
                <div class="comment-edit-delete-button">
<!--                    <button class="comment-edit-button">수정</button>-->
                    <button class="comment-delete-button" data-comment-id="${comment.id}">삭제</button>
                </div>
               ` : ""}
            </div>
            <p class="comment-comment">${comment.content}</p>
        </div>
    `;

    // 삭제 버튼 이벤트 연결
    const deleteButton = $commentItem.querySelector(".comment-delete-button");
    if (deleteButton) {
        deleteButton.addEventListener("click", () => onDelete(comment.id));
    }

    return $commentItem;
}

import {apiRequest} from "./apiRequest.js";

export async function getComments(postId, cursor = null, limit = 10) {
    let url = `/posts/${postId}/comments?limit=${limit}`;
    if (cursor) {
        url += `&cursor=${cursor}`;
    }
    return apiRequest(url, "GET", null)
}

export async function createComment(postId, content) {
    return apiRequest(`/posts/${postId}/comments`, "POST", {content})
}

export async function deleteComment(postId, commentId) {
    return apiRequest(`/posts/${postId}/comments/${commentId}`, "DELETE")
}

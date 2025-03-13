import {apiRequest} from "./apiRequest.js";

export async function getPosts(cursor = null, limit = 10) {
    let url = `/posts?limit=${limit}`;
    if (cursor) {
        url += `&cursor=${cursor}`;
    }
    return apiRequest(url, "GET", null)
}

export async function getPost(postId) {
    return apiRequest(`/posts/${postId}`, "GET", null)
}

export async function createPost(title, content, imageUrl) {
    const body = {title, content, imageUrl}
    return apiRequest(`/posts`, "POST", body)
}

export async function updatePost(postId, title, content, imageUrl) {
    const body = {title, content, imageUrl}
    return apiRequest(`/posts/${postId}`, "PUT", body)
}

export async function deletePost(postId) {
    return apiRequest(`/posts/${postId}`, "DELETE")
}

export async function togglePostLike(postId) {
    return apiRequest(`/posts/${postId}/likes`, "POST")
}

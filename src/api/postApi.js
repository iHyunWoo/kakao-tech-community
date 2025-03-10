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

export async function deletePost(postId) {}

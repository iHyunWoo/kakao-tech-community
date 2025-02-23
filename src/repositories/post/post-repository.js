import {postDummyDataList, commentDummyDataList} from "./post-dummy-data.js";


function getPosts() {
    return postDummyDataList;
}

function getPost(id) {
    const idInt = parseInt(id);
    return postDummyDataList.find(post => post.id === idInt);
}

function getPostComments(postId) {
    const idInt = parseInt(postId);
    return commentDummyDataList.filter(comment => comment.postId === idInt);
}

export { getPosts, getPost, getPostComments };


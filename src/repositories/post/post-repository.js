import {postDetailDummyDataList, postPreviewCountDummyDataList} from "./post-dummy-data-state-holder.js";


function getPostPreview() {
    return postPreviewCountDummyDataList;
}

function getPostDetail(id) {
    const idInt = parseInt(id);
    return postDetailDummyDataList.find(post => post.id === idInt);
}

export { getPostPreview, getPostDetail };


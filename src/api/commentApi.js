import {CustomError, ERROR_TYPES} from "../core/custom-error.js";
import {handleError} from "../core/error-handler.js";

export async function getComments(postId) {
    try {
        const url = `/dummy-data/comment-dummy-data.json`
        const response = await fetch(url)

        if (!response.ok) {
            throw new CustomError(ERROR_TYPES.NETWORK_ERROR, `${url} - ${response.status}`);
        }

        const json = await response.json();
        const idInt = parseInt(postId);
        return json.data.comments.filter(comment => comment.postId === idInt);


    } catch (error) {
        handleError(error.toString());
    }
}

export async function deleteComment(commentId) {

}

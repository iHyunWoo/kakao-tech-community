import {handleError} from "../../core/error-handler.js";
import {CustomError, ERROR_TYPES} from "../../core/custom-error.js";

const PostRepository = {
    async getPosts() {
        try {
            const url = `/dummy-data/post-dummy-data.json`
            const response = await fetch(url)

            if (!response.ok) {
                throw new CustomError(ERROR_TYPES.NETWORK_ERROR, `${url} - ${response.status}`);
            }
            const json = await response.json();
            return json.data.posts;
        } catch (error) {
            handleError(error.toString());
        }
    },
    async getPost(postId) {
        try {
            const url = `/dummy-data/post-dummy-data.json`
            const response = await fetch(url)

            if (!response.ok) {
                throw new CustomError(ERROR_TYPES.NETWORK_ERROR, `${url} - ${response.status}`);
            }

            const json = await response.json();
            const idInt = parseInt(postId);
            return json.data.posts.find(post => post.id === idInt);


        } catch (error) {
            handleError(error.toString());
        }
    },
    async getComments(postId) {
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
}

export default PostRepository;


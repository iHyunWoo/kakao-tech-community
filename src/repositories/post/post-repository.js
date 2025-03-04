import {handleError} from "../../core/error-handler.js";

const PostRepository = {
    async getPosts() {
        try {
            const response = await fetch(`/dummy-data/post-dummy-data.json`)

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const json = await response.json();
            return json.data.posts;
        } catch (error) {
            handleError(error);
        }
    },
    async getPost(postId) {
        try {
            const response = await fetch(`/dummy-data/post-dummy-data.json`)

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const json = await response.json();
            const idInt = parseInt(postId);
            return json.data.posts.find(post => post.id === idInt);


        } catch (error) {
            handleError(error);
        }
    },
    async getComments(postId) {
        try {
            const response = await fetch(`/dummy-data/comment-dummy-data.json`)

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const json = await response.json();
            const idInt = parseInt(postId);
            return json.data.comments.filter(comment => comment.postId === idInt);


        } catch (error) {
            handleError(error);
        }
    }
}

export default PostRepository;


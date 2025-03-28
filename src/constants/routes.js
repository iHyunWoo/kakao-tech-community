export const ROUTES = {
    HOME: "/",
    AUTH: "/login",
    LOGIN: "/login",
    SIGNUP: "/signup",
    POSTS: "/posts",
    POST_DETAIL: (id) => `/posts/${id}`,
    POST_FORM: (id) => `/posts/form/${id || ""}`,
    PROFILE_EDIT: "/profile/edit",
    PASSWORD_EDIT: "/password/edit",
    TEST: "/test",
};

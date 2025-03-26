import {ROUTES} from "./constants/routes.js";
import {addRoute, navigate, renderRoute} from "./router.js";
import PostListPage from "./pages/post/PostListPage.js";
import PostDetailPage from "./pages/post/PostDetailPage.js";
import PostFormPage from "./pages/post/PostFormPage.js";
import ProfileEditPage from "./pages/profile/ProfileEditPage.js";
import PasswordEditPage from "./pages/profile/PasswordEditPage.js";
import VDomPerformancePage from "./pages/V-DOMTestPage.js";
import AuthPage from "./pages/auth/AuthPage.js";

const initialRoute = [ROUTES.AUTH];

addRoute(ROUTES.AUTH, AuthPage)
addRoute(ROUTES.POSTS, PostListPage);
addRoute("/posts/:id", PostDetailPage);
addRoute("/posts/form/:id?", PostFormPage);
addRoute(ROUTES.PROFILE_EDIT, ProfileEditPage);
addRoute(ROUTES.PASSWORD_EDIT, PasswordEditPage);
// addRoute(ROUTES.TEST, VDomPerformancePage);

// 초기 라우팅
if (window.location.pathname === "/") {
    navigate(initialRoute);
}

document.addEventListener("DOMContentLoaded", () => {
    renderRoute();
});

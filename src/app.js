import {ROUTES} from "./constants/routes.js";
import LoginPage from "./pages/login/LoginPage.js";
import {addRoute, navigate, renderRoute} from "./router.js";
import PostListPage from "./pages/post/PostListPage.js";
import PostDetailPage from "./pages/post/PostDetailPage.js";
import Header from "./components/header/Header.js";
import PostFormPage from "./pages/post/PostFormPage.js";
import SignupPage from "./pages/signup/SignUpPage.js";
import ProfileEditPage from "./pages/profile/ProfileEditPage.js";
import PasswordEditPage from "./pages/profile/PasswordEditPage.js";
import VDomPerformancePage from "./pages/V-DOMTestPage.js";

localStorage.removeItem("isLoggedIn");
const isLoggedIn = localStorage.getItem("isLoggedIn");

// 로그인 여부에 따른 초기 라우트 설정
const initialRoute = isLoggedIn ? [ROUTES.POSTS] : [ROUTES.LOGIN];

addRoute(ROUTES.LOGIN, LoginPage);
addRoute(ROUTES.SIGNUP, SignupPage);
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

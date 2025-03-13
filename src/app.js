import {ROUTES} from "./constants/routes.js";
import LoginPage from "./pages/login/LoginPage.js";
import Router from "./router.js";
import PostListPage from "./pages/post/PostListPage.js";
import PostDetailPage from "./pages/post/PostDetailPage.js";
import Header from "./components/header/Header.js";
import PostFormPage from "./pages/post/PostFormPage.js";
import SignupPage from "./pages/signup/SignUpPage.js";
import ProfileEditPage from "./pages/profile/ProfileEditPage.js";
import PasswordEditPage from "./pages/profile/PasswordEditPage.js";

localStorage.removeItem("isLoggedIn");
const isLoggedIn = localStorage.getItem("isLoggedIn");

// 로그인 여부에 따른 초기 라우트 설정
const initialRoute = isLoggedIn ? [ROUTES.POSTS] : [ROUTES.LOGIN];

// 헤더 동적 업데이트
function updateHeader(currentPath) {
    const headerContainer = document.querySelector("#header-container");
    headerContainer.innerHTML = ""; // 기존 헤더 제거

    const headerConfig = {
        [ROUTES.LOGIN]: { showBackButton: false, showProfile: false },
        [ROUTES.SIGNUP]: { showBackButton: true, showProfile: false },
        [ROUTES.POSTS]: { showBackButton: false, showProfile: true },
    };

    const { showBackButton = true, showProfile = true } = headerConfig[currentPath] || {};
    const userInfo = JSON.parse(localStorage.getItem("user")) || {};
    const profileImage = userInfo.profileImageUrl || "https://placehold.co/36";
    headerContainer.appendChild(Header({ showBackButton, showProfile, profileImage }));
}

// 라우트 설정
const routes = {
    [ROUTES.HOME]: () => location.hash = `#${initialRoute}`,
    [ROUTES.LOGIN]: LoginPage,
    [ROUTES.SIGNUP]: SignupPage,
    [ROUTES.POSTS]: PostListPage,
    "/posts/:id": (params) => PostDetailPage(params.id),
    "/posts/form/:id?": (params) => PostFormPage({ mode: params.id ? "update" : "create", postId: params.id }),
    [ROUTES.PROFILE_EDIT]: ProfileEditPage,
    [ROUTES.PASSWORD_EDIT]: PasswordEditPage,
};

const router = new Router(routes, updateHeader);
updateHeader(location.hash.replace("#", "") || "/"); // 초기 실행

// 라우트 변경 시 헤더 업데이트
window.addEventListener("hashchange", () => {
    updateHeader(location.hash.replace("#", "") || "/");
});

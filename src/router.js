import {ROUTES} from "./constants/routes.js";
import Header from "./components/header/Header.js";

const routes = [];
const root = document.querySelector("#app");
let currentComponent = null;

export function addRoute(path, component) {
    routes.push({ path, component });
}

export function matchRoute(pathname) {
    for (const { path, component } of routes) {
        const pathRegex = new RegExp("^" + path.replace(/:\w+/g, "(\\w+)") + "$");
        const match = pathname.match(pathRegex);
        if (match) {
            const params = match.slice(1); // 첫 번째 그룹부터 param으로 저장
            return { component, params };
        }
    }
    return null;
}

export function navigate(path) {
    window.history.pushState({}, "", path);
    renderRoute();
}

export function goBack() {
    window.history.back();
}

window.addEventListener("popstate", renderRoute);

export function renderRoute() {
    const matched = matchRoute(window.location.pathname);
    if (matched) {
        const { component, params } = matched;

        // 기존 컴포넌트 언마운트
        if (currentComponent) {
            currentComponent.unmount();
        }
        currentComponent = new component(...params)

        root.innerHTML = "";
        root.appendChild(currentComponent.getContainer())
        updateHeader(window.location.pathname);
    }
}

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

    const headerComponent = new Header({ showBackButton, showProfile, profileImage });
    headerContainer.appendChild(headerComponent.getContainer());
}


// export default class Router {
//     constructor(routes) {
//         this.routes = routes;
//         this.routeChange = this.routeChange.bind(this);
//         window.addEventListener("hashchange", this.routeChange);
//         document.addEventListener("DOMContentLoaded", this.routeChange);
//     }
//
//     routeChange() {
//         let path = location.hash.replace("#", "") || "/"; // `#/posts/1` → `/posts/1`
//
//         // 먼저 정적 라우트가 존재하는지 확인
//         if (this.routes[path]) {
//             this.renderView(this.routes[path]);
//             return;
//         }
//
//         // 동적 라우트 처리
//         for (const routePattern of Object.keys(this.routes)) {
//             if (routePattern.includes(":")) {
//                 const regex = new RegExp(`^${routePattern.replace(/:\w+/g, "(\\w+)")}$`);
//                 const match = path.match(regex);
//
//                 if (match) {
//                     const paramNames = (routePattern.match(/:\w+/g) || []).map(name => name.substring(1));
//                     const params = paramNames.reduce((acc, name, index) => {
//                         acc[name] = match[index + 1];
//                         return acc;
//                     }, {});
//
//                     this.renderView(this.routes[routePattern](params));
//                     return;
//                 }
//             }
//         }
//
//         // 존재하지 않는 라우트는 404 처리
//         this.renderView(this.routes["/404"]);
//     }
//
//     renderView(view) {
//         const app = document.querySelector("#app");
//         app.innerHTML = "";
//         app.appendChild(view.getContainer());
//     }
// }

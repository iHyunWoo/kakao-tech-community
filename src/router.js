export default class Router {
    constructor(routes) {
        this.routes = routes;
        this.routeChange = this.routeChange.bind(this);
        window.addEventListener("hashchange", this.routeChange);
        document.addEventListener("DOMContentLoaded", this.routeChange);
    }

    routeChange() {
        let path = location.hash.replace("#", "") || "/"; // `#/posts/1` → `/posts/1`

        // 먼저 정적 라우트가 존재하는지 확인
        if (this.routes[path]) {
            this.renderView(this.routes[path]);
            return;
        }

        // 동적 라우트 처리
        for (const routePattern of Object.keys(this.routes)) {
            if (routePattern.includes(":")) {
                const regex = new RegExp(`^${routePattern.replace(/:\w+/g, "(\\w+)")}$`);
                const match = path.match(regex);

                if (match) {
                    const paramNames = (routePattern.match(/:\w+/g) || []).map(name => name.substring(1));
                    const params = paramNames.reduce((acc, name, index) => {
                        acc[name] = match[index + 1];
                        return acc;
                    }, {});

                    this.renderView(this.routes[routePattern](params));
                    return;
                }
            }
        }

        // 존재하지 않는 라우트는 404 처리
        this.renderView(this.routes["/404"]);
    }

    renderView(view) {
        const app = document.querySelector("#app");
        app.innerHTML = "";
        app.appendChild(view.getContainer());
    }
}

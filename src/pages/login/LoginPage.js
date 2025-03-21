import {ROUTES} from "../../constants/routes.js";
import {validateEmail, validatePassword} from "../../util/validators.js";
import {getUserInfo, login} from "../../api/userApi.js";
import Component from "../../core/Component.js";
import {navigate} from "../../router.js";

export default class LoginPage extends Component {
    setup() {
        super.setup();
        this.state = {
            email: "",
            password: "",
            emailError: "",
            passwordError: "",
        };

        this.loadCSS("/style/login-page.css");
    }

    template() {
        const { email, password, emailError, passwordError } = this.state;
        return `
        <div class="login-container">
            <h2 class="login-title">로그인</h2>
            <form id="login-form">
                <label class="login-label" for="email">이메일</label>
                <input class="login-input" type="text" id="email" value="${email}" placeholder="이메일을 입력하세요">
                <p class="login-alert-message" id="email-alert-message">${emailError}</p>
                
                <label class="login-label" for="password">비밀번호</label>
                <input class="login-input" type="password" id="password" value="${password}" placeholder="비밀번호를 입력하세요">
                <p class="login-alert-message" id="password-alert-message">${passwordError || ""}</p>
                
                <input class="login-button" type="submit" value="로그인">
            </form>
            <a id="signup-button">회원가입</a>
        </div>
        `;
    }

    setEvent() {
        this.addEvent("input", "#email", (event) => {
            // setState가 아닌 직접 상태를 지정하여 입력 시 리렌더링 방지
            this.state.email = event.target.value;
            this.state.emailError = "";
        });

        this.addEvent("input", "#password", (event) => {
            // setState가 아닌 직접 상태를 지정하여 입력 시 리렌더링 방지
            this.state.password = event.target.value;
            this.state.passwordError = "";
        });

        this.addEvent("submit", "#login-form", (event) => {
            event.preventDefault();
            this.onLoginSubmit();
        });

        this.addEvent("click", "#signup-button", () => {
            navigate(ROUTES.SIGNUP);
        });
    }

    async handleLogin(email, password) {
        this.showLoading();
        try {
            await login(email, password);
            const userInfoResponse = await getUserInfo();
            const userInfo = userInfoResponse.data;
            if (userInfo) {
                localStorage.setItem("user", JSON.stringify(userInfo));
            }
            alert("로그인 성공!");
            navigate(ROUTES.POSTS);
        } catch (error) {
            alert(`로그인 실패: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    onLoginSubmit() {
        const { email, password } = this.state;

        if (!validateEmail(email)) {
            this.setState({ emailError: "올바른 이메일 주소 형식을 입력해주세요." });
            return;
        }

        if (!validatePassword(password)) {
            this.setState({
                passwordError: "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개씩 포함해야 합니다."
            });
            return;
        }

        this.handleLogin(email, password);
    }
}

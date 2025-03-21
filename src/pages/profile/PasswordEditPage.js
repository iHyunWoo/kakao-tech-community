import {validatePassword} from "../../util/validators.js";
import {updatePassword} from "../../api/userApi.js";
import {ROUTES} from "../../constants/routes.js";
import Component from "../../core/Component.js";
import {navigate} from "../../router.js";

export default class PasswordEditPage extends Component {
    setup() {
        this.state = {
            password: "",
            passwordConfirm: "",
            errors: {
                password: "",
                passwordConfirm: "",
            },
        };

        this.loadCSS("/style/password-edit-page.css");
    }

    template() {
        const { password, passwordConfirm, errors } = this.state;

        return `
        <div id="password-edit-container">
            <h2 id="password-edit-header">비밀번호 수정</h2>
    
            <form id="password-edit-form">
                <label class="password-label" for="password">비밀번호*</label>
                <input class="password-input" type="password" id="password" placeholder="비밀번호를 입력하세요" value="${password}">
                <p class="password-alert-message" id="password-alert-message">${errors.password || ""}</p>
        
                <label class="password-label" for="password-confirm">비밀번호 확인*</label>
                <input class="password-input" type="password" id="password-confirm" placeholder="비밀번호를 한번 더 입력하세요" value="${passwordConfirm}">
                <p class="password-alert-message" id="password-confirm-alert-message">${errors.passwordConfirm || ""}</p>
        
                <input class="password-edit-button" type="submit" id="password-edit-submit-button" value="수정하기">
            </form>
        </div>
        `;
    }

    setEvent() {
        this.addEvent("input", "#password", (e) => {
            // setState가 아닌 직접 상태를 지정하여 입력 시 리렌더링 방지
            this.state.password = e.target.value;
            this.state.errors.password = "";

        });
        this.addEvent("input", "#password-confirm", (e) =>  {
            // setState가 아닌 직접 상태를 지정하여 입력 시 리렌더링 방지
            this.state.passwordConfirm = e.target.value;
            this.state.errors.passwordConfirm = "";
        });
        this.addEvent("submit", "#password-edit-form", (e) => {
            e.preventDefault();
            this.handlePasswordEdit()
        });
    }

    validateInputs() {
        const { password, passwordConfirm } = this.state;

        const setError = (field, message) => {
            this.setState({ errors: { [field]: message } });
            return false;
        };

        if (!password) return setError("password", "비밀번호를 입력해주세요.");
        if (!validatePassword(password)) return setError("password", "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개 포함해야 합니다.");

        if (!passwordConfirm) return setError("passwordConfirm", "비밀번호를 한번 더 입력해주세요.");
        if (password !== passwordConfirm) return setError("passwordConfirm", "비밀번호가 다릅니다.");

        this.setState({ errors: {} });
        return true;
    }


    async handlePasswordEdit() {
        if (!this.validateInputs()) return;
        this.showLoading();
        try {
            await updatePassword(this.state.password);
            alert("비밀번호가 수정되었습니다!");
            navigate(ROUTES.POSTS); // 게시판으로 이동
        } catch (error) {
            alert(error.message);
        } finally {
            this.hideLoading();
        }
    }
}

import {ROUTES} from "../../../constants/routes.js";
import {validateEmail, validatePassword} from "../../../util/validators.js";
import {register} from "../../../api/userApi.js";
import {uploadImageToImgBB} from "../../../api/imgbbApi.js";
import Component from "../../../core/Component.js";
import {navigate} from "../../../router.js";

export default class SignUpForm extends Component {
    setup() {
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
            nickname: "",
            profileImageUrl: "/resources/plus-in-circle.png",
            selectedImageFile: null,
            errors: {
                email: "",
                password: "",
                passwordConfirm: "",
                nickname: "",
            },
        };

        this.loadCSS("/style/index.css");
        this.loadCSS("/style/signup-page.css");
    }

    template() {
        const {email, password, passwordConfirm, nickname, profileImageUrl, errors} = this.state;

        return `
        <div id="signup-section">
            <h2 id="signup-title">회원가입</h2>
        
            <form id="signup-form">
                <div id="signup-form-grid">
                    <div id="signup-left-panel">
       
                        <label class="signup-label" for="email">이메일*</label>
                        <input class="signup-input" type="text" id="email" value="${email}" placeholder="이메일을 입력하세요">
                        <p class="signup-alert-message">${errors.email || ""}</p>
                
                        <label class="signup-label" for="password">비밀번호*</label>
                        <input class="signup-input" type="password" id="password" value="${password}" placeholder="비밀번호를 입력하세요">
                        <p class="signup-alert-message">${errors.password || ""}</p>
                
                        <label class="signup-label" for="password-confirm">비밀번호 확인*</label>
                        <input class="signup-input" type="password" id="password-confirm" value="${passwordConfirm}" placeholder="비밀번호를 한번 더 입력하세요">
                        <p class="signup-alert-message">${errors.passwordConfirm || ""}</p>
                    </div>
                
                    <div id="signup-right-panel">
                        <div id="profile-image-div">
                            <p class="title">프로필 사진</p>
                        </div>
                        <div id="profile-image-upload-div">
                            <input type="file" id="profile-image-input" accept="image/*" hidden/>
                            <button type="button" id="profile-image-button">
                                <img id="profile-image" src="${profileImageUrl}" alt=""/>
                            </button>
                        </div>
            
                        <label class="signup-label" for="nickname">닉네임*</label>
                        <input class="signup-input" type="text" id="nickname" value="${nickname}" placeholder="닉네임을 입력하세요">
                        <p class="signup-alert-message">${errors.nickname || ""}</p>
                    </div>
                </div>
            
                <input class="signup-button" type="submit" value="회원가입">
            </form>
            
            
            <a id="login-button">로그인하러 가기</a>
        </div>

        `;
    }

    setEvent() {
        this.addEvent("click", "#profile-image-button", () => {
            this.$container.querySelector("#profile-image-input").click();
        });

        this.addEvent("change", "#profile-image-input", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.setState({
                        profileImageUrl: e.target.result,
                        selectedImageFile: file,
                    });
                };
                reader.readAsDataURL(file);
            }
        });

        this.addEvent("input", "#email", (event) => {
            // setState가 아닌 직접 상태를 지정하여 입력 시 리렌더링 방지
            this.state.email = event.target.value;
            this.state.errors.email = "";
        });

        this.addEvent("input", "#password", (event) => {
            // setState가 아닌 직접 상태를 지정하여 입력 시 리렌더링 방지
            this.state.password = event.target.value;
            this.state.errors.password = "";
        });

        this.addEvent("input", "#password-confirm", (event) => {
            // setState가 아닌 직접 상태를 지정하여 입력 시 리렌더링 방지
            this.state.passwordConfirm = event.target.value;
            this.state.errors.passwordConfirm = "";
        });

        this.addEvent("input", "#nickname", (event) => {
            // setState가 아닌 직접 상태를 지정하여 입력 시 리렌더링 방지
            this.state.nickname = event.target.value;
            this.state.errors.nickname = "";
        });

        this.addEvent("submit", "#signup-form", (event) => {
            event.preventDefault();
            this.handleSignup();
        });
    }

    validateInputs() {
        const { email, password, passwordConfirm, nickname, selectedImageFile } = this.state;

        const setError = (field, message) => {
            this.setState({ errors: { [field]: message } });
            return false;
        };

        if (!validateEmail(email)) return setError("email", "올바른 이메일 주소 형식을 입력해주세요.");
        if (!password) return setError("password", "비밀번호를 입력해주세요.");
        if (!validatePassword(password)) return setError("password", "비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개 포함해야 합니다.");
        if (password !== passwordConfirm) return setError("passwordConfirm", "비밀번호가 다릅니다.");
        // if (!selectedImageFile) return setError("profileImage", "프로필 사진을 추가해주세요.");
        if (nickname.length === 0) return setError("nickname", "닉네임을 입력해주세요.");
        if (nickname.includes(" ")) return setError("nickname", "띄어쓰기를 없애주세요.");
        if (nickname.length > 10) return setError("nickname", "닉네임은 최대 10자까지 작성 가능합니다.");

        this.setState({ errors: {} });
        return true;
    }

    async handleSignup() {
        if (!this.validateInputs()) return;

        this.showLoading();

        let imageUrl = "https://placehold.co/36";
        if (this.state.selectedImageFile) {
            try {
                imageUrl = await uploadImageToImgBB(this.state.selectedImageFile);
            } catch (error) {
                alert("이미지 업로드에 실패했습니다. 잠시 후 시도해주세요.");
                this.hideLoading();
                return;
            }
        }

        try {
            await register(this.state.email, this.state.password, this.state.nickname, imageUrl);
            alert("회원가입이 완료되었습니다!");
            navigate(ROUTES.LOGIN);
        } catch (error) {
            alert(`회원가입 실패: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }
}

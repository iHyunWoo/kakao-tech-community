import {logout} from "../../api/userApi.js";
import Component from "../../core/Component.js";
import {ROUTES} from "../../constants/routes.js";
import {goBack, navigate} from "../../router.js";

export default class Header extends Component {
    setup() {
        this.state = {
            showBackButton: this.props.showBackButton,
            showProfile: this.props.showProfile,
            profileImage: this.props.profileImage || "/resources/default-profile.png",
            dropdownVisible: false, // 프로필 드롭다운 메뉴 상태
        };

        this.loadCSS("/style/header.css");
    }

    template() {
        const {showBackButton, showProfile, profileImage, dropdownVisible} = this.state;

        return `
        <header class="header">
            <div class="header-left">
                ${showBackButton ? `
                    <button id="header-back-button">
                        <img width="48px" height="48px" src="/resources/back-arrow.svg" alt="뒤로 가기"/>
                    </button>
                ` : ""}
            </div>
            <h1 class="header-title">오늘공부</h1>
            <div class="header-right">
                ${showProfile ? `
                    <button id="header-profile-button">
                        <img id="header-profile-image" width="36px" height="36px" src="${profileImage}" alt="프로필"/>
                    </button>
                    <ul id="header-profile-dropdown-menu" class="${dropdownVisible ? "" : "hidden"}">
                        <li class="header-profile-dropdown-item" id="header-profile-dropdown-edit-profile-button">회원정보 수정</li>
                        <li class="header-profile-dropdown-item" id="header-profile-dropdown-edit-password-button">비밀번호 수정</li>
                        <li class="header-profile-dropdown-item" id="header-profile-dropdown-logout-button">로그아웃</li> 
                    </ul>
                ` : ""}
            </div>
        </header>
        `;
    }

    setEvent() {
        this.addEvent("click", "#header-back-button", () => {
            goBack();
        });

        this.addEvent("click", "#header-profile-button", () => {
            this.setState({dropdownVisible: !this.state.dropdownVisible});
        });

        this.addEvent("click", "#header-profile-dropdown-edit-profile-button", () => {
            navigate(ROUTES.PROFILE_EDIT);
        });

        this.addEvent("click", "#header-profile-dropdown-edit-password-button", () => {
            navigate(ROUTES.PASSWORD_EDIT);
        });

        this.addEvent("click", "#header-profile-dropdown-logout-button", async () => {
            await logout();
            localStorage.removeItem("isLoggedIn");
            navigate(ROUTES.LOGIN);
        });
    }
}

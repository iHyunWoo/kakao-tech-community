import { updateUserInfo } from "../../api/userApi.js";
import { ROUTES } from "../../constants/routes.js";
import {uploadImageToImgBB} from "../../api/imgbbApi.js";
import Component from "../../core/Component.js";
import {navigate} from "../../router.js";

export default class ProfileEditPage extends Component {
    setup() {
        const userInfo = JSON.parse(localStorage.getItem("user") || "{}");

        this.state = {
            nickname: userInfo.nickname || "",
            email: userInfo.email || "-",
            profileImageUrl: userInfo.profileImageUrl || "https://placehold.co/150",
            selectedImageFile: null,
        };

        this.loadCSS("/style/profile-edit-page.css");
    }

    template() {
        const { nickname, email, profileImageUrl } = this.state;

        return `
        <div id="profile-edit-container">
            <h2 id="profile-edit-header">회원정보 수정</h2>
    
            <p class="profile-edit-title">프로필 사진*</p>
            <div id="profile-image-container">
                <input id="profile-edit-profile-image-input" type="file" accept="image/*" hidden>
                <img id="profile-edit-profile-image" src="${profileImageUrl}" alt=""/>
                <div id="profile-edit-profile-image-edit-button">
                    <p id="profile-edit-profile-image-edit-button-text">변경</p>
                </div>
            </div>
    
            <p class="profile-edit-title">이메일</p>
            <p id="profile-edit-email">${email}</p>
    
            <p class="profile-edit-title">닉네임</p>
            <input id="profile-edit-nickname-input" type="text" value="${nickname}">
    
            <button id="profile-edit-submit-edit-button">수정완료</button>
            <button id="profile-edit-delete-account-button">회원 탈퇴</button>
        </div>
        `;
    }

    setEvent() {
        this.addEvent("click", "#profile-edit-profile-image-edit-button", () => this.openFilePicker());
        this.addEvent("change", "#profile-edit-profile-image-input", (e) => this.handleImageUpload(e));
        this.addEvent("click", "#profile-edit-submit-edit-button", () => this.handleSubmit());
    }

    openFilePicker() {
        this.$container.querySelector("#profile-edit-profile-image-input").click();
    }

    handleImageUpload(event) {
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
    }

    async handleSubmit() {
        const nickname = this.$container.querySelector("#profile-edit-nickname-input").value.trim();

        // 닉네임 검증
        if (!nickname) {
            alert("닉네임을 입력해주세요.");
            return;
        }
        if (nickname.includes(" ")) {
            alert("닉네임에는 공백이 포함될 수 없습니다.");
            return;
        }
        if (nickname.length > 10) {
            alert("닉네임은 최대 10자까지 가능합니다.");
            return;
        }

        this.showLoading();
        let imageUrl = this.state.profileImageUrl;
        // 이미지가 변경되었을 경우 업로드
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
            await updateUserInfo(nickname, imageUrl);
            alert("프로필이 수정되었습니다.");

            // 로컬 유저 정보 갱신
            const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
            userInfo.nickname = nickname;
            userInfo.profileImageUrl = imageUrl;
            localStorage.setItem("user", JSON.stringify(userInfo));

            navigate(ROUTES.POSTS); // 게시판으로 이동
        } catch (error) {
            alert(error.message);
        } finally {
            this.hideLoading();
        }
    }
}

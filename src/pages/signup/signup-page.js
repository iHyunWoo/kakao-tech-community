window.onload = function () {
    addBackButtonEventListener()
    addProfileImageButtonEventListener()
    addSignupButtonTapEventListener()
    addLoginButtonEventListener()
}

function addBackButtonEventListener() {
    const backButton = document.getElementById('back-button')
    backButton.addEventListener('click', function () {
        history.back()
    })
}

function addProfileImageButtonEventListener() {
    const profileImageInput = document.getElementById('profile-image-input')
    const profileImageButton = document.getElementById('profile-image-button')
    const profileImage = document.getElementById('profile-image')
    const profileAlertMessage = document.getElementById('profile-image-alert-message')

    profileImageButton.addEventListener('click', function () {
        profileImageInput.click()
    })

    profileImageInput.addEventListener('change', (e) => {
        const file = profileImageInput.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = function (e) {
                profileImage.src = e.target.result
                profileAlertMessage.style.visibility = 'hidden'
            }

            reader.readAsDataURL(file)
        }
    })
}

function addSignupButtonTapEventListener() {
    const signupForm = document.getElementById('signup-form')
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const profileImageInput = document.getElementById('profile-image-input')
        const profileAlert = document.getElementById('profile-image-alert-message')
        if (profileImageInput.files.length) {
            profileAlert.style.visibility = 'hidden'
        } else {
            profileAlert.style.visibility = 'visible'
            return
        }


        const email = document.getElementById('email').value.trim();
        const emailAlert = document.getElementById('email-alert-message');
        const isValidEmail = validateEmail(email);

        if (isValidEmail) {
            emailAlert.style.visibility = 'hidden';
        } else {
            emailAlert.textContent = '올바른 이메일 주소 형식을 입력해주세요.';
            emailAlert.style.visibility = 'visible';
            return;
        }

        const password = document.getElementById('password').value.trim();
        const passwordAlert = document.getElementById('password-alert-message');
        const isValidPassword = validatePassword(password);

        if (password) {
            passwordAlert.style.visibility = 'hidden';
        } else {
            // 비밀번호가 비어있다면
            passwordAlert.textContent = '비밀번호를 입력해주세요';
            passwordAlert.style.visibility = 'visible';
            return;
        }

        if (isValidPassword) {
            passwordAlert.style.visibility = 'hidden';
        } else {
            passwordAlert.textContent = '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개씩 포함해야 합니다.';
            passwordAlert.style.visibility = 'visible';
            return;
        }

        const passwordConfirm = document.getElementById('password-confirm').value.trim();
        const passwordConfirmAlert = document.getElementById('password-confirm-alert-message')
        const isValidPasswordConfirm = validatePasswordConfirm(password, passwordConfirm);

        if (passwordConfirm) {
            passwordConfirmAlert.style.visibility = 'hidden';
        } else {
            passwordConfirmAlert.textContent = '비밀번호를 한번 더 입력해주세요.';
            passwordConfirmAlert.style.visibility = 'visible';
            return;
        }

        if (isValidPasswordConfirm) {
            passwordConfirmAlert.style.visibility = 'hidden';
        } else {
            passwordConfirmAlert.textContent = '비밀번호가 다릅니다.';
            passwordConfirmAlert.style.visibility = 'visible';
            return;
        }

        const nickname = document.getElementById('nickname').value.trim();
        const nicknameAlert = document.getElementById('nickname-alert-message');

        if (!nickname.includes(" ")) {
            nicknameAlert.style.visibility = 'hidden';
        } else {
            nicknameAlert.textContent = '띄어쓰기를 없애주세요.';
            nicknameAlert.style.visibility = 'visible';
            return;
        }

        if (nickname.length <= 10 ) {
            nicknameAlert.style.visibility = 'hidden';
        } else {
            nicknameAlert.textContent = '닉네임은 최대 10자까지 작성 가능합니다.';
            nicknameAlert.style.visibility = 'visible';
            return;
        }

        // 후에 이메일 중복 체크
        if (true) {
            emailAlert.style.visibility = 'hidden';
        } else {
            emailAlert.textContent = '중복된 이메일 입니다.';
            emailAlert.style.visibility = 'visible';
            return;
        }

        // 후에 닉네임 중복 체크
        if (true) {
            nicknameAlert.style.visibility = 'hidden';
        } else {
            nicknameAlert.textContent = '중복된 닉네임 입니다.';
            nicknameAlert.style.visibility = 'visible';
            return;
        }

        // 후에 회원가입 성공/실패 로직 추가
        if (true) {
            // 로그인 성공
            localStorage.setItem('isLoggedIn', true)
            window.location.href = '/pages/login/login-page.html'
        }


    })
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,20}$/;
    return passwordRegex.test(password);
}

function validatePasswordConfirm(password, passwordConfirm) {
    return password === passwordConfirm
}

function addLoginButtonEventListener() {
    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', function (event) {
        window.location.href = '/pages/login/login-page.html'
    })
}
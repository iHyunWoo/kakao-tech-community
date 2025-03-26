import Component from "../../core/Component.js";
import LoginForm from "./component/LoginForm.js";
import SignUpForm from "./component/SignUpForm.js";
import {ROUTES} from "../../constants/routes.js";

export default class AuthPage extends Component {
  setup() {
    this.loadCSS("/style/auth-page.css");
  }

  template() {
    return `
    <div id="auth-wrapper">
        <div id="login-container" class="auth-panel active"></div>
        <div id="signup-container" class="auth-panel init-hidden hidden-right"></div>
    </div>
    `
  }

  mounted() {
    this.attachLoginForm();
    this.attachSignupForm();
    this.setTransitionEvents();
  }

  setTransitionEvents() {
    const $loginContainer = this.$container.querySelector("#login-container");
    const $signupContainer = this.$container.querySelector("#signup-container");

    this.addEvent("click", "#signup-button", () => {
      $loginContainer.classList.remove("active");
      $loginContainer.classList.add("hidden-left");

      $signupContainer.classList.add("active");
      $signupContainer.classList.remove("hidden-right");

      window.history.pushState({}, "", ROUTES.SIGNUP);
    })

    this.addEvent("click", "#login-button", () => {
      $signupContainer.classList.remove("active");
      $signupContainer.classList.add("hidden-right");

      $loginContainer.classList.remove("hidden-left");
      $loginContainer.classList.add("active");

      window.history.pushState({}, "", ROUTES.LOGIN);
    })

    setTimeout(() => {
      $signupContainer.classList.remove("init-hidden");
    }, 400)

  }

  attachLoginForm() {
    const $loginContainer = this.$container.querySelector("#login-container");
    const loginForm = new LoginForm();
    $loginContainer.appendChild(loginForm.getContainer());
  }

  attachSignupForm() {
    const $signupContainer = this.$container.querySelector("#signup-container");
    const signupForm = new SignUpForm();
    $signupContainer.appendChild(signupForm.getContainer());
  }
}

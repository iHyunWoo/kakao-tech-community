import Component from "../../core/Component.js";

export default class Modal extends Component {
    setup() {
        this.state = {
            title: this.props.title || "",
            content: this.props.content || "",
            confirmText: this.props.confirmText || "확인",
            onConfirm: this.props.onConfirm || null,
            isOpen: false,
        };
        this.context = null;

        this.loadCSS("/style/modal.css");
    }

    template() {
        const { title, content, confirmText, isOpen } = this.state;

        return `
        <div class="modal-overlay ${isOpen ? "active" : ""}">
            <div class="modal-content">
                <h2 class="modal-title">${title}</h2>
                <div class="modal-body">${content}</div>
                <div class="modal-actions">
                    <button class="modal-close">닫기</button>
                    <button class="modal-confirm">${confirmText}</button>
                </div>
            </div>
        </div>
        `;
    }

    setEvent() {
        this.addEvent("click", ".modal-close", () => this.close());
        this.addEvent("click", ".modal-confirm", () => {
            if (this.state.onConfirm) this.state.onConfirm(this.context);
            this.close();
        });
    }

    open(context) {
        this.context = context;
        this.setState({ isOpen: true });
    }

    close() {
        this.setState({ isOpen: false });
    }
}

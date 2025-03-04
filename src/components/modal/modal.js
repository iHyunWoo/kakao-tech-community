import Component from "../../core/component.js";

export default class Modal extends Component {
    setup() {
        this.state = {
            isOpen: false,
        }

        this.loadCSS(
            "modal-style",
            "/components/modal/modal.css",
        );
    }

    template() {
        const { title = '', content = '', confirmText = '확인', onConfirm = null} = this.props;
        const { isOpen } = this.state;

        return `
            <div class="modal-overlay ${isOpen ? 'active' : ''}">
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
        this.addEvent('click', '.modal-close',  () => {
            this.close()
        })

        this.addEvent('click', '.modal-confirm',  () => {
            if (this.props.onConfirm) this.props.onConfirm();
            this.close()
        })
    }

    open() {
        this.setState({ isOpen: true });
    }

    close() {
        // 닫기 시 애니메이션을 유지하며 숨김 처리
        const overlay = this.$target.querySelector('.modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            this.setState({ isOpen: false });
        }
    }
}

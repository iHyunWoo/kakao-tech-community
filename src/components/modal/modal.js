import loadCSS from "/util/loadCSS.js";

export default function Modal({ title = "", content = "", confirmText = "확인", onConfirm = null }) {
    loadCSS("style/modal.css");

    const container = document.createElement("div");
    container.classList.add("modal-overlay");

    container.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-title">${title}</h2>
            <div class="modal-body">${content}</div>
            <div class="modal-actions">
                <button class="modal-close">닫기</button>
                <button class="modal-confirm">${confirmText}</button>
            </div>
        </div>
    `;

    // 🔥 모달 열기 함수
    function open() {
        container.classList.add("active");
    }

    // 🔥 모달 닫기 함수
    function close() {
        container.classList.remove("active");
    }

    // 🔥 이벤트 리스너 추가
    container.querySelector(".modal-close").addEventListener("click", close);
    container.querySelector(".modal-confirm").addEventListener("click", () => {
        if (onConfirm) onConfirm();
        close();
    });

    return { container, open, close };
}

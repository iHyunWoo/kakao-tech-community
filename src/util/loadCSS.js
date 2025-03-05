export default function loadCSS(href) {
    // 기존에 추가된 CSS 파일이 있으면 제거
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (existingLink) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

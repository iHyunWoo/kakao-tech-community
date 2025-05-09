export default function loadCSS(href) {
    // 기존에 추가된 CSS 파일이 있으면 제거
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (existingLink) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;

    // FOUC 방지 CSS가 로드될 때까지 body 숨김
    document.body.style.visibility = "hidden";
    link.onload = () => {
        document.body.style.visibility = "visible";
    }
    document.head.appendChild(link);
}

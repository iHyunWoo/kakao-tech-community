// 날짜를 포맷팅
export function formatDateTime(dateString) {
    const utcDate = new Date(dateString); // 서버에서 받은 UTC 시간
    const localDate = new Date(utcDate.getTime() - new Date().getTimezoneOffset() * 60000);
    const now = new Date(); // 현재 시간

    const diffMs = now - localDate; // 현재 시간과의 차이 (ms 단위)
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
        return "방금";
    } else if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
        return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else {
        return `${localDate.getFullYear()}.${String(localDate.getMonth() + 1).padStart(2, "0")}.${String(localDate.getDate()).padStart(2, "0")}`;
    }
}

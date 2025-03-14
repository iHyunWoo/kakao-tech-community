// "2025-03-14T12:22:23" -> "2025-03-14 12:22:23" 로 변환
export function formatDateTime(dateString) {
    return dateString.replace('T', ' ');
}

import CONFIG from "../config.js";

export async function apiRequest(endpoint, method = "GET", body = null) {
    try {
        const baseURL = CONFIG.BASE_URL;
        const response = await fetch(`${baseURL}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "API 요청 실패");
        }

        return await response.json();
    } catch (error) {
        console.error("API 요청 오류:", error);
        throw error;
    }
}

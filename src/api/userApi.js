import {apiRequest} from "./apiRequest.js";

export async function register(email, password, nickname, profileImageUrl) {
    const body = {email, password, nickname, profileImageUrl};
    return apiRequest("/users", "POST", body);
}

export async function login(email, password) {
    const body = {email, password};
    return apiRequest("/users/token", "POST", body);
}

export async function logout() {
    return apiRequest("/users/token", "DELETE");
}

export async function getUserInfo() {
    return apiRequest("/users/me", "GET");
}

export async function updateUserInfo(nickname, profileImageUrl) {
    const body = {nickname, profileImageUrl};
    return apiRequest("/users/me", "PUT", body);
}

export async function updatePassword(password) {
    return apiRequest("/users/me/password", "PUT", {password});
}

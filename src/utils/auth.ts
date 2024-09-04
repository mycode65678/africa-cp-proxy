import Cookies from "js-cookie";

const TokenKey = "AdminToken";
const userKey = "AdminUsername";
const userIdKey = "AdminUserId";

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  localStorage.removeItem(TokenKey);
}

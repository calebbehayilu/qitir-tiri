import { jwtDecode } from "jwt-decode";

export function logout() {
  localStorage.removeItem("token");
  window.location = "/login";
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");

  try {
    const user = jwtDecode(token);

    return user;
  } catch (error) {
    console.log(error);
  }
}

export default {
  logout,
  getCurrentUser,
};

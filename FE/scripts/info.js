/* 유저 정보 */

// 로그인 상태 확인 API 요청 함수
import { checkLoginState } from "../api/userApi.js";

document.getElementById("backMainPage").addEventListener("click", function () {
  window.history.back();
});

document.addEventListener("DOMContentLoaded", async () => {
  const checkLogin = await checkLoginState();

  // 로그인 상태일 때
  if (checkLogin.loggedIn === true) {
    let userName = document.getElementById("username");
    let userEmail = document.getElementById("email");

    userName.innerText = checkLogin.data.userName;
    userEmail.innerText = checkLogin.data.email;
  }
  // 로그인 상태가 아닐 때
  else {
    alert("허용되지 않은 접근입니다.");
    window.history.back();
  }
});

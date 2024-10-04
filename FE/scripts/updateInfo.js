/* 유저 정보 업데이트 */

// 로그인 상태 확인 API 요청 함수
import { checkLoginState, userUpdate } from "../api/userApi.js";

let userName = document.getElementById("username");
let userNickname = document.getElementById("nickname");
let userEmail = document.getElementById("email");
let userPhone = document.getElementById("phone");
let userAddress = document.getElementById("address");

document.addEventListener("DOMContentLoaded", async () => {
  const checkLogin = await checkLoginState();

  // 로그인 상태일 때
  if (checkLogin.loggedIn === true) {
    userName.value = checkLogin.data.userName;
    userNickname.value = checkLogin.data.nickname;
    userEmail.value = checkLogin.data.email;
    userPhone.value = checkLogin.data.phone;
    userAddress.value = checkLogin.data.address;
  }
  // 로그인 상태가 아닐 때
  else {
    alert("허용되지 않은 접근입니다.");
    window.location.href = "free.html";
  }

  document.getElementById("user-update").addEventListener("click", async () => {
    const userPassword = document.getElementById("password");

    const requestData = {
      userNickname: userNickname.value,
      userPhone: userPhone.value,
      userAddress: userAddress.value,
      userPassword: userPassword.value,
    };

    const response = await userUpdate(requestData);

    if (response.status === 400) {
      alert("모든 항목을 작성해주세요.");
    } else if (response.status === 401) {
      alert("비밀번호가 틀렸습니다.");
    } else {
      alert("작성되었습니다.");
      window.location.href = "free.html";
    }
  });
});

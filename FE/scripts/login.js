/* 유저 로그인 */

// 로그인 요청 API
import { userLogin } from "../api/userApi.js";

const loginButton = document.getElementById("login");

loginButton.addEventListener("click", async function () {
  const userEmail = document.getElementById("user-email").value;
  const userPw = document.getElementById("user-pw").value;

  const requestData = {
    userEmail: userEmail,
    userPw: userPw,
  };

  const response = await userLogin(requestData);

  if (response.status === 401) {
    // 로그인 실패 시 에러 메시지 창 표시
    document.getElementById("error-message").style.display = "block";
  } else if (response.status === 200) {
    // 로그인 성공 시 처리
    window.location.href = "free.html"; // 예시: 성공 시 이동할 페이지
  }
});

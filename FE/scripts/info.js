/* 유저 정보 */

// 로그인 상태 확인 API 요청 함수
import { checkLoginState, verifyPassword, userDelete } from "../api/userApi.js";

document.getElementById("backMainPage").addEventListener("click", function () {
  window.location.href = "free.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  const checkLogin = await checkLoginState();

  // 로그인 상태일 때
  if (checkLogin.loggedIn === true) {
    let userName = document.getElementById("username");
    let userNickname = document.getElementById("nickname");
    let userEmail = document.getElementById("email");
    let userPhone = document.getElementById("phone");
    let userAddress = document.getElementById("address");

    userName.innerText = checkLogin.data.userName;
    userNickname.innerText = checkLogin.data.nickname;
    userEmail.innerText = checkLogin.data.email;
    userPhone.innerText = checkLogin.data.phone;
    userAddress.innerText = checkLogin.data.address;
  }
  // 로그인 상태가 아닐 때
  else {
    alert("허용되지 않은 접근입니다.");
    window.location.href = "free.html";
  }
});

// 수정하기 버튼 클릭 이벤트
document
  .getElementById("updateInfo")
  .addEventListener("click", async function () {
    // 비밀번호 입력을 위한 prompt 창
    const enteredPassword = prompt("비밀번호를 입력하세요:");

    if (enteredPassword) {
      const requestData = {
        password: enteredPassword,
      };
      const response = await verifyPassword(requestData);

      if (response.check === true) {
        window.location.href = "updateInfo.html";
      } else {
        alert("다시 입력해주세요.");
      }
    } else {
      alert("비밀번호가 입력되지 않았습니다.");
    }
  });

// 탈퇴하기 버튼 클릭 이벤트
document
  .getElementById("deleteUser")
  .addEventListener("click", async function () {
    // 비밀번호 입력을 위한 prompt 창
    const enteredPassword = prompt("비밀번호를 입력하세요:");

    if (enteredPassword) {
      const requestData = {
        password: enteredPassword,
      };
      const response = await verifyPassword(requestData);

      if (response.check === true) {
        const deleteUser = await userDelete();

        if (deleteUser.status === 200) {
          alert("탈퇴되었습니다.");
          window.location.href = "free.html";
        }
      } else {
        alert("다시 입력해주세요.");
      }
    } else {
      alert("비밀번호가 입력되지 않았습니다.");
    }
  });

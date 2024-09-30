/*유저 회원가입 */

// 이메일 중복
import {
  checkSignupEmail,
  checkSignupNickname,
  userSignup,
} from "../api/userApi.js";

let emailDuplicate = null;
let nicknameDuplicate = null;

const nicknameMessage = document.getElementById("nickname-message");
const emailMessage = document.getElementById("email-message");
const name = document.getElementById("name");
const nickname = document.getElementById("nickname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const address = document.getElementById("address");

document
  .getElementById("checkNicknameBtn")
  .addEventListener("click", async function () {
    if (nickname.value === "") {
      alert("올바른 닉네임을 입력하세요.");
    } else {
      const response = await checkSignupNickname(nickname.value);

      if (response.exists) {
        nicknameMessage.style.display = "block";
        nicknameMessage.style.color = "red";
        nicknameMessage.innerText = "이미 사용 중인 닉네임입니다.";
        nicknameDuplicate = true;
      } else {
        nicknameMessage.style.display = "block";
        nicknameMessage.style.color = "green";
        nicknameMessage.innerText = "사용 가능한 닉네임입니다.";
        nicknameDuplicate = false;
      }
    }
  });

document
  .getElementById("checkEmailBtn")
  .addEventListener("click", async function () {
    if (email.value === "") {
      alert("올바른 이메일을 입력하세요.");
    } else {
      const response = await checkSignupEmail(email.value);

      if (response.exists) {
        emailMessage.style.display = "block";
        emailMessage.style.color = "red";
        emailMessage.innerText = "이미 사용 중인 이메일입니다.";
        emailDuplicate = true;
      } else {
        emailMessage.style.display = "block";
        emailMessage.style.color = "green";
        emailMessage.innerText = "사용 가능한 이메일입니다.";
        emailDuplicate = false;
      }
    }
  });

document
  .getElementById("signupBtn")
  .addEventListener("click", async function () {
    if (name.value === "") {
      alert("올바른 이름을 입력하세요.");
    } else if (nickname.value === "") {
      alert("올바른 닉네임을 입력하세요.");
    } else if (email.value === "") {
      alert("올바른 이메일을 입력하세요.");
    } else if (password.value === "") {
      alert("올바른 비밀번호를 입력하세요.");
    } else if (phone.value === "") {
      alert("올바른 번호를 입력하세요.");
    } else if (address.value === "") {
      alert("올바른 주소를 입력하세요.");
    } else {
      if (
        emailDuplicate === null ||
        emailDuplicate === true ||
        nicknameDuplicate === null ||
        nicknameDuplicate === true
      ) {
        console.log(emailDuplicate);
        console.log(nicknameDuplicate);

        alert("중복확인이 필요합니다.");
      } else {
        const requestData = {
          name: name.value,
          nickname: nickname.value,
          email: email.value,
          password: password.value,
          phone: phone.value,
          address: address.value,
        };

        const response = await userSignup(requestData);

        if (response.status === 201) {
          alert("회원가입이 완료됐습니다.");
          window.location.href = "free.html";
        }
      }
    }
  });

// let userEmail = null;

// document.getElementById("next").addEventListener("click", async function () {
//   const email = document.getElementById("email").value;

//   const response = await checkSignupEmail(email);

//   if (response.exists) {
//     alert("중복된 이메일입니다.");
//   } else {
//     document.getElementById("step1").classList.remove("active");
//     document.getElementById("step2").classList.add("active");
//     userEmail = email;
//   }
// });

// document.getElementById("signup").addEventListener("click", async function () {
//   const password = document.getElementById("password").value;

//   const data = {
//     email: userEmail,
//     password: password,
//   };

//   const response = await userSignup(data);

//   if (response.exists) {
//   } else {
//   }
// });

/* 게시판 공통 기능 정의 파일 */

// 모든 게시판 게시글 API 요청 함수
import { getPosts } from "../api/postApi.js";

// 로그인 상태 확인 API 요청 함수
import { checkLoginState, userLogout } from "../api/userApi.js";

// 현재 URL을 '/'로 분할하여 배열로 변환합니다.
const urlArray = document.URL.split("/");

// board 객체 정의
const board = {
  "introduction.html": "introduction",
  "free.html": "free",
};

//board 저장 변수
let type = null;

// 배열에서 board의 키가 포함된 요소를 찾습니다.
urlArray.forEach((part) => {
  // board 객체가 존재하거나 board 값에 해당할 경우
  if (board[part] || part === board[part]) {
    type = board[part] || part; // board 값 또는 요소 할당
  }
});

// 작성하기 이동
const writeButton = document.getElementById("writeButton");

writeButton.addEventListener("click", () => {
  window.location.href = `../community/write.html?type=${type.toLowerCase()}`; // 작성 페이지로 이동
});

// html 파일이 로드됐을 때
document.addEventListener("DOMContentLoaded", async function () {
  const checkLogin = await checkLoginState();

  if (checkLogin.loggedIn === true) {
    const userNickname = checkLogin.data.nickname; // 쿠키에서 유저 이름 얻음
    console.log(userNickname);
    const loginButton = document.getElementById("login"); // 로그인 버튼 요소

    // 유저 정보와 로그아웃 버튼을 담을 div 생성
    const userInfoContainer = document.createElement("div");
    userInfoContainer.className = "user-info-container"; // 클래스 추가

    const userInfo = document.createElement("a"); // 유저 이름을 나타낼 요소 생성
    userInfo.href = "info.html";
    userInfo.className = "user-name"; // 클래스 추가
    userInfo.innerText = `${userNickname} 님`; // 요소에 유저 이름 할당

    // 로그아웃 버튼 생성
    const logoutButton = document.createElement("button");
    logoutButton.innerText = "로그아웃";
    logoutButton.className = "logout-button"; // 클래스 추가

    // 로그아웃 버튼 클릭 시 동작
    logoutButton.addEventListener("click", async function () {
      const response = await userLogout();

      if (response.status === 200) {
        alert("로그아웃되었습니다.");
        location.reload();
      } else {
        alert("로그아웃 실패.");
      }
    });

    // 유저 정보와 로그아웃 버튼을 컨테이너에 추가
    userInfoContainer.appendChild(userInfo); // 유저 이름 추가
    userInfoContainer.appendChild(logoutButton); // 로그아웃 버튼 추가

    document.getElementById("auth-buttons").appendChild(userInfoContainer); // 컨테이너를 auth-buttons에 추가
    loginButton.parentNode.removeChild(loginButton); // 로그인 버튼 삭제
  }

  // board가 존재할 경우
  if (type) {
    try {
      // 전체 게시글 요청
      const response = await getPosts(type);

      // 게시글 리스트 태그 (로드된 게시글을 담을 태그)
      const postList = document.getElementById("posts_list");

      // board에 있는 게시글만큼 데이터 로드 (제목, 내용)
      response.data.forEach((data) => {
        const postTitle = document.createElement("a");
        postTitle.innerText = data.title;
        postTitle.href = `./view.html?id=${data.id}&type=${data.type}`;

        const postContent = document.createElement("span");
        postContent.innerText = data.content;

        const postUser = document.createElement("span");
        postUser.innerText = data.nickname;

        const li = document.createElement("li");

        li.appendChild(postTitle);
        li.appendChild(postContent);
        li.appendChild(postUser);

        postList.appendChild(li);
      });
    } catch (err) {
      console.error("응답 데이터 처리 중 오류 발생", err.message);
    }
  }
});

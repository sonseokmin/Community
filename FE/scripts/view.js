/* 게시판 특정 게시글 조회/삭제 */

// 특정 게시글 조회/삭제 요청 API
import { getPost, deletePost } from "../api/postApi.js";

// 유저 게시글 확인 요청 API
import { checkUserPost } from "../api/userApi.js";

// Qurry String Value 추출 함수
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Querry String id 값 할당
const postId = parseInt(getQueryParam("id"));
const type = getQueryParam("type");

// 돌아가기 버튼
const backMainButton = document.getElementById("backMainPage");

// main 페이지로 이동
backMainButton.addEventListener("click", () => {
  window.location.href = `../community/${type.toLowerCase()}.html`; // 메인 페이지로 이동
});

// 수정하기 버튼
const goWriteButton = document.getElementById("goWritePage");

// 수정 페이지로 이동
goWriteButton.addEventListener("click", () => {
  window.location.href = `../community/write.html?id=${postId}&type=${type.toLowerCase()}`;
});

// 삭제하기 버튼
const deleteButton = document.getElementById("deleteButton");

// 삭제
deleteButton.addEventListener("click", async () => {
  try {
    const response = await deletePost(postId); // 게시글 삭제
    window.location.href = `../community/${type.toLowerCase()}.html`; // 메인 페이지로 이동
  } catch (err) {
    console.error("데이터 삭제 중 오류 발생", err.message);
  }
});

// html 파일이 로드됐을 때
document.addEventListener("DOMContentLoaded", async function () {
  const response = await checkUserPost(postId);

  console.log(response);

  if (response.userPost === false || response.loggedIn === false) {
    goWriteButton.remove();
    deleteButton.remove();
  }
  const postTitle = document.getElementById("title"); // 제목
  const postContent = document.getElementById("content"); // 내용

  try {
    const response = await getPost(postId); // 게시글 조회

    const data = response.data[0];

    postTitle.innerText = data.title;
    postContent.innerText = data.content;
  } catch (err) {
    console.error("요청 중 오류 발생", err.message);
  }
});

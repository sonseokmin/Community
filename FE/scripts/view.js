/* 게시판 특정 게시글 조회 */

// 특정 게시글 API 요청 기능 로드
import { getPost } from "../api/api.js";

// main 페이지 이동 함수
import { goMainPage, goWritePage } from "../scripts/place.js";

// Qurry String Value 추출 함수
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Querry String id 값 할당
const id = parseInt(getQueryParam("id"));
const type = getQueryParam("type");

// main으로 돌아가기 함수
const backMainButton = document.getElementById("backMainPage");

backMainButton.addEventListener("click", () => {
  goMainPage(type);
});

// write 페이지로 이동하기 함수 (update)
const goWriteButton = document.getElementById("goWritePage");

goWriteButton.addEventListener("click", () => {
  goWritePage(id, type);
});

// html 파일이 로드됐을 때
document.addEventListener("DOMContentLoaded", async function () {
  const postTitle = document.getElementById("title"); // 제목
  const postContent = document.getElementById("content"); // 내용

  try {
    const response = await getPost(id);

    const data = response.data[0];

    postTitle.innerText = data.title;
    postContent.innerText = data.content;
  } catch (err) {
    console.log(err);
  }
});

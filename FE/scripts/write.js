/* 게시판 게시글 작성 */

// 게시판 게시글 작성하기 API 요청 함수
import { writePost } from "../api/api.js";

// main 페이지 이동 함수
import { goMainPage, goWritePage } from "../scripts/place.js";

// 작성하기 버튼
const write = document.getElementById("write");

// Qurry String Value 추출 함수
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Qurry String 게시판 값 할당
const type = getQueryParam("type");

const backMainPage = document.getElementById("backMainPage"); // 돌아가기

// 돌아가기
backMainPage.addEventListener("click", () => {
  goMainPage(type);
});

// 작성하기를 클릭했을 때
write.addEventListener("click", async function () {
  const title = document.getElementById("title").value; // 제목
  const content = document.getElementById("content").value; // 내용

  const data = {
    title: title, // 제목
    content: content, // 내용
    type: type, // 게시판
  };

  await writePost(data);
});

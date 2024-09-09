/* 게시판 특정 게시글 조회 */

// 특정 게시글 API 요청 기능 로드
import { getPost } from "../api/api.js";

import { goMainPage } from "../scripts/place.js";

// Qurry String Value 추출 함수
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Querry String id 값 할당
const id = parseInt(getQueryParam("id"));
const type = getQueryParam("type");

// html 파일이 로드됐을 때
document.addEventListener("DOMContentLoaded", async function () {
  const postTitle = document.getElementById("title");
  const postContent = document.getElementById("content");
  const backPageButton = document.getElementById("back_page");

  backPageButton.addEventListener("click", () => {
    goMainPage(type); // import한 goMainPage 함수 호출
  });
  try {
    const response = await getPost(id);

    const data = response.data[0];

    postTitle.innerText = data.title;
    postContent.innerText = data.content;
  } catch (err) {
    console.log(err);
  }
});

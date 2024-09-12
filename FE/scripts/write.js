/* 게시판 게시글 작성 & 수정 */

// 게시판 게시글 작성하기 API 요청 함수
import { getPost, writePost, updatePost } from "../api/api.js";

// 작성하기 버튼
const write = document.getElementById("write");

// Qurry String Value 추출 함수
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Qurry String  값 할당
const type = getQueryParam("type");
const id = getQueryParam("id");

// 돌아가기
const backMainPage = document.getElementById("backMainPage");

backMainPage.addEventListener("click", () => {
  window.location.href = `../community/${type.toLowerCase()}.html`;
});

// 제목
const titleBox = document.getElementById("title");
// 내용
const contentBox = document.getElementById("content");

// 작성하기를 클릭했을 때
write.addEventListener("click", async function () {
  //UPDATE
  if (id) {
    const data = {
      id: id,
      title: titleBox.value, // 제목
      content: contentBox.value, // 내용
      type: type, // 게시판
    };

    await updatePost(data); // 게시글 수정 요청

    alert("수정되었습니다.");

    window.location.href = `../community/${type.toLowerCase()}.html`; // 메인 페이지로 이동
  } // WRITE
  else {
    const data = {
      title: titleBox.value, // 제목
      content: contentBox.value, // 내용
      type: type, // 게시판
    };

    await writePost(data); // 게시글 작성 요청

    alert("작성되었습니다.");

    window.location.href = `../community/${type.toLowerCase()}.html`; // 메인 페이지로 이동
  }
});

// html 파일이 로드됐을 때 (UPDATE 전용)
document.addEventListener("DOMContentLoaded", async () => {
  if (id) {
    const response = await getPost(id); // 게시글 조회

    const data = response.data[0];

    titleBox.value = data.title;
    contentBox.value = data.content;
  }
});

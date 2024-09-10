/* 게시판 공통 기능 정의 파일 */

// 모든 게시판 게시글 API 요청 함수
import { getPosts } from "../api/api.js";

// write 페이지 이동 함수
import { goWritePage } from "./place.js";

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

// html 파일이 로드됐을 때
document.addEventListener("DOMContentLoaded", async function () {
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
        postTitle.className = "post";
        postTitle.href = `./view.html?id=${data.id}&type=${data.type}`;

        const postContent = document.createElement("span");
        postContent.innerText = data.content;

        const li = document.createElement("li");

        li.appendChild(postTitle);
        li.appendChild(postContent);

        postList.appendChild(li);
      });

      const writeButton = document.getElementById("writeButton");

      writeButton.addEventListener("click", () => {
        goWritePage(type);
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
});

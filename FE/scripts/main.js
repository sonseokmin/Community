import { getPosts } from "../api/api.js";

// 현재 URL을 '/'로 분할하여 배열로 변환합니다.
const urlArray = document.URL.split("/");
// paths 객체 정의
const paths = {
  "introduction.html": "introduction",
  "free.html": "free",
};

let matchedValue = null;

// 배열에서 paths의 키가 포함된 요소를 찾습니다.
urlArray.forEach((part) => {
  if (paths[part]) {
    matchedValue = paths[part];
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  if (matchedValue) {
    try {
      // getPosts 함수 호출
      const data = await getPosts(matchedValue);
      console.log(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
});

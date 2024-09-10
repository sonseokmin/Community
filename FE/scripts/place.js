/* 페이지 이동 함수 정의 */

// view -> main으로 돌아가는 함수
export function goMainPage(type) {
  // 페이지 이동
  window.location.href = `../community/${type.toLowerCase()}.html`;
}

// main -> write로 이동하는 함수
export function goWritePage(id, type) {
  console.log(id);
  window.location.href = `../community/write.html?type=${type.toLowerCase()}`;
}

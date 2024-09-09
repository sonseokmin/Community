/* API 요청 파일 */

// 기본 URL
const API_BASE_URL = "http://127.0.0.1:3000";

// 모든 게시글 조회 API
export async function getPosts(path) {
  // path === board명
  try {
    const response = await fetch(`${API_BASE_URL}/community/${path}`);
    const data = response.json();
    return data;
  } catch (err) {
    console.log(`Fail to fetch ${path} board posts`);
  }
}

export async function getPost(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/view/${id}`);
    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

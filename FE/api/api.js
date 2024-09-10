/* API 요청 파일 */

// 기본 URL
const API_BASE_URL = "http://127.0.0.1:3000";

// 모든 게시글 조회 API
export async function getPosts(type) {
  // type === board명
  try {
    const response = await fetch(`${API_BASE_URL}/community/${type}`);
    const data = response.json();
    return data;
  } catch (err) {
    console.log(`Fail to fetch ${type} board posts`);
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

export async function writePost(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/${data.type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 형식의 데이터임을 명시
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
}

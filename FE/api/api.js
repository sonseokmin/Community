/* API 요청 파일 */

// 기본 URL
const API_BASE_URL = "http://127.0.0.1:3000";

// 모든 게시글 조회 API
export async function getPosts(type) {
  // type === board명
  try {
    const response = await fetch(`${API_BASE_URL}/community/${type}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.error("GET 요청 에러 발생", err.message);
  }
}

// 특정 게시글 조회 API
export async function getPost(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/view/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.error("GET 요청 에러 발생", err.message);
  }
}

// 게시판 게시글 작성 API
export async function writePost(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/${data.type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 형식의 데이터임을 명시
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (err) {
    console.error("POST 요청 에러 발생", err.message);
  }
}

// 게시글 수정 API
export async function updatePost(data) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/community/${data.type}/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // JSON 형식의 데이터임을 명시
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (err) {
    console.error("PUT 요청 에러 발생", err.message);
  }
}

// 게시글 삭제 API
export async function deletePost(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.error("DELETE 요청 에러 발생", err.message);
  }
}

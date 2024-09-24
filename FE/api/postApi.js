/* 게시글 API 요청 파일 */

/**
 * 게시글 전체 조회
 * 게시글 상세 조회
 * 게시글 작성
 * 게시글 수정
 * 게시글 삭제
 */

// 기본 URL
const API_BASE_URL = "http://127.0.0.1:3000";

// 게시글 전체 조회
export async function getPosts(type) {
  // type === board명
  try {
    const response = await fetch(`${API_BASE_URL}/community/${type}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.error("GET 요청 에러 발생", err.message);
  }
}

// 게시글 상세 조회
export async function getPost(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/view/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.error("GET 요청 에러 발생", err.message);
  }
}

// 게시글 작성
export async function writePost(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/${data.type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 형식의 데이터임을 명시
      },
      body: JSON.stringify(data),
      credentials: "include", // 쿠키를 포함하여 요청
    });

    return response.json();
  } catch (err) {
    console.error("POST 요청 에러 발생", err.message);
  }
}

// 게시글 수정
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
        credentials: "include", // 쿠키를 포함하여 요청
      }
    );
    return response;
  } catch (err) {
    console.error("PUT 요청 에러 발생", err.message);
  }
}

// 게시글 삭제
export async function deletePost(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/delete/${id}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (err) {
    console.error("DELETE 요청 에러 발생", err.message);
  }
}

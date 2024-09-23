/* 유저 API 요청 파일 */

// 기본 URL
const API_BASE_URL = "http://127.0.0.1:3000";

// 로그인 API
export async function userLogin(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/community/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 형식의 데이터임을 명시
      },
      body: JSON.stringify(data),
      credentials: "include", // 쿠키를 포함하여 요청
    });
    return response.json();
  } catch (err) {
    console.error("로그인 요청 에러 발생", err.message);
  }
}

// 로그인 상태 확인 API
export async function checkLoginState() {
  try {
    const response = await fetch(`${API_BASE_URL}/community/check/login`, {
      method: "GET",
      credentials: "include", // 쿠키를 포함하여 요청
    });
    return response.json();
  } catch (err) {
    console.error("로그인 확인 요청 에러 발생", err.message);
  }
}

// 회원가입 API
export async function userSignup(data) {}

/* 유저 API 응답 처리 파일 */

const dbConnect = require("../database/index.js");

/**
 * 로그인
 * 유저 정보
 * 유저 게시글 확인
 * 회원가입
 */

// 로그인
exports.userLogin = async (req) => {
  const requestData = [req.userEmail, req.userPw];

  const sql = `
  SELECT id
  FROM users
  WHERE email = ? AND password = ?
  `;

  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 유저 정보
exports.getUser = async (req) => {
  const requestData = [req];

  const sql = `
  SELECT *
  FROM users
  WHERE id = ?
  `;

  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 유저 게시글 확인
exports.checkUserPost = async (req) => {
  const requestData = [req.userId, req.postId];
  console.log(requestData);
  const sql = `
    SELECT 
    CASE 
        WHEN user_id = ? THEN TRUE
        ELSE FALSE
    END AS is_equal
    FROM posts
    WHERE id = ?;

  `;
  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 회원가입
exports.userSignup = async (req) => {
  const requestData = [req.userId, req.userPw, req.userName];

  const sql = "";

  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

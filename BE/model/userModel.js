/* 유저 API 응답 처리 파일 */

const dbConnect = require("../database/index.js");

/**
 * 로그인
 * 회원가입
 */

// 로그인
exports.login = async (req) => {
  const requestData = [req.userId, req.userPw];

  const sql = "";

  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 회원가입
exports.signup = async (req) => {
  const requestData = [req.userId, req.userPw, req.userName];

  const sql = "";

  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

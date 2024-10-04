/* 유저 API 응답 처리 파일 */

const dbConnect = require("../database/index.js");

/**
 * 로그인
 * 유저 정보
 * 유저 게시글 확인
 * 이메일 중복 체크
 * 회원가입
 * 비밀번호 확인
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

// 이메일 중복 체크
exports.checkSignupEmail = async (req) => {
  const requestData = [req];

  const sql = `
  SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM users WHERE email = ?) THEN TRUE
        ELSE FALSE
    END AS email_exists;

  `;
  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 닉네임 중복 체크
exports.checkSignupNickname = async (req) => {
  const requestData = [req];

  const sql = `
  SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM users WHERE nickname = ?) THEN TRUE
        ELSE FALSE
    END AS nickname_exists;

  `;
  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 회원가입
exports.userSignup = async (req) => {
  const requestData = [
    req.userName,
    req.userEmail,
    req.userPw,
    req.userNickname,
    req.userPhone,
    req.userAddress,
  ];

  const sql = `
  INSERT
  INTO users (username, email, password, nickname, phone, address)
  VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 비밀번호 확인
exports.verifyPassword = async (req) => {
  const requestData = [req.userId, req.userPassword];
  const sql = `
  SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM users WHERE id = ? AND password = ?) THEN TRUE
        ELSE FALSE
    END AS check_pw;

  
  `;
  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 정보 수정
exports.userUpdate = async (req) => {
  const requestData = [
    req.userNickname,
    req.userPhone,
    req.userAddress,
    req.userId,
  ];

  const sql = `
  UPDATE  users
  SET nickname = ?, phone = ?, address = ?
  WHERE id = ?
  `;

  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 회원탈퇴
exports.userDelete = async (req, res) => {
  const requestData = [req.userId];

  const PostSql = `
  DELETE 
  FROM posts
  WHERE user_id = ?;
  `;

  await dbConnect.query(PostSql, requestData);

  const sql = `
  DELETE 
  FROM users
  WHERE id = ?;
  `;

  const result = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

/* 게시글 API 응답 데이터 처리 파일 */

const dbConnect = require("../database/index.js");

/**
 * 게시글 전체 조회
 * 게시글 상세 조회
 * 게시글 작성
 * 게시글 수정
 * 게시글 삭제
 */

// 게시판 전체 조회
exports.getPosts = async (req) => {
  const boardType = req;

  const sql = `
  SELECT posts.id, posts.title, posts.content, posts.type, users.username
  FROM users
  INNER JOIN posts ON users.id = posts.user_id AND type = ?;
  `;

  const [result] = await dbConnect.query(sql, [boardType.toUpperCase()]);

  if (!result) {
    return null;
  }

  return result;
};

// 게시글 조회
exports.getPost = async (req) => {
  const postId = req;

  const sql = `
  SELECT title, content
  FROM posts
  WHERE id = ?
  `;

  const [result] = await dbConnect.query(sql, [postId]);

  if (!result) {
    return null;
  }

  return result;
};

// 게시글 작성
exports.writePost = async (req) => {
  const requestData = [req.title, req.content, req.type];

  const sql = `
  INSERT
  INTO posts (title, content, type)
  VALUES (?, ?, ?)
  `;

  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 게시글 수정
exports.updatePost = async (req) => {
  const requestData = [req.title, req.content, req.id];

  const sql = `
  UPDATE posts
  SET title = ? , content = ?
  WHERE id = ?;
  `;

  const [result] = await dbConnect.query(sql, requestData);

  if (!result) {
    return null;
  }

  return result;
};

// 게시글 삭제
exports.deletePost = async (req) => {
  const postId = req;
  const sql = `
  DELETE FROM posts
  WHERE id = ?
  `;

  const result = await dbConnect.query(sql, [postId]);

  if (!result) {
    return null;
  }

  return result;
};

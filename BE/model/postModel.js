/* 게시글 API 응답 데이터 처리 파일 */

const dbConnect = require("../database/index.js");

// 전체 게시글 조회
exports.getPosts = async (req, res) => {
  const sql = `
  SELECT *
  FROM posts
  WHERE type = ?
  `;
  try {
    const [result] = await dbConnect.query(sql, [req.toUpperCase()]);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 특정 게시글 조회
exports.getPost = async (req, res) => {
  const sql = `
  SELECT *
  FROM posts
  WHERE id = ?
  `;
  try {
    const [result] = await dbConnect.query(sql, [req]);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 게시글 작성
exports.writePost = async (req, res) => {
  const sql = `
  INSERT
  INTO posts (title, content, type)
  VALUES (?, ?, ?)
  `;
  try {
    const [result] = await dbConnect.query(sql, [
      req.title,
      req.content,
      req.type,
    ]);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  const sql = `
  UPDATE posts
  SET title = ? , content = ?
  WHERE id = ?;
  `;
  try {
    const [result] = await dbConnect.query(sql, [
      req.title,
      req.content,
      req.id,
    ]);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 특정 게시글 조회
exports.deletePost = async (req, res) => {
  const sql = `
  DELETE FROM posts
  WHERE id = ?
  `;
  try {
    const [result] = await dbConnect.query(sql, [req]);
    return result;
  } catch (err) {
    console.log(err);
  }
};

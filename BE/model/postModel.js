/* 게시글 API 응답 데이터 처리 파일 */

const dbConnect = require("../database/index.js");

// 전체 게시글 응답
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

// 특정 게시글 응답
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

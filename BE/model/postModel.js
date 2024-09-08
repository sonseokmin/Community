// 게시글 API 응답 데이터 처리 파일

const dbConnect = require("../database/index.js");

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

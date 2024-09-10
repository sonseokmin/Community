/* 게시글 API 응답 반환 파일 */

const postModel = require("../model/postModel.js");

// 게시판 전체 조회
exports.getPosts = async (req, res) => {
  const category = req.params.board;
  try {
    const response = await postModel.getPosts(category);
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: response,
    });
  } catch (err) {
    console.log(err);
  }
};

// 게시글 상세 조회
exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await postModel.getPost(id);
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: response,
    });
  } catch (err) {
    console.log(err);
  }
};

// 게시글 작성
exports.writePost = async (req, res) => {
  try {
    const response = await postModel.writePost(req.body);
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: response,
    });
  } catch (err) {
    console.log(err);
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  try {
    const response = await postModel.updatePost(req.body);
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: response,
    });
  } catch (err) {
    console.log(err);
  }
};

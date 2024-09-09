/* 게시글 API 응답 반환 파일 */

const postModel = require("../model/postModel.js");

exports.getPosts = async (req, res) => {
  const category = req.params.board;
  try {
    const responseData = await postModel.getPosts(category);
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: responseData,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const responseData = await postModel.getPost(id);
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: responseData,
    });
  } catch (err) {
    console.log(err);
  }
};

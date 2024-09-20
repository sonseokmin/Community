/* 유저 API 응답 반환 파일 */
const userModel = require("../model/userModel.js");

const {
  STATUS_CODE,
  STATUS_MESSAGE,
} = require("../util/constant/httpStatusCode.js");

/**
 * 로그인
 * 회원가입
 */

// 로그인
exports.login = async (req, res) => {
  const { userEmail, userPw } = req.body;
  try {
  } catch (err) {
    next(err);
  }
};

// 회원가입
exports.signup = async (req, res) => {
  const { userEmail, userPw, userName } = req.body;
  try {
  } catch (err) {
    next(err);
  }
};

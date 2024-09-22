/* 유저 API 응답 반환 파일 */
const userModel = require("../model/userModel.js");

const {
  STATUS_CODE,
  STATUS_MESSAGE,
} = require("../util/constant/httpStatusCode.js");

/**
 * 로그인
 * 로그인 상태 확인
 * 회원가입
 */

// 로그인
exports.userLogin = async (req, res) => {
  const { userEmail, userPw } = req.body;

  if (!userEmail) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_EMAIL,
      data: null,
    });
  }

  if (!userPw) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_PASSWORD,
      data: null,
    });
  }

  try {
    const response = await userModel.userLogin(req.body);

    if (response.length === 0) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        status: STATUS_CODE.UNAUTHORIZED,
        message: STATUS_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        data: null,
      });
    }

    res.cookie("username", response[0].username, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      message: STATUS_MESSAGE.LOGIN_SUCCESS,
      data: null,
    });
  } catch (err) {
    console.log(err);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

// 로그인 상태 확인
exports.checkLoginState = async (req, res) => {
  // 쿠키 존재할 경우
  if (req.cookies.username) {
    return res.status(200).json({
      loggedIn: true,
      username: req.cookies.username,
    });
    //쿠키 존재하지 않을 경우
  } else {
    return res.status(200).json({
      loggedIn: false,
    });
  }
};

// 회원가입
exports.userSignup = async (req, res) => {
  const { userEmail, userPw, userName } = req.body;
  try {
  } catch (err) {
    next(err);
  }
};

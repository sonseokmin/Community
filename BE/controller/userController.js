/* 유저 API 응답 반환 파일 */
const userModel = require("../model/userModel.js");

const {
  STATUS_CODE,
  STATUS_MESSAGE,
} = require("../util/constant/httpStatusCode.js");

/**
 * 로그인
 * 로그인 상태 확인
 * 유저 게시글 확인
 * 로그아웃
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

    req.session.userId = response[0].id;
    console.log(req.session.userId);

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      message: STATUS_MESSAGE.LOGIN_SUCCESS,
      data: null,
    });
  } catch (err) {
    console.error(err);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

// 유저 게시글 확인
exports.checkUserPost = async (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_ID,
      userPost: false,
    });
  }

  if (req.session.userId) {
    data = {
      postId: postId,
      userId: req.session.userId,
    };
    try {
      const response = await userModel.checkUserPost(data);

      if (response[0].is_equal === 1) {
        return res.status(STATUS_CODE.OK).json({
          status: STATUS_CODE.OK,
          message: STATUS_MESSAGE.IS_USER_POST,
          userPost: true,
        });
      } else {
        return res.status(STATUS_CODE.OK).json({
          status: STATUS_CODE.OK,
          message: STATUS_MESSAGE.IS_NOT_USER_POST,
          userPost: false,
        });
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    return res.status(STATUS_CODE.OK).json({
      loggedIn: false,
    });
  }
};

// 로그인 상태 확인
exports.checkLoginState = async (req, res) => {
  // 쿠키 존재할 경우
  if (req.session.userId) {
    const response = await userModel.getUser(req.session.userId);

    return res.status(STATUS_CODE.OK).json({
      loggedIn: true,
      data: {
        id: response[0].id,
        userName: response[0].username,
        email: response[0].email,
      },
    });
    //쿠키 존재하지 않을 경우
  } else {
    return res.status(STATUS_CODE.OK).json({
      loggedIn: false,
    });
  }
};

// 로그아웃
exports.userLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
      });
    }

    res.clearCookie("connect.sid");

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      message: STATUS_MESSAGE.LOGOUT_SUCCESS,
    });
  });
};

// 회원가입
exports.userSignup = async (req, res) => {
  const { userEmail, userPw, userName } = req.body;
  try {
  } catch (err) {
    console.log(err);
  }
};

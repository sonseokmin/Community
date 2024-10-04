/* 유저 API 응답 반환 파일 */
const userModel = require("../model/userModel.js");

const {
  STATUS_CODE,
  STATUS_MESSAGE,
} = require("../util/constant/httpStatusCode.js");
const {
  validEmail,
  validNickname,
  validPassword,
} = require("../util/validUtil.js");

/**
 * 로그인
 * 로그인 상태 확인
 * 유저 게시글 확인
 * 로그아웃
 * 이메일 중복 체크
 * 닉네임 중복 체크
 * 회원가입
 * 비밀번호 확인
 * 유저 업데이트
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

      if (response.length === 0) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          status: STATUS_CODE.NOT_FOUND,
          message: STATUS_MESSAGE.NOT_FOUND_POST,
          data: null,
        });
      }

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
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }
  } else {
    return res.status(STATUS_CODE.OK).json({
      loggedIn: false,
    });
  }
};

// 로그인 상태 확인
exports.checkLoginState = async (req, res) => {
  try {
    // 쿠키 존재할 경우
    if (req.session.userId) {
      const response = await userModel.getUser(req.session.userId);

      if (response.length === 0) {
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
          status: STATUS_CODE.INTERNAL_SERVER_ERROR,
          message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
          data: null,
        });
      }

      return res.status(STATUS_CODE.OK).json({
        loggedIn: true,
        data: {
          id: response[0].id,
          userName: response[0].username,
          nickname: response[0].nickname,
          email: response[0].email,
          phone: response[0].phone,
          address: response[0].address,
        },
      });
      //쿠키 존재하지 않을 경우
    } else {
      return res.status(STATUS_CODE.OK).json({
        loggedIn: false,
      });
    }
  } catch (err) {
    console.error(err);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
      data: null,
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

// 이메일 중복 체크
exports.checkSignupEmail = async (req, res) => {
  const { email: email } = req.body;

  if (!email) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_EMAIL,
      data: null,
    });
  }
  try {
    const response = await userModel.checkSignupEmail(email);

    if (response[0].email_exists === 1) {
      return res.status(STATUS_CODE.OK).json({
        status: STATUS_CODE.OK,
        message: STATUS_MESSAGE.ALREADY_EXIST_EMAIL,
        exists: true,
      });
    } else {
      return res.status(STATUS_CODE.OK).json({
        status: STATUS_CODE.OK,
        message: STATUS_MESSAGE.AVAILVABLE_EMAIL,
        exists: false,
      });
    }
  } catch (err) {
    console.error(err);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

// 닉네임 중복 체크
exports.checkSignupNickname = async (req, res) => {
  const { nickname: nickname } = req.body;

  if (!nickname) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_EMAIL,
      data: null,
    });
  }

  try {
    const response = await userModel.checkSignupNickname(nickname);

    if (response[0].nickname_exists === 1) {
      return res.status(STATUS_CODE.OK).json({
        status: STATUS_CODE.OK,
        message: STATUS_MESSAGE.ALREADY_EXIST_NICKNAME,
        exists: true,
      });
    } else {
      return res.status(STATUS_CODE.OK).json({
        status: STATUS_CODE.OK,
        message: STATUS_MESSAGE.AVAILABLE_NICKNAME,
        exists: false,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

// 회원가입
exports.userSignup = async (req, res) => {
  const {
    name: userName,
    nickname: userNickname,
    email: userEmail,
    password: userPw,
    phone: userPhone,
    address: userAddress,
  } = req.body;

  if (!userName) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_NAME,
      data: null,
    });
  }

  if (!userNickname) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_NICKNAME,
      data: null,
    });
  }

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

  if (!userPhone) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_PHONE,
      data: null,
    });
  }

  if (!userAddress) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_ADDRESS,
      data: null,
    });
  }

  // if (!validEmail(userEmail)) {
  //   return res.status(STATUS_CODE.BAD_REQUEST).json({
  //     status: STATUS_CODE.BAD_REQUEST,
  //     message: STATUS_MESSAGE.invalid_email,
  //     data: null,
  //   });
  // }

  // if (!validNickname(userNickname)) {
  //   return res.status(STATUS_CODE.BAD_REQUEST).json({
  //     status: STATUS_CODE.BAD_REQUEST,
  //     message: STATUS_MESSAGE.INVALID_NICKNAME,
  //     data: null,
  //   });
  // }

  // if (!validPassword(userPw)) {
  //   return res.status(STATUS_CODE.BAD_REQUEST).json({
  //     status: STATUS_CODE.BAD_REQUEST,
  //     message: STATUS_MESSAGE.INVALID_PASSWORD,
  //     data: null,
  //   });
  // }

  const requsetData = {
    userName: userName,
    userNickname: userNickname,
    userEmail: userEmail,
    userPw: userPw,
    userPhone: userPhone,
    userAddress: userAddress,
  };

  try {
    const response = await userModel.userSignup(requsetData);

    if (response.length === 0) {
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
        data: null,
      });
    }

    return res.status(STATUS_CODE.CREATED).json({
      status: STATUS_CODE.CREATED,
      message: STATUS_MESSAGE.SIGNUP_SUCCESS,
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

// 비밀번호 확인
exports.verifyPassword = async (req, res) => {
  const { password: password } = req.body;

  if (!password) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_PASSWORD,
      data: null,
    });
  }

  if (!req.session.userId) {
    return res.status(STATUS_CODE.UNAUTHORIZED).json({
      status: STATUS_CODE.UNAUTHORIZED,
      message: STATUS_MESSAGE.NOT_LOGIN,
      data: null,
    });
  }

  try {
    const requestData = {
      userPassword: req.body.password,
      userId: req.session.userId,
    };

    const response = await userModel.verifyPassword(requestData);

    if (response.length === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: STATUS_CODE.NOT_FOUND,
        message: STATUS_MESSAGE.INVALID_PASSWORD,
        data: null,
      });
    }

    if (response[0].check_pw === 1) {
      return res.status(STATUS_CODE.OK).json({
        status: STATUS_CODE.OK,
        message: STATUS_MESSAGE.IS_USER,
        check: true,
      });
    } else {
      return res.status(STATUS_CODE.OK).json({
        status: STATUS_CODE.OK,
        message: STATUS_MESSAGE.IS_NOT_USER,
        check: false,
      });
    }
  } catch (err) {
    console.error(err);

    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

// 유저 업데이트
exports.userUpdate = async (req, res) => {
  const {
    userNickname: userNickname,
    userPhone: userPhone,
    userAddress: userAddress,
    userPassword: userPassword,
  } = req.body;

  if (!userNickname) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_NICKNAME,
      data: null,
    });
  }

  if (!userPassword) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_PASSWORD,
      data: null,
    });
  }

  if (!userPhone) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_PHONE,
      data: null,
    });
  }

  if (!userAddress) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.REQUIRED_ADDRESS,
      data: null,
    });
  }

  try {
    const checkRequestData = {
      userId: req.session.userId,
      userPassword: userPassword,
    };

    const checkResponse = await userModel.verifyPassword(checkRequestData);

    if (checkResponse[0].check_pw === 1) {
      const updateRequestData = {
        userId: req.session.userId,
        userNickname: userNickname,
        userPhone: userPhone,
        userAddress: userAddress,
      };

      const updateResponse = await userModel.userUpdate(updateRequestData);

      return res.status(STATUS_CODE.OK).json({
        status: STATUS_CODE.OK,
        message: STATUS_MESSAGE.UPDATE_USER_DATA_SUCCESS,
        data: null,
      });
    }

    return res.status(STATUS_CODE.UNAUTHORIZED).json({
      status: STATUS_CODE.UNAUTHORIZED,
      message: STATUS_MESSAGE.INVALID_PASSWORD,
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

exports.userDelete = async (req, res) => {
  if (!req.session.userId) {
    return res.status(STATUS_CODE.NOT_FOUND).json({
      status: STATUS_CODE.NOT_FOUND,
      message: STATUS_MESSAGE.NOT_FOUND_USER,
      data: null,
    });
  }

  try {
    const requestData = {
      userId: req.session.userId,
    };

    const response = await userModel.userDelete(requestData);

    if (response.length === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: STATUS_CODE.NOT_FOUND,
        message: STATUS_MESSAGE.NOT_FOUND_USER,
        data: null,
      });
    }

    res.clearCookie("connect.sid");

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      message: STATUS_MESSAGE.DELETE_USER_DATA_SUCCESS,
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

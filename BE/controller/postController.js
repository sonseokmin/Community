/* 게시글 API 응답 반환 파일 */

const postModel = require("../model/postModel.js");

const {
  STATUS_CODE,
  STATUS_MESSAGE,
} = require("../util/constant/httpStatusCode.js");

/**
 * 게시글 전체 조회
 * 게시글 상세 조회
 * 게시글 작성
 * 게시글 수정
 * 게시글 삭제
 */

// 게시판 전체 조회
exports.getPosts = async (req, res) => {
  const postType = req.params.board; // 게시판 종류

  // 게시판 종류 누락
  if (!postType) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_TYPE,
      data: null,
    });
  }

  try {
    const response = await postModel.getPosts(postType);

    // 게시판을 찾을 수 없는 경우
    if (response.length === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: STATUS_CODE.NOT_FOUND,
        message: STATUS_MESSAGE.NOT_FOUND_TYPE,
        data: null,
      });
    }

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      message: STATUS_MESSAGE.GET_POSTS_SUCCESS,
      data: response,
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

// 게시글 상세 조회
exports.getPost = async (req, res) => {
  const postId = req.params.id; // 게시글 아이디

  // 게시글 아이디 누락
  if (!postId) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_ID,
      data: null,
    });
  }

  try {
    const response = await postModel.getPost(postId);

    // 찾을 수 없는 게시판
    if (response.length === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: STATUS_CODE.NOT_FOUND,
        message: STATUS_MESSAGE.NOT_FOUND_TYPE,
        data: null,
      });
    }

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      message: STATUS_MESSAGE.GET_POSTS_SUCCESS,
      data: response,
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

// 게시글 작성
exports.writePost = async (req, res) => {
  const { title: postTitle, content: postContent, type: postType } = req.body; // 제목, 내용, 게시판 종류
  // 로그인이 안 됐을 경우
  if (!req.session.userId) {
    return res.status(STATUS_CODE.UNAUTHORIZED).json({
      status: STATUS_CODE.UNAUTHORIZED,
      message: STATUS_MESSAGE.NOT_FOUND_USER,
      data: null,
    });
  }
  // 제목 누락
  if (!postTitle) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_TITLE,
      data: null,
    });
  }

  // 내용 누락
  if (!postContent) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_CONTENT,
      data: null,
    });
  }

  // 게시판 종류 누락
  if (!postType) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_TYPE,
      data: null,
    });
  }

  requestData = {
    title: postTitle,
    content: postContent,
    type: postType,
    userId: req.session.userId,
  };

  try {
    const response = await postModel.writePost(requestData);

    // 찾을 수 없는 게시판
    if (response.length === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: STATUS_CODE.NOT_FOUND,
        message: STATUS_MESSAGE.NOT_FOUND_TYPE,
        data: null,
      });
    }

    return res.status(STATUS_CODE.CREATED).json({
      status: STATUS_CODE.CREATED,
      message: STATUS_MESSAGE.WRITE_POST_SUCCESS,
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

// 게시글 수정
exports.updatePost = async (req, res) => {
  const {
    id: postId,
    title: postTitle,
    content: postContent,
    type: postType,
  } = req.body; // 게시글 아이디, 제목, 내용, 게시판 종류

  // 로그인이 안 됐을 경우
  if (!req.session.userId) {
    return res.status(STATUS_CODE.UNAUTHORIZED).json({
      status: STATUS_CODE.UNAUTHORIZED,
      message: STATUS_MESSAGE.NOT_FOUND_USER,
      data: null,
    });
  }

  // 게시글 아이디 누락
  if (!postId) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_ID,
      data: null,
    });
  }

  // 제목 누락
  if (!postTitle) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_TITLE,
      data: null,
    });
  }

  // 내용 누락
  if (!postContent) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_CONTENT,
      data: null,
    });
  }

  // 게시판 종류 누락
  if (!postType) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_TYPE,
      data: null,
    });
  }

  const requestData = {
    id: postId,
    title: postTitle,
    content: postContent,
    userId: req.session.userId,
  };

  try {
    const response = await postModel.updatePost(requestData);

    // 찾을 수 없는 게시판
    if (response.length === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: STATUS_CODE.NOT_FOUND,
        message: STATUS_MESSAGE.NOT_FOUND_TYPE,
        data: null,
      });
    }

    return res.status(STATUS_CODE.END).json({
      status: STATUS_CODE.END,
      message: STATUS_MESSAGE.UPDATE_POST_SUCCESS,
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

// 게시글 삭제
exports.deletePost = async (req, res) => {
  const postId = req.params.id; // 게시글 아이디

  // 게시글 아이디 누락
  if (!postId) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_POST_ID,
      data: null,
    });
  }

  try {
    const response = await postModel.deletePost(postId);

    // 찾을 수 없는 게시판
    if (response.length === 0) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: STATUS_CODE.NOT_FOUND,
        message: STATUS_MESSAGE.NOT_FOUND_TYPE,
        data: null,
      });
    }

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.END,
      message: STATUS_MESSAGE.DELETE_POST_SUCCESS,
      data: response,
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

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
  const postType = req.params.board;
  try {
    const response = await postModel.getPosts(postType);

    if (!response) {
      const error = new Error(STATUS_MESSAGE.NOT_A_SINGLE_POST);
      error.status = STATUS_CODE.NOT_FOUND;
      throw error;
    }

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      message: STATUS_MESSAGE.GET_POSTS_SUCCESS,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

// 게시글 상세 조회
exports.getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    if (!postId) {
      const error = new Error(STATUS_MESSAGE.INVALID_POST_ID);
      error.status = STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    const response = await postModel.getPost(postId);

    if (!response) {
      const error = new Error(STATUS_MESSAGE.NOT_A_SINGLE_POST);
      error.status = STATUS_CODE.NOT_FOUND;
      throw error;
    }

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      message: STATUS_MESSAGE.GET_POSTS_SUCCESS,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

// 게시글 작성
exports.writePost = async (req, res) => {
  const { title: postTitle, content: postContent, type: postType } = req.body;
  try {
    if (!postTitle) {
      const error = new Error(STATUS_MESSAGE.INVALID_POST_TITLE);
      error.status = STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    if (!postContent) {
      const error = new Error(STATUS_MESSAGE.INVALID_POST_CONTENT);
      error.status = STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    if (!postType) {
      const error = new Error(STATUS_MESSAGE.INVALID_POST_ID);
      error.status = STATUS_CODE.BAD_REQUEST;
      throw error;
    }
    const response = await postModel.writePost(req.body);

    if (!response) {
      const error = new Error(STATUS_MESSAGE.WRITE_POST_FAILED);
      error.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
      throw error;
    }

    return res.status(STATUS_CODE.CREATED).json({
      status: STATUS_CODE.CREATED,
      message: STATUS_MESSAGE.WRITE_POST_SUCCESS,
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

// 게시글 수정
exports.updatePost = async (req, res) => {
  const {
    id: postId,
    title: postTitle,
    content: postContent,
    type: postType,
  } = req.body;

  try {
    if (!postId) {
      const error = new Error(STATUS_MESSAGE.INVALID_POST_ID);
      error.status = STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    if (!postTitle) {
      const error = new Error(STATUS_MESSAGE.INVALID_POST_TITLE);
      error.status = STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    if (!postContent) {
      const error = new Error(STATUS_MESSAGE.INVALID_POST_CONTENT);
      error.status = STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    if (!postType) {
      const error = new Error(STATUS_MESSAGE.INVALID_POST_TYPE);
      error.status = STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    const response = await postModel.updatePost(req.body);

    if (!response) {
      const error = new Error(STATUS_MESSAGE.NOT_A_SINGLE_POST);
      error.status = STATUS_CODE.NOT_FOUND;
      throw error;
    }

    return res.status(STATUS_CODE.END).json({
      status: STATUS_CODE.END,
      message: STATUS_MESSAGE.UPDATE_POST_SUCCESS,
      data: response,
    });
  } catch (err) {
    console.log(err);
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    if (!postId) {
      const error = new Error(STATUS_MESSAGE.INVALID_POST_ID);
      error.status = STATUS_CODE.BAD_REQUEST;
      throw error;
    }

    const response = await postModel.deletePost(postId);

    if (!response) {
      const error = new Error(STATUS_MESSAGE.NOT_A_SINGLE_POST);
      error.status = STATUS_CODE.NOT_FOUND;
      throw error;
    }

    return res.status(STATUS_CODE.END).json({
      status: STATUS_CODE.END,
      message: STATUS_MESSAGE.DELETE_POST_SUCCESS,
      data: response,
    });
  } catch (err) {
    console.log(err);
  }
};

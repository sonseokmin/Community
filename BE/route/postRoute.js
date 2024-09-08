// 게시글 API 응답 경로 정의 파일

const express = require("express");
const postController = require("../controller/postController.js");

const router = express.Router();

router.get("/:board/list", postController.getPosts); // 전체 게시글 조회

module.exports = router;

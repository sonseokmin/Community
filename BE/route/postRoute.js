/* 게시글 API 응답 경로 정의 파일 */

const express = require("express");
const postController = require("../controller/postController.js");

const router = express.Router();

router.get("/community/:board", postController.getPosts); // 게시판 전체 게시글 조회
router.get("/community/view/:id", postController.getPost); // 게시판 특정 게시글 조회
router.post("/community/:board", postController.writePost);

module.exports = router;

/* 게시글 API 응답 경로 정의 파일 */

const express = require("express");
const postController = require("../controller/postController.js");

const router = express.Router();

router.get("/community/:board", postController.getPosts); // 게시글 전체 조회
router.get("/community/view/:id", postController.getPost); // 게시글 상세 조회
router.post("/community/:board", postController.writePost); // 게시글 작성
// router.put("/community/:board/:id", postController.updatePost); // 게시글 수정
router.delete("/community/delete/:id", postController.deletePost); // 게시글 삭제

module.exports = router;

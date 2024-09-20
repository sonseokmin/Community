/* 유저 관련 API 경로 정의 파일 */

const express = require("express");
const userController = require("../controller/userController.js");

const router = express.Router();

router.post("/community/users/login", userController.login); // 로그인
router.post("/community/users/signup", userController.signup); // 회원가입

module.exports = router;

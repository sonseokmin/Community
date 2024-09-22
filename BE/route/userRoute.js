/* 유저 관련 API 경로 정의 파일 */

const express = require("express");
const userController = require("../controller/userController.js");

const router = express.Router();

router.post("/community/users/login", userController.userLogin); // 로그인
router.get("/community/check/login", userController.checkLoginState); // 로그인 상태 확인
router.post("/community/users/signup", userController.userSignup); // 회원가입

module.exports = router;

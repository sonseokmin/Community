/* 유저 관련 API 경로 정의 파일 */

const express = require("express");
const userController = require("../controller/userController.js");

const router = express.Router();

router.post("/community/user/login", userController.userLogin); // 로그인
router.get("/community/check/login", userController.checkLoginState); // 로그인 상태 확인
router.get("/community/check/userPost/:postId", userController.checkUserPost); // 유저 게시글 확인
router.post("/community/user/logout", userController.userLogout); // 로그아웃

router.post("/community/user/checkEmail", userController.checkSignupEmail); // 이메일 중복 체크
router.post(
  "/community/user/checkNickname",
  userController.checkSignupNickname
); // 닉네임 중복 체크

router.post("/community/user/signup", userController.userSignup); // 회원가입

module.exports = router;

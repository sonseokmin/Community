/* 전체 API 응답 경로 정의 파일 */

const express = require("express");
const postRoute = require("./postRoute.js");
const userRoute = require("./userRoute.js");

const router = express.Router();

router.use(userRoute); // 유저 API 응답
router.use(postRoute); // 게시물 API 응답

module.exports = router;

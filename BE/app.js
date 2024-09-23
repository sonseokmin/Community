/* 서버 실행 메인 파일 */

require("dotenv").config({ path: "./.env.dev" });

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const route = require("./route/index.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // 클라이언트 도메인
    credentials: true, // 쿠키를 포함한 요청 허용
  })
);
app.use("/", route);

app.listen(3000, () => {
  console.log("Community app listening on port 3000");
});

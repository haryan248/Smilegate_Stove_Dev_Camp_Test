const { BlogPost, Comment, SubComment } = require("./blogDatabse.js");
const express = require("express");
const cors = require("cors");
const app = express();

const whitelist = ["http://localhost:8080"];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not Allowed Origin!"));
        }
    },
};

app.use(cors(corsOptions)); // 옵션을 추가한 CORS 미들웨어 추가

// 블로그 글 등록, 조회 API
// 글 목록 조회
app.get("/blog", function (req, res) {
    res.send(BlogPost);
});

// 글 세부 페이지 내용
app.get("/blog/:blogContentId", function (req, res) {
    const blogContentId = Number(req.params.blogContentId);
    const result = BlogPost.filter((blogItem) => {
        if (blogItem.content_id === blogContentId) return blogItem;
    });
    res.send(...result);
});

// 새로운 글 등록
app.post("/blog", function (req, res) {
    const userId = req.query.user_id;
    const title = req.query.title;
    const description = req.query.description;
    const contentId = +new Date();

    BlogPost.push({
        user_id: userId,
        content_id: contentId,
        title,
        description,
        created_at: new Date(),
        updated_at: null,
        commentCount: 0,
    });
    res.json({ message: "OK", data: contentId });
});

// 글 수정
app.post("/update-blog", function (req, res) {
    const title = req.query.title;
    const description = req.query.description;
    const blogContentId = Number(req.query.blogContentId);

    BlogPost.forEach((blogItem) => {
        if (blogItem.content_id === blogContentId) {
            blogItem.updated_at = new Date();
            blogItem.title = title;
            blogItem.description = description;
        } else return;
    });
    res.json({ message: "OK" });
});

// 글 삭제
app.delete("/blog/:blogContentId", function (req, res) {
    const blogContentId = Number(req.params.blogContentId);
    const deleteIndex = BlogPost.findIndex((blogItem) => blogItem.content_id === blogContentId);
    BlogPost.splice(deleteIndex, 1);
    res.json({ message: "OK" });
});

// 댓글 등록, 조회 API
// app.get("/blog", function (req, res) {
//     res.send(BlogPost);
// });

// app.get("/blog/:blogId", function (req, res) {
//     const blogId = Number(req.params.blogId);
//     const result = BlogPost.filter((blogItem) => {
//         if (blogItem.id === blogId) return blogItem;
//     });
//     res.send(...result);
// });

app.listen(3000, () => {
    console.log("Server is on!");
});

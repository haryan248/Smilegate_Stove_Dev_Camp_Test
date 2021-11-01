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

// 블로그 글 등록, 조회, 삭제, 수정 API
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

// 댓글 등록, 조회, 수정, 삭제 API
// 댓글 조회
app.get("/blog/:blogContentId/comment", function (req, res) {
    const blogContentId = Number(req.params.blogContentId);
    const result = Comment.filter((commentItem) => commentItem.content_id === blogContentId);
    res.json({ message: "OK", data: result });
});

// 댓글 등록
app.post("/blog/:blogContentId/comment", function (req, res) {
    const userId = req.query.user_id;
    const blogContentId = Number(req.params.blogContentId);
    const commentText = req.query.commentText;
    const commentId = +new Date();

    Comment.push({
        comment_id: commentId,
        content_id: blogContentId,
        user_id: userId,
        text: commentText,
        created_at: new Date(),
        updated_at: null,
    });
    res.json({ message: "OK", data: Comment });
});

// 댓글 수정
app.post("/blog/:blogContentId/update-comment/:commentId", function (req, res) {
    const commentId = Number(req.params.commentId);
    const commentText = req.query.commentText;

    Comment.forEach((commentItem) => {
        if (commentItem.comment_id === commentId) {
            console.log(commentItem);
            commentItem.text = commentText;
            commentItem.updated_at = new Date();
        } else return;
    });

    res.json({ message: "OK", data: Comment });
});

// 댓글 삭제
app.delete("/blog/:blogContentId/comment/:deleteCommentId", function (req, res) {
    // const blogContentId = Number(req.params.blogContentId);
    const deleteCommentId = Number(req.params.deleteCommentId);
    const deleteIndex = Comment.findIndex((blogItem) => blogItem.comment_id === deleteCommentId);
    Comment.splice(deleteIndex, 1);
    res.json({ message: "OK" });
});

app.listen(3000, () => {
    console.log("Server is on!");
});

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

// 블로그 게시물의 댓글 수 세는 함수
const countCommentList = (blogContentId) => {
    const totalComment =
        Comment.filter((commentItem) => commentItem.content_id === blogContentId).length +
        SubComment.filter((subCommentItem) => subCommentItem.content_id === blogContentId).length;

    BlogPost.forEach((blogItem) => {
        if (blogItem.content_id === blogContentId) {
            blogItem.commentCount = totalComment;
        } else return;
    });
};

const filterCommentList = (blogContentId) => {
    return Comment.filter((commentItem) => commentItem.content_id === blogContentId);
};
const filterSubCommentList = (blogContentId) => {
    return SubComment.filter((subCommentItem) => subCommentItem.content_id === blogContentId);
};
// 블로그 글 등록, 조회, 삭제, 수정 API
// 글 목록 조회
app.get("/blog", function (req, res) {
    res.send({ message: "OK", data: { post_result: BlogPost } });
});

// 글 세부 페이지 내용
app.get("/blog/:blogContentId", function (req, res) {
    const blogContentId = req.params.blogContentId;
    const result = BlogPost.filter((blogItem) => {
        if (blogItem.content_id === blogContentId) return blogItem;
    });
    countCommentList(blogContentId);
    res.send({ data: { content_result: result[0] } });
});

// 새로운 글 등록
app.post("/blog", function (req, res) {
    const userId = req.query.userId;
    const title = req.query.title;
    const description = req.query.description;
    const contentId = String(+new Date());

    BlogPost.push({
        user_id: userId,
        content_id: contentId,
        title,
        description,
        created_at: new Date().toLocaleString(),
        updated_at: null,
        commentCount: 0,
    });

    res.json({ message: "OK", data: contentId });
});

// 글 수정
app.put("/update-blog", function (req, res) {
    const title = req.query.title;
    const description = req.query.description;
    const blogContentId = req.query.blogContentId;

    BlogPost.forEach((blogItem) => {
        if (blogItem.content_id === blogContentId) {
            blogItem.updated_at = new Date().toLocaleString();
            blogItem.title = title;
            blogItem.description = description;
        } else return;
    });
    res.json({ message: "OK" });
});

// 글 삭제
app.delete("/blog/:blogContentId", function (req, res) {
    const blogContentId = req.params.blogContentId;
    const deleteIndex = BlogPost.findIndex((blogItem) => blogItem.content_id === blogContentId);
    BlogPost.splice(deleteIndex, 1);
    res.json({ message: "OK" });
});

// 댓글 등록, 조회, 수정, 삭제 API
// 댓글, 답글 조회
app.get("/blog/:blogContentId/comment", function (req, res) {
    const blogContentId = req.params.blogContentId;
    const comment_result = Comment.filter((commentItem) => commentItem.content_id === blogContentId);
    const sub_comment_result = SubComment.filter((subCommentItem) => subCommentItem.content_id === blogContentId);

    res.json({ message: "OK", data: { comment_result, sub_comment_result } });
});

// 댓글, 답글 등록
app.post("/blog/:blogContentId/comment/:blogCommentId?", function (req, res) {
    const userId = req.query.userId;
    const commentText = req.query.commentText;
    const blogContentId = req.params.blogContentId;
    const blogCommentId = req.params.blogCommentId;
    const subCommentId = "sub" + +new Date();
    const commentId = String(+new Date());

    if (blogCommentId) {
        SubComment.push({
            content_id: blogContentId,
            sub_comment_id: subCommentId,
            comment_id: blogCommentId,
            user_id: userId,
            text: commentText,
            created_at: new Date().toLocaleString(),
            updated_at: null,
        });
    } else {
        Comment.push({
            comment_id: commentId,
            content_id: blogContentId,
            user_id: userId,
            text: commentText,
            created_at: new Date().toLocaleString(),
            updated_at: null,
        });
    }
    countCommentList(blogContentId);
    const comment_result = filterCommentList(blogContentId);

    res.json({ message: "OK", data: { comment_result, sub_comment_result: SubComment } });
});

// 댓글, 답글 수정
app.put("/blog/:blogContentId/update-comment/:commentId", function (req, res) {
    const commentId = req.params.commentId;
    const blogContentId = req.params.blogContentId;
    const commentText = req.query.commentText;
    const subCommentId = req.query.subCommentId === undefined ? null : req.query.subCommentId;
    if (subCommentId === null) {
        Comment.forEach((commentItem) => {
            if (commentItem.comment_id === commentId) {
                commentItem.text = commentText;
                commentItem.updated_at = new Date().toLocaleString();
            } else return;
        });
    } else {
        SubComment.forEach((subCommentItem) => {
            if (subCommentItem.sub_comment_id === subCommentId) {
                subCommentItem.text = commentText;
                subCommentItem.updated_at = new Date().toLocaleString();
            } else return;
        });
    }
    const comment_result = filterCommentList(blogContentId);

    res.json({ message: "OK", data: { comment_result, sub_comment_result: SubComment } });
});

// 댓글, 답글 삭제
app.delete("/blog/:blogContentId/comment", function (req, res) {
    const blogContentId = req.params.blogContentId;
    const deleteCommentId = req.query.deleteCommentId;
    const deleteSubCommentId = req.query.deleteSubCommentId === undefined ? null : req.query.deleteSubCommentId;

    const deleteIndex = Comment.findIndex((commentItem) => commentItem.comment_id === deleteCommentId);
    const deleteSubIndex = SubComment.findIndex((subCommentItem) => subCommentItem.sub_comment_id === deleteSubCommentId);

    if (deleteSubCommentId === null) {
        // 댓글 삭제시 달려 있는 모든 답글 삭제
        Comment.splice(deleteIndex, 1);
        let SubCommentLength = SubComment.length;
        for (let i = 0; i < SubCommentLength; i++) {
            let deleteTempIndex = SubComment.findIndex((commentItem) => commentItem.comment_id === deleteCommentId);
            if (deleteTempIndex !== -1) SubComment.splice(deleteTempIndex, 1);
        }
    } else {
        SubComment.splice(deleteSubIndex, 1);
    }

    countCommentList(blogContentId);
    const comment_result = filterCommentList(blogContentId);
    const sub_comment_result = filterSubCommentList(blogContentId);

    res.json({ message: "OK", data: { comment_result, sub_comment_result } });
});

app.listen(3000, () => {
    console.log("------------------API Server is on!------------------");
});

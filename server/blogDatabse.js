const BlogPost = [
    {
        user_id: "1",
        content_id: "1",
        title: "글1",
        description: "첫번째 글 입니다.",
        created_at: "2021.11.01",
        updated_at: null,
        commentCount: 0,
    },
];
const Comment = [
    {
        comment_id: "1",
        content_id: "1635750436574",
        user_id: "1",
        text: "안녕하세요1",
        created_at: "2021.11.01",
        updated_at: null,
    },
    {
        comment_id: "2",
        content_id: "1635750436574",
        user_id: "1",
        text: "안녕하세요2",
        created_at: "2021.11.01",
        updated_at: null,
    },
    {
        comment_id: "3",
        content_id: "1",
        user_id: "1",
        text: "안녕하세요1",
        created_at: "2021.11.01",
        updated_at: null,
    },
    {
        comment_id: "4",
        content_id: "1",
        user_id: "1",
        text: "안녕하세요2",
        created_at: "2021.11.01",
        updated_at: null,
    },
    {
        comment_id: "5",
        content_id: "1",
        user_id: "1",
        text: "안녕하세요3",
        created_at: "2021.11.01",
        updated_at: null,
    },
];

const SubComment = [
    {
        content_id: "1",
        sub_comment_id: "1",
        comment_id: "3",
        user_id: "1",
        text: "답글1",
        created_at: "2021.11.01",
        updated_at: null,
    },
    {
        content_id: "1",
        sub_comment_id: "2",
        comment_id: "3",
        user_id: "1",
        text: "답글2",
        created_at: "2021.11.01",
        updated_at: null,
    },
    {
        content_id: "1",
        sub_comment_id: "3",
        comment_id: "5",
        user_id: "1",
        text: "답글3",
        created_at: "2021.11.01",
        updated_at: null,
    },
];

module.exports = { BlogPost, Comment, SubComment };

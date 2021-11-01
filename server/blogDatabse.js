const BlogPost = [
    {
        user_id: 1,
        content_id: 1,
        title: "글1",
        description: "첫번째 글 입니다.",
        created_at: "2021.11.01",
        updated_at: null,
        commentCount: 0,
    },
];
const Comment = [
    {
        comment_id: 1,
        content_id: 2,
        user_id: 1,
        context: "안녕하세요1",
        created_at: "2021.11.01",
        updated_at: null,
    },
    {
        comment_id: 2,
        content_id: 1,
        user_id: 1,
        context: "안녕하세요2",
        created_at: "2021.11.01",
        updated_at: null,
    },
    {
        comment_id: 4,
        content_id: 3,
        user_id: 1,
        context: "안녕하세요4",
        created_at: "2021.11.01",
        updated_at: null,
    },
];

const SubComment = [
    {
        subcomment_id: 2,
        comment_id: 3,
        user_id: 1,
        context: "답글1",
        created_at: "2021.11.01",
        updated_at: null,
    },
];

module.exports = { BlogPost, Comment, SubComment };

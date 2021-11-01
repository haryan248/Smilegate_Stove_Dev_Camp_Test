<template>
    <div>
        <div>제목 : {{ blogContent.title }}</div>
        <div>본문 : {{ blogContent.description }}</div>
        <div>등록일 : {{ blogContent.created_at }}</div>
        <button @click="updateBlogPost">글 수정하기</button>
        <button @click="deleteBlogPost">글 삭제하기</button>

        <div>
            <div>{{ blogContent.commentCount }} 개의 댓글</div>
            <div>
                <input type="text" placeholder="댓글을 남겨보세요." v-model="commentText" />
                <button @click="registerComment">댓글 등록</button>
            </div>
            <div>댓글 목록</div>
            <div>
                <div v-for="blogComment in blogCommentList" :key="blogComment.comment_id">
                    <div v-if="blogComment.isUpdate">
                        <input type="text" v-model="updateCommentText" />
                        <button @click="updateComment(blogComment.comment_id)">수정 완료</button>
                        <button @click="toggleUpdateComment(blogComment.comment_id)">취소</button>
                    </div>
                    <div v-else>{{ blogComment.text }}</div>
                    <button @click="toggleUpdateComment(blogComment.comment_id, blogComment.text)">댓글 수정</button>
                    <button>답글 달기</button>
                    <button @click="deleteComment(blogComment.comment_id)">댓글 삭제</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailPage",
    data() {
        return {
            blogContentId: Number(this.$route.params.blogContentId),
            blogContent: {},
            blogCommentList: {},
            commentText: "",
            updateCommentText: "",
        };
    },

    mounted() {
        this.getBlogDetail();
        this.getBlogComment();
    },

    methods: {
        async getBlogDetail() {
            await this.$axios
                .get(`http://localhost:3000/blog/${this.blogContentId}`)
                .then((res) => {
                    this.blogContent = res.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        async getBlogComment() {
            await this.$axios
                .get(`http://localhost:3000/blog/${this.blogContentId}/comment`)
                .then((res) => {
                    this.blogCommentList = [...res.data.data].map((data) => {
                        return { ...data, isUpdate: false };
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 글 수정하기
        updateBlogPost() {
            this.$router.push({
                path: `/blog/write/${this.blogContentId}`,
            });
        },

        // 글 삭제하기
        deleteBlogPost() {
            this.$axios.delete(`http://localhost:3000/blog/${this.blogContentId}`).catch((error) => {
                console.log(error.response);
            });
            this.$router.push("/");
        },

        // 댓글 등록하기
        async registerComment() {
            await this.$axios
                .post(
                    `http://localhost:3000/blog/${this.blogContentId}/comment`,
                    {},
                    {
                        params: {
                            userId: 1,
                            commentText: this.commentText,
                        },
                    }
                )
                .catch((error) => {
                    console.log(error.response);
                });
            this.getBlogComment();
            this.commentText = "";
        },

        // 업데이트 토글 메소드
        toggleUpdateComment(commentId, commentText) {
            this.updateCommentText = commentText;
            [...this.blogCommentList].forEach((comment) => {
                if (comment.comment_id === commentId) {
                    comment.isUpdate = !comment.isUpdate;
                }
            });
        },

        // 댓글 수정
        async updateComment(commentId) {
            await this.$axios
                .post(
                    `http://localhost:3000/blog/${this.blogContentId}/update-comment/${commentId}`,
                    {},
                    {
                        params: {
                            commentText: this.updateCommentText,
                        },
                    }
                )
                .catch((error) => {
                    console.log(error.response);
                });
            this.getBlogComment();
            this.toggleUpdateComment();
        },

        // 댓글 삭제하기
        async deleteComment(deleteCommentId) {
            await this.$axios.delete(`http://localhost:3000/blog/${this.blogContentId}/comment/${deleteCommentId}`).catch((error) => {
                console.log(error.response);
            });
            this.getBlogComment();
        },
    },
};
</script>
<style scoped>
@import "./DetailPage.css";
</style>

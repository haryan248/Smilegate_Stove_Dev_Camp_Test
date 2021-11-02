<template>
    <div>
        <div v-if="isRegister">
            <input type="text" :placeholder="isSubComment ? '답글을 달아주세요.' : '댓글을 남겨보세요.'" v-model="commentText" />
            <button @click="isSubComment ? registerSubComment(blogCommentId) : registerComment()">댓글 등록</button>
            <button v-if="isSubComment" @click="toggleRegisterSubComment">취소</button>
        </div>
        <div v-else>
            <input type="text" v-model="updateCommentText" />
            <button @click="isSubComment ? updateSubComment(blogCommentId) : updateComment(blogCommentId)">수정 완료</button>
            <button @click="isSubComment ? toggleUpdateSubComment() : toggleUpdateComment()">취소</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "CommentCreate",
    props: {
        isRegister: Boolean,
        isSubComment: Boolean,
        toggleUpdateComment: Function,
        toggleUpdateSubComment: Function,
        toggleRegisterSubComment: Function,
        getBlogComment: Function,
        getBlogDetail: Function,
        blogCommentText: String,
        blogCommentId: [Number, String],
        blogContentId: String,
    },
    data() {
        return {
            commentText: "",
            updateCommentText: this.blogCommentText,
        };
    },

    methods: {
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
            this.getBlogDetail();
            this.getBlogComment();
            this.commentText = "";
        },
        // 답글 등록
        async registerSubComment(blogCommentId) {
            await this.$axios
                .post(
                    `http://localhost:3000/blog/${this.blogContentId}/comment/${blogCommentId}`,
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
            this.toggleRegisterSubComment();
        },

        // 댓글 수정
        async updateComment(blogCommentId) {
            await this.$axios
                .post(
                    `http://localhost:3000/blog/${this.blogContentId}/update-comment/${blogCommentId}`,
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

        //답글 수정
        async updateSubComment(blogCommentId) {
            await this.$axios
                .post(
                    `http://localhost:3000/blog/${this.blogContentId}/update-comment/${blogCommentId}`,
                    {},
                    {
                        params: {
                            commentText: this.updateCommentText,
                            subCommentId: blogCommentId,
                        },
                    }
                )
                .catch((error) => {
                    console.log(error.response);
                });
            this.getBlogComment();
            this.toggleUpdateSubComment();
        },
    },
};
</script>

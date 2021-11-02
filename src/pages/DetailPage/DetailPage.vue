<template>
    <div>
        <div>제목 : {{ blogContent.title }}</div>
        <div>본문 : {{ blogContent.description }}</div>
        <div>등록일 : {{ blogContent.created_at }}</div>
        <button @click="updateBlogPost">글 수정하기</button>
        <button @click="deleteBlogPost">글 삭제하기</button>

        <div>
            <div>{{ blogContent.commentCount }} 개의 댓글</div>
            <div>댓글 목록</div>
            <div>
                <CommentList
                    :blogCommentList="blogCommentList"
                    :blogSubCommentList="blogSubCommentList"
                    :getBlogComment="getBlogComment"
                    :getBlogDetail="getBlogDetail"
                    :blogContentId="blogContentId"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CommentList from "../../components/Comment/CommentList/CommentList.vue";
export default {
    name: "DetailPage",
    data() {
        return {
            blogContentId: this.$route.params.blogContentId,
            blogContent: {},
            blogCommentList: {},
            blogSubCommentList: {},
            updateCommentText: "",
        };
    },
    components: {
        CommentList,
    },
    mounted() {
        this.getBlogDetail();
        this.getBlogComment();
    },

    methods: {
        async getBlogDetail() {
            await this.$axios
                .get(`http://localhost:3000/blog/${this.blogContentId}`)
                .then(({ data }) => {
                    this.blogContent = data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        async getBlogComment() {
            await this.$axios
                .get(`http://localhost:3000/blog/${this.blogContentId}/comment`)
                .then(({ data }) => {
                    this.blogCommentList = data.data.comment_result;
                    this.blogSubCommentList = data.data.sub_comment_result;
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
    },
};
</script>
<style scoped>
@import "./DetailPage.css";
</style>

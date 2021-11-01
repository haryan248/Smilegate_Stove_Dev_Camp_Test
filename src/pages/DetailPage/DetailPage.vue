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
                <input type="text" placeholder="댓글을 남겨보세요." />
                <button>댓글 등록</button>
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
        };
    },

    mounted() {
        this.$axios
            .get(`http://localhost:3000/blog/${this.blogContentId}`)
            .then((res) => {
                this.blogContent = res.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
    },
    methods: {
        // 글 수정하기
        updateBlogPost() {
            this.$router.push({
                path: `/blog/write/${this.blogContentId}`,
            });
        },
        deleteBlogPost() {
            this.$axios.delete(`http://localhost:3000/blog/${this.blogContentId}`).catch((error) => {
                console.log(error.response);
            });
            this.$router.push("/");
        },

        registerComment() {
            this.$axios
                .post(`http://localhost:3000/blog/${this.blogContentId}`)
                .then((res) => {
                    this.blogContent = res.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
    },
};
</script>
<style scoped>
@import "./DetailPage.css";
</style>

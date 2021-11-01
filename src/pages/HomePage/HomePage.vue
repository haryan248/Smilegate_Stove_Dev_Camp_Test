<template>
    <div>
        <button>
            <router-link to="/blog/write">글 등록하기</router-link>
        </button>
        <div v-if="blogPosts.length === 0">등록된 블로그 글이 없습니다.</div>
        <div v-for="blogPost in blogPosts" :key="blogPost.content_id" @click="goToDetailPage(blogPost)">
            <div>제목 : {{ blogPost.title }}</div>
            <div>본문 : {{ blogPost.description }}</div>
            <div>등록일 : {{ blogPost.created_at }}</div>
            <div>댓글 : {{ blogPost.commentCount }} 개</div>
            <hr />
        </div>
    </div>
</template>
<script>
export default {
    name: "HomePage",
    data() {
        return {
            blogPosts: [],
        };
    },
    async mounted() {
        await this.$axios
            .get("http://localhost:3000/blog")
            .then((res) => {
                this.blogPosts = res.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
    },
    methods: {
        goToDetailPage(blogPost) {
            this.$router.push({
                path: `/blog/detail/${blogPost.content_id}`,
                params: { blogContentId: blogPost.content_id },
            });
        },
    },
};
</script>
<style scoped>
@import "./HomePage.css";
</style>

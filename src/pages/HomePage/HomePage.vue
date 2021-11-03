<template>
    <div class="HomePage-container">
        <div class="HomePage-my-profile">
            <div class="HomePage-profile-image">하현준</div>
            <div class="HomePage-profile-detail">
                <div class="HomePage-profile-name">하현준</div>
                <div class="HomePage-profile-text">STOVE DEV CAMP 2기 Client(Web) 분야에 지원했습니다.</div>
            </div>
        </div>
        <div v-if="blogPosts.length === 0">등록된 블로그 글이 없습니다.</div>
        <div class="HomePage-post__list--container">
            <div class="HomePage-post__list" v-for="blogPost in blogPosts" :key="blogPost.content_id" @click="goToDetailPage(blogPost)">
                <div>
                    <div class="HomePage-post__list-item--title">{{ blogPost.title }}</div>
                    <div class="HomePage-post__list-item--text">{{ blogPost.description }}</div>
                    <div class="HomePage-post__list-item--status">
                        <div class="HomePage-post__list-item--register-date">{{ blogPost.created_at }}</div>
                        <div class="HomePage-post__list-item--comment">{{ blogPost.commentCount }} 개의 댓글</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const postHelper = createNamespacedHelpers("postStore");

export default {
    name: "HomePage",
    data() {
        return {};
    },
    mounted() {
        this.getBlogPostData();
    },
    computed: {
        ...postHelper.mapState({ blogPosts: (state) => state.blogPosts }),
    },
    methods: {
        ...postHelper.mapActions(["getBlogPostData"]),
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

<template>
    <div class="HomePage-container">
        <div class="HomePage-my-profile">
            <div class="HomePage-profile-detail">
                <div class="HomePage-banner">
                    <div class="HomePage-banner-design type1"></div>
                    <div class="HomePage-banner-design type2"></div>
                    <div class="HomePage-banner-design type3"></div>
                </div>
                <div class="HomePage-banner-text">블로그에 오신걸 환영합니다.</div>
            </div>
        </div>

        <div class="HomePage-post__list--container">
            <h3 class="HomePage-post--title">게시글 목록</h3>
            <div class="HomePage-post-empty--container" v-if="blogPosts.length === 0">
                <div class="HomePage-post-empty-text">
                    <p>아직 작성된 글이 없습니다.</p>
                    <p>글을 <span class="focus-text">작성</span>해 보세요</p>
                </div>
            </div>
            <div
                v-else
                class="HomePage-post__list"
                v-for="blogPost in blogPosts"
                :key="blogPost.content_id"
                @click="GO_TO_DETAIL_PAGE(blogPost.content_id)"
            >
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
        ...postHelper.mapMutations(["GO_TO_DETAIL_PAGE"]),
    },
};
</script>
<style scoped>
@import "./HomePage.css";
</style>

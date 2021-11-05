<template>
    <div class="HomePage-container">
        <Banner />
        <div class="HomePage-post__list--container">
            <h3 class="HomePage-post--title">게시글 목록</h3>
            <div class="HomePage-post-empty--container" v-if="getPostCount === 0">
                <div class="HomePage-post-empty-text">
                    <p>아직 작성된 글이 없습니다.</p>
                    <p>글을 <span class="focus-text">작성</span>해 보세요</p>
                </div>
            </div>
            <div v-else class="HomePage-post-list">
                <PostList />
            </div>
        </div>
    </div>
</template>
<script>
import Banner from "../../components/Layout/Banner/Banner.vue";
import PostList from "../../components/Post/PostList/PostList.vue";
import { createNamespacedHelpers } from "vuex";
const postHelper = createNamespacedHelpers("postStore");

export default {
    name: "HomePage",
    data() {
        return {};
    },
    components: {
        Banner,
        PostList,
    },
    computed: {
        ...postHelper.mapGetters(["getPostCount"]),
    },
    mounted() {
        this.getBlogPostData();
    },
    methods: {
        ...postHelper.mapActions(["getBlogPostData"]),
    },
};
</script>
<style scoped>
@import "./HomePage.css";
</style>

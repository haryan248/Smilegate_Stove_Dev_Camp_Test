<template>
    <div class="PostList-container">
        <div class="PostList-post__list" v-for="blogPost in blogPosts" :key="blogPost.content_id" @click="GO_TO_DETAIL_PAGE(blogPost.content_id)">
            <PostListItem :blogPost="blogPost" />
        </div>
    </div>
</template>
<script>
import PostListItem from "../PostListItem/PostListItem.vue";
import { createNamespacedHelpers } from "vuex";
const postHelper = createNamespacedHelpers("postStore");

export default {
    name: "PostList",
    components: {
        PostListItem,
    },
    computed: {
        ...postHelper.mapState({ blogPosts: (state) => state.blogPosts }),
    },
    methods: {
        ...postHelper.mapMutations(["GO_TO_DETAIL_PAGE"]),
    },
};
</script>
<style scoped>
@import "./PostList.css";
</style>

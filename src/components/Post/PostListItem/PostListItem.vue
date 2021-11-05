<template>
    <div>
        <div class="PostListItem-title">{{ blogPost.title }}</div>
        <div class="PostListItem-text">{{ blogPost.description }}</div>
        <div class="PostListItem-status">
            <div class="PostListItem-register-date">{{ blogPost.created_at }}</div>
            <div class="PostListItem-comment">{{ blogPost.commentCount }} 개의 댓글</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PostListItem",
    props: {
        blogPost: Object,
    },
};
</script>
<style scoped>
@import "./PostListItem.css";
</style>

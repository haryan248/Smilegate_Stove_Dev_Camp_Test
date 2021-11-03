<template>
    <div class="DetailPage-container">
        <h2 class="DetailPage-title">{{ blogContent.title }}</h2>

        <div class="DetailPage-content--container">
            <div class="DetailPage-management">
                <div class="DetailPage-create__date">{{ blogContent.created_at }}</div>
                <button class="DetailPage-modify__button" @click="updateBlogPost(blogContentId)">수정하기</button>
                <button class="DetailPage-delete__button" @click="deleteBlogPost(blogContentId)">삭제하기</button>
            </div>
            <div class="DetailPage-description" v-html="blogContent.description"></div>
        </div>
        <div>
            <div class="DetailPage-comment__count">{{ blogContent.commentCount }} 개의 댓글</div>
            <div class="DetailPage-comment__list">댓글 목록</div>
            <div>
                <CommentList :blogContentId="blogContentId" />
            </div>
        </div>
    </div>
</template>

<script>
import CommentList from "../../components/Comment/CommentList/CommentList.vue";
import { createNamespacedHelpers } from "vuex";
const postHelper = createNamespacedHelpers("postStore");
const commentHelper = createNamespacedHelpers("commentStore");

export default {
    name: "DetailPage",
    data() {
        return {
            blogContentId: this.$route.params.blogContentId,
        };
    },
    components: {
        CommentList,
    },
    mounted() {
        this.getBlogDetail(this.blogContentId);
        this.getBlogComment(this.blogContentId);
    },
    computed: {
        ...postHelper.mapState({
            blogContent: (state) => state.blogContent,
        }),
    },
    methods: {
        ...postHelper.mapMutations(["updateBlogPost"]),
        ...postHelper.mapActions(["getBlogDetail", "deleteBlogPost"]),
        ...commentHelper.mapActions(["getBlogComment"]),
    },
};
</script>
<style scoped>
@import "./DetailPage.css";
</style>

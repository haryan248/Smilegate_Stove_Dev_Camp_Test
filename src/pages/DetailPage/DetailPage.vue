<template>
    <div class="DetailPage-container">
        <h2 class="DetailPage-title">{{ blogContent.title }}</h2>

        <div class="DetailPage-content--container">
            <div class="DetailPage-management">
                <div class="DetailPage-create__date">{{ blogContent.created_at }}</div>
                <div>
                    <button class="DetailPage-modify__button" @click="UPDATE_BLOG_POST()">수정</button>
                    <button class="DetailPage-delete__button" @click="deleteBlogPost()">삭제</button>
                </div>
            </div>
            <div class="DetailPage-description" v-html="blogContent.description"></div>
        </div>
        <div>
            <div class="DetailPage-comment__count">{{ getCommentCount }} 개의 댓글</div>
            <div class="DetailPage-comment__list">댓글 목록</div>
            <div>
                <CommentList />
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
        return {};
    },
    components: {
        CommentList,
    },
    created() {
        this.SET_BLOG_CONTENT_ID(this.$route.params.blogContentId);
    },
    mounted() {
        this.getBlogDetail();
        this.getBlogComment();
    },
    computed: {
        ...commentHelper.mapGetters(["getCommentCount"]),
        ...postHelper.mapState({
            blogContent: (state) => state.blogContent,
        }),
    },
    methods: {
        ...postHelper.mapMutations(["UPDATE_BLOG_POST", "SET_BLOG_CONTENT_ID"]),
        ...postHelper.mapActions(["getBlogDetail", "deleteBlogPost"]),
        ...commentHelper.mapActions(["getBlogComment"]),
    },
};
</script>
<style scoped>
@import "./DetailPage.css";
</style>

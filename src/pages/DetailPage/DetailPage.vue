<template>
    <div>
        <div>제목 : {{ blogContent.title }}</div>
        <div>본문 : {{ blogContent.description }}</div>
        <div>등록일 : {{ blogContent.created_at }}</div>
        <button @click="updateBlogPost(blogContentId)">글 수정하기</button>
        <button @click="deleteBlogPost(blogContentId)">글 삭제하기</button>

        <div>
            <div>{{ blogContent.commentCount }} 개의 댓글</div>
            <div>댓글 목록</div>
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

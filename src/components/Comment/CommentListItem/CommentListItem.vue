<template>
    <div>
        <div v-if="blogComment.updateStatus">
            <CommentCreate :blogCommentText="blogComment.text" :blogCommentId="blogComment.comment_id" :blogContentId="blogComment.content_id" />
        </div>
        <div v-else>
            <div>{{ blogComment.text }}</div>
            <div>등록일 : {{ blogComment.created_at }}</div>
            <div>최종 수정일 : {{ blogComment.updated_at === null ? blogComment.created_at : blogComment.updated_at }}</div>
            <button @click="toggleUpdateComment(blogComment.comment_id)">댓글 수정</button>
            <button @click="toggleRegisterSubComment(blogComment.comment_id)">답글 달기</button>
            <button @click="deleteComment({ blogContentId: blogComment.content_id, deleteCommentId: blogComment.comment_id })">댓글 삭제</button>
        </div>

        <div v-if="filteredBlogSubCommentList.length > 0">
            <SubCommentList :blogComment="blogComment" :filteredBlogSubCommentList="filteredBlogSubCommentList" />
        </div>
        <div v-if="blogComment.registerStatus">
            <CommentCreate :isRegister="true" :isSubComment="true" :blogContentId="blogComment.content_id" :blogCommentId="blogComment.comment_id" />
        </div>
    </div>
</template>

<script>
import CommentCreate from "../CommentCreate/CommentCreate.vue";
import SubCommentList from "../SubCommentList/SubCommentList.vue";

import { createNamespacedHelpers } from "vuex";
const commentHelper = createNamespacedHelpers("commentStore");
const postHelper = createNamespacedHelpers("postStore");

export default {
    name: "CommentListItem",
    props: {
        blogComment: Object,
    },
    data() {
        return {};
    },
    components: {
        CommentCreate,
        SubCommentList,
    },
    computed: {
        filteredBlogSubCommentList() {
            return this.blogSubCommentList.filter((subCommentItem) => subCommentItem.comment_id === this.blogComment.comment_id);
        },
        ...commentHelper.mapState({
            blogSubCommentList: (state) => state.blogSubCommentList,
        }),
    },
    methods: {
        ...commentHelper.mapActions(["deleteComment"]),
        ...commentHelper.mapMutations(["toggleUpdateComment", "toggleRegisterSubComment"]),
        ...postHelper.mapActions(["getBlogDetail"]),
    },
};
</script>
<style scoped>
@import "./CommentListItem.css";
</style>

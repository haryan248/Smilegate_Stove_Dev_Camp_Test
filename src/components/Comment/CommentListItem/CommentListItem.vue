<template>
    <div>
        <div class="CommentListItem-content--container">
            <div class="CommentListItem-recent__update__date">
                {{ blogComment.updated_at === null ? blogComment.created_at : blogComment.updated_at }}
            </div>
            <div v-if="!blogComment.updateStatus">
                <button class="CommentListItem-modify__button" @click="toggleUpdateComment(blogComment.comment_id)">수정</button>
                <button
                    class="CommentListItem-delete__button"
                    @click="deleteComment({ blogContentId: blogComment.content_id, deleteCommentId: blogComment.comment_id })"
                >
                    삭제
                </button>
            </div>
        </div>
        <div v-if="blogComment.updateStatus">
            <CommentCreate :blogCommentText="blogComment.text" :blogCommentId="blogComment.comment_id" :blogContentId="blogComment.content_id" />
        </div>
        <div v-else class="CommentListItem-text">{{ blogComment.text }}</div>
        <button class="CommentListItem-register__subcomment" @click="toggleRegisterSubComment(blogComment.comment_id)">
            {{ blogComment.registerStatus ? "닫기" : "답글 달기" }}
        </button>

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

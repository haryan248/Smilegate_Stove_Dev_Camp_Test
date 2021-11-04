<template>
    <div class="SubCommentListItem-container">
        <div v-if="blogSubCommentItem.updateStatus">
            <CommentCreate
                :isSubComment="true"
                :blogCommentText="blogSubCommentItem.text"
                :blogCommentId="blogSubCommentItem.sub_comment_id"
                :blogContentId="blogSubCommentItem.content_id"
            />
        </div>
        <div v-else>
            <div class="SubCommentListItem-content--container">
                <div class="SubCommentListItem-recent__update__date">
                    <div>{{ blogSubCommentItem.updated_at === null ? blogSubCommentItem.created_at : blogSubCommentItem.updated_at }}</div>
                </div>
                <div v-if="!blogSubCommentItem.updateStatus">
                    <button class="SubCommentListItem-modify__button" @click="TOGGLE_UPDATE_SUB_COMMENT(blogSubCommentItem.sub_comment_id)">
                        수정
                    </button>
                    <button
                        class="SubCommentListItem-delete__button"
                        @click="deleteSubComment({ blogContentId: blogComment.content_id, deleteSubCommentId: blogSubCommentItem.sub_comment_id })"
                    >
                        삭제
                    </button>
                </div>
            </div>
            <div class="SubCommentListItem-text">{{ blogSubCommentItem.text }}</div>
        </div>
        <!-- <button class="SubCommentListItem-register__subcomment" @click="TOGGLE_REGISTER_SUB_COMMENT(blogComment.comment_id)">댓글 달기</button> -->
    </div>
</template>
<script>
import CommentCreate from "../CommentCreate/CommentCreate.vue";
import { createNamespacedHelpers } from "vuex";
const commentHelper = createNamespacedHelpers("commentStore");

export default {
    name: "SubCommentListItem",
    props: {
        blogComment: Object,
        blogSubCommentItem: Object,
    },
    components: {
        CommentCreate,
    },
    data() {
        return {};
    },
    methods: {
        ...commentHelper.mapActions(["deleteSubComment"]),
        ...commentHelper.mapMutations(["TOGGLE_UPDATE_SUB_COMMENT", "TOGGLE_REGISTER_SUB_COMMENT"]),
    },
};
</script>
<style scoped>
@import "./SubCommentListItem.css";
</style>

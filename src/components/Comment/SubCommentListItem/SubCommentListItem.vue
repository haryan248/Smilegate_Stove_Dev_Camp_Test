<template>
    <div class="SubCommentListItem-container">
        <!-- 답글 수정시 Input -->
        <div v-if="toggleUpdateSubCommentStatus">
            <CommentCreate
                :toggleUpdateComment="toggleUpdateComment"
                :toggleUpdateSubComment="toggleUpdateSubComment"
                :isSubComment="true"
                :blogCommentText="blogSubCommentItem.text"
                :blogCommentId="blogSubCommentItem.sub_comment_id"
            />
        </div>
        <div v-else>
            <div class="SubCommentListItem-content--container">
                <div class="SubCommentListItem-recent__update__date">
                    <div>{{ blogSubCommentItem.updated_at === null ? blogSubCommentItem.created_at : blogSubCommentItem.updated_at }}</div>
                </div>
                <div v-if="!toggleUpdateSubCommentStatus">
                    <button class="SubCommentListItem-modify__button" @click="toggleUpdateSubComment()">수정</button>
                    <button
                        class="SubCommentListItem-delete__button"
                        @click="deleteSubComment({ deleteSubCommentId: blogSubCommentItem.sub_comment_id })"
                    >
                        삭제
                    </button>
                </div>
            </div>
            <div class="SubCommentListItem-text">{{ blogSubCommentItem.text }}</div>
        </div>
        <!-- <button class="SubCommentListItem-register__subcomment" @click="toggleRegisterSubComment()">댓글 달기</button> -->
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
        toggleRegisterSubComment: Function,
        toggleUpdateComment: Function,
    },
    components: {
        CommentCreate,
    },
    data() {
        return {
            toggleUpdateSubCommentStatus: false,
        };
    },
    methods: {
        ...commentHelper.mapActions(["deleteSubComment"]),

        toggleUpdateSubComment() {
            this.toggleUpdateSubCommentStatus = !this.toggleUpdateSubCommentStatus;
        },
    },
};
</script>
<style scoped>
@import "./SubCommentListItem.css";
</style>

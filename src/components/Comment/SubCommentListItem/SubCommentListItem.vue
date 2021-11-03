<template>
    <div>
        <div v-if="blogSubCommentItem.updateStatus">
            <CommentCreate
                :isSubComment="true"
                :blogCommentText="blogSubCommentItem.text"
                :blogCommentId="blogSubCommentItem.sub_comment_id"
                :blogContentId="blogSubCommentItem.content_id"
            />
        </div>
        <div v-else>
            <div>{{ blogSubCommentItem.text }}</div>
            <div>등록일 : {{ blogSubCommentItem.created_at }}</div>
            <div>최종 수정일 : {{ blogSubCommentItem.updated_at === null ? blogSubCommentItem.created_at : blogSubCommentItem.updated_at }}</div>
            <button @click="toggleUpdateSubComment(blogSubCommentItem.sub_comment_id)">댓글 수정</button>
            <button @click="toggleRegisterSubComment(blogComment.comment_id)">댓글 달기</button>
            <button @click="deleteSubComment({ blogContentId: blogComment.content_id, deleteSubCommentId: blogComment.comment_id })">
                댓글 삭제
            </button>
        </div>
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
        ...commentHelper.mapMutations(["toggleUpdateSubComment", "toggleRegisterSubComment"]),
    },
};
</script>
<style scoped></style>

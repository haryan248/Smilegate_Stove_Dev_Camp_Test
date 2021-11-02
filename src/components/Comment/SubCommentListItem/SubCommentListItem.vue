<template>
    <div>
        <div v-if="toggleUpdateSubCommentStatus">
            <CommentCreate
                :isSubComment="true"
                :toggleUpdateComment="toggleUpdateComment"
                :toggleUpdateSubComment="toggleUpdateSubComment"
                :getBlogComment="getBlogComment"
                :blogCommentText="blogSubCommentItem.text"
                :blogCommentId="blogSubCommentItem.sub_comment_id"
                :blogContentId="blogSubCommentItem.content_id"
            />
        </div>
        <div v-else>
            <div>{{ blogSubCommentItem.text }}</div>
            <div>등록일 : {{ blogSubCommentItem.created_at }}</div>
            <div>최종 수정일 : {{ blogSubCommentItem.updated_at === null ? blogSubCommentItem.created_at : blogSubCommentItem.updated_at }}</div>
            <button @click="toggleUpdateSubComment">댓글 수정</button>
            <button @click="toggleRegisterSubComment">댓글 달기</button>
            <button @click="deleteSubComment(blogComment.content_id, blogComment.comment_id)">댓글 삭제</button>
        </div>
    </div>
</template>
<script>
import CommentCreate from "../CommentCreate/CommentCreate.vue";

export default {
    name: "SubCommentListItem",
    props: {
        blogComment: [Array, Object],
        blogSubCommentList: [Array, Object],
        blogSubCommentItem: Object,
        toggleRegisterSubComment: Function,
        toggleUpdateComment: Function,
        getBlogComment: Function,
        getBlogDetail: Function,
    },
    components: {
        CommentCreate,
    },
    data() {
        return {
            toggleUpdateSubCommentStatus: false,
        };
    },
    mounted() {
        console.log(this.getBlogDetail());
    },
    methods: {
        toggleUpdateSubComment() {
            this.toggleUpdateSubCommentStatus = !this.toggleUpdateSubCommentStatus;
        },
        async deleteSubComment(blogContentId, deleteSubCommentId) {
            await this.$axios
                .delete(`http://localhost:3000/blog/${blogContentId}/comment`, {
                    params: {
                        deleteSubCommentId: deleteSubCommentId,
                    },
                })
                .catch((error) => {
                    console.log(error.response);
                });
            this.getBlogDetail();
            this.getBlogComment();
        },
    },
};
</script>
<style scoped></style>

<template>
    <div>
        <div v-if="toggleUpdateCommentStatus">
            <CommentCreate
                :toggleUpdateComment="toggleUpdateComment"
                :getBlogComment="getBlogComment"
                :blogCommentText="blogComment.text"
                :blogCommentId="blogComment.comment_id"
                :blogContentId="blogComment.content_id"
            />
        </div>
        <div v-else>
            <div>{{ blogComment.text }}</div>
            <div>등록일 : {{ blogComment.created_at }}</div>
            <div>최종 수정일 : {{ blogComment.updated_at === null ? blogComment.created_at : blogComment.updated_at }}</div>

            <button @click="toggleUpdateComment">댓글 수정</button>
            <button @click="toggleRegisterSubComment">답글 달기</button>
            <button @click="deleteComment(blogComment.content_id, blogComment.comment_id)">댓글 삭제</button>
        </div>

        <div v-if="filteredBlogSubCommentList.length > 0">
            <SubCommentList
                :blogComment="blogComment"
                :filteredBlogSubCommentList="filteredBlogSubCommentList"
                :toggleRegisterSubComment="toggleRegisterSubComment"
                :toggleUpdateComment="toggleUpdateComment"
                :getBlogComment="getBlogComment"
                :getBlogDetail="getBlogDetail"
            />
        </div>
        <div v-if="toggleRegisterSubCommentStatus">
            <CommentCreate
                :isRegister="true"
                :isSubComment="true"
                :getBlogComment="getBlogComment"
                :blogContentId="blogComment.content_id"
                :blogCommentId="blogComment.comment_id"
                :toggleRegisterSubComment="toggleRegisterSubComment"
            />
        </div>
    </div>
</template>

<script>
import CommentCreate from "../CommentCreate/CommentCreate.vue";
import SubCommentList from "../SubCommentList/SubCommentList.vue";
export default {
    name: "CommentListItem",
    props: {
        blogComment: Object,
        blogSubCommentList: [Array, Object],
        getBlogComment: Function,
        getBlogDetail: Function,
    },
    data() {
        return {
            toggleUpdateCommentStatus: false,
            toggleRegisterSubCommentStatus: false,
        };
    },
    components: {
        CommentCreate,
        SubCommentList,
    },
    computed: {
        filteredBlogSubCommentList() {
            return this.blogSubCommentList.filter((subCommentItem) => Number(subCommentItem.comment_id) === this.blogComment.comment_id);
        },
    },
    methods: {
        toggleUpdateComment() {
            this.toggleUpdateCommentStatus = !this.toggleUpdateCommentStatus;
        },

        toggleRegisterSubComment() {
            this.toggleRegisterSubCommentStatus = !this.toggleRegisterSubCommentStatus;
        },
        async deleteComment(blogContentId, deleteCommentId) {
            await this.$axios
                .delete(`http://localhost:3000/blog/${blogContentId}/comment`, {
                    params: {
                        deleteCommentId: deleteCommentId,
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
<style scoped>
@import "./CommentListItem.css";
</style>

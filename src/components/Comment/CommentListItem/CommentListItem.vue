<template>
    <div>
        <div class="CommentListItem-content--container">
            <div class="CommentListItem-recent__update__date">
                {{ blogComment.updated_at === null ? blogComment.created_at : blogComment.updated_at }}
            </div>
            <div v-if="!toggleUpdateCommentStatus">
                <button class="CommentListItem-modify__button" @click="toggleUpdateComment()">수정</button>
                <button class="CommentListItem-delete__button" @click="deleteComment({ deleteCommentId: blogComment.comment_id })">삭제</button>
            </div>
        </div>
        <!-- 댓글 수정 시 Input -->
        <div v-if="toggleUpdateCommentStatus">
            <CommentCreate
                :toggleUpdateComment="toggleUpdateComment"
                :blogCommentText="blogComment.text"
                :blogCommentId="blogComment.comment_id"
                :blogContentId="blogComment.content_id"
            />
        </div>
        <div v-else class="CommentListItem-text">{{ blogComment.text }}</div>
        <button v-if="!toggleRegisterSubCommentStatus" class="CommentListItem-register__subcomment" @click="toggleRegisterSubComment()">
            답글 달기
        </button>

        <div v-if="filteredBlogSubCommentList.length > 0">
            <SubCommentList
                :toggleRegisterSubComment="toggleRegisterSubComment"
                :toggleUpdateComment="toggleUpdateComment"
                :blogComment="blogComment"
                :filteredBlogSubCommentList="filteredBlogSubCommentList"
            />
        </div>
        <!-- 답글 작성  Input -->
        <div v-if="toggleRegisterSubCommentStatus">
            <CommentCreate
                :toggleRegisterSubComment="toggleRegisterSubComment"
                :isRegister="true"
                :isSubComment="true"
                :blogContentId="blogComment.content_id"
                :blogCommentId="blogComment.comment_id"
            />
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
            return this.blogSubCommentList.filter((subCommentItem) => subCommentItem.comment_id === this.blogComment.comment_id);
        },
        ...commentHelper.mapState({
            blogSubCommentList: (state) => state.blogSubCommentList,
        }),
    },
    methods: {
        ...commentHelper.mapActions(["deleteComment"]),
        // ...commentHelper.mapMutations(["TOGGLE_UPDATE_COMMENT", "TOGGLE_REGISTER_SUB_COMMENT"]),
        ...postHelper.mapActions(["getBlogDetail"]),

        toggleUpdateComment() {
            this.toggleUpdateCommentStatus = !this.toggleUpdateCommentStatus;
        },

        toggleRegisterSubComment() {
            this.toggleRegisterSubCommentStatus = !this.toggleRegisterSubCommentStatus;
        },
    },
};
</script>
<style scoped>
@import "./CommentListItem.css";
</style>

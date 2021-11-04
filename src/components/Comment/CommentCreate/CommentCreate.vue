<template>
    <div>
        <div v-if="isRegister">
            <div class="CommentCreate-comment__input--container">
                <textarea
                    class="CommentCreate-comment__input"
                    type="text"
                    :placeholder="isSubComment ? '답글을 달아주세요.' : '댓글을 남겨보세요.'"
                    :value="isSubComment ? subCommentTextValue : commentTextValue"
                    @input="(e) => (isSubComment ? (subCommentTextValue = e.target.value) : (commentTextValue = e.target.value))"
                />
                <button
                    class="CommentCreate-comment__button CommentCreate-button"
                    @click="isSubComment ? registerSubCommentHandler(blogCommentId) : registerComment()"
                >
                    댓글 작성
                </button>
                <button
                    class="CommentCreate-cancel__button CommentCreate-button"
                    v-if="isSubComment"
                    @click="toggleRegisterSubComment(blogCommentId)"
                >
                    취소
                </button>
            </div>
        </div>
        <div v-else class="CommentCreate-comment__input--container">
            <textarea class="CommentCreate-comment__input" type="text" v-model="updateCommentText" />
            <button
                class="CommentCreate-comment__button CommentCreate-button"
                @click="
                    isSubComment ? updateSubCommentHandler(updateCommentText, blogCommentId) : updateCommentHandler(updateCommentText, blogCommentId)
                "
            >
                수정 완료
            </button>
            <button
                class="CommentCreate-cancel__button CommentCreate-button"
                @click="isSubComment ? toggleUpdateSubComment(blogCommentId) : toggleUpdateComment(blogCommentId)"
            >
                취소
            </button>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const commentHelper = createNamespacedHelpers("commentStore");
const postHelper = createNamespacedHelpers("postStore");

export default {
    name: "CommentCreate",
    props: {
        isRegister: Boolean,
        isSubComment: Boolean,
        blogCommentText: String,
        blogCommentId: String,
        toggleUpdateComment: Function,
        toggleUpdateSubComment: Function,
        toggleRegisterSubComment: Function,
    },
    data() {
        return {
            updateCommentText: this.blogCommentText,
        };
    },
    computed: {
        ...commentHelper.mapState({
            commentText: (state) => state.commentText,
            subCommentText: (state) => state.subCommentText,
        }),

        commentTextValue: {
            get() {
                return this.commentText;
            },
            set(value) {
                this.MODIFY_COMMENT_TEXT(value);
            },
        },

        subCommentTextValue: {
            get() {
                return this.subCommentText;
            },
            set(value) {
                this.MODIFY_UPDATED_SUB_COMMENT_TEXT(value);
            },
        },
    },
    methods: {
        ...postHelper.mapActions(["getBlogDetail"]),
        ...commentHelper.mapMutations(["MODIFY_COMMENT_TEXT", "MODIFY_UPDATED_SUB_COMMENT_TEXT"]),
        ...commentHelper.mapActions(["getBlogComment", "registerComment", "registerSubComment", "updateComment", "updateSubComment"]),

        registerSubCommentHandler(blogCommentId) {
            this.registerSubComment({ blogCommentId });
            this.toggleRegisterSubComment();
        },

        updateCommentHandler(updateCommentText, blogCommentId) {
            this.updateComment({ updateCommentText, blogCommentId });
            this.toggleUpdateComment();
        },

        updateSubCommentHandler(updateCommentText, blogCommentId) {
            this.updateSubComment({ updateCommentText, blogCommentId });
            this.toggleUpdateSubComment();
        },
    },
};
</script>
<style scoped>
@import "./CommentCreate.css";
</style>

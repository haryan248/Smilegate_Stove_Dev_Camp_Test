<template>
    <div>
        <div v-if="isRegister">
            <div class="CommentCreate-comment__input--container">
                <!-- when register comment or subcomment  -->
                <textarea
                    ref="commentInput"
                    class="CommentCreate-comment__input"
                    type="text"
                    :placeholder="isSubComment ? '답글을 달아주세요.' : '댓글을 남겨보세요.'"
                    :value="isSubComment ? subCommentTextValue : commentTextValue"
                    @input="(e) => (isSubComment ? (subCommentTextValue = e.target.value) : (commentTextValue = e.target.value))"
                    @blur="checkCommentValidation"
                />
                <button
                    class="CommentCreate-comment__button CommentCreate-button"
                    @click="isSubComment ? registerSubCommentHandler(blogCommentId) : registerCommentHandler()"
                >
                    댓글 작성
                </button>
                <!-- when register subcomment  -->
                <button
                    class="CommentCreate-cancel__button CommentCreate-button"
                    v-if="isSubComment"
                    @click="toggleRegisterSubComment(blogCommentId)"
                >
                    취소
                </button>
            </div>
            <div v-if="commentValidationStatus" class="CommentCreate-error-message">최소 1자 이상 입력해주세요.</div>
        </div>
        <div v-else class="CommentCreate-comment__input--container">
            <!-- when update subcomment  -->
            <textarea ref="updateCommentInput" class="CommentCreate-comment__input" type="text" v-model="updateCommentText" />
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
            commentValidationStatus: false,
            subCommentValidationStatus: false,
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

        checkCommentValidation() {
            this.commentValidationStatus = this.commentTextValue ? false : true;
        },

        checkSubCommentValidation() {
            this.subCommentValidationStatus = this.subCommentTextValue ? false : true;
        },

        // 댓글 작성
        registerCommentHandler() {
            if (!this.commentTextValue) {
                this.checkCommentValidation();
                this.$refs.commentInput.focus();
                return;
            }
            this.registerComment();
        },

        // 답글 작성
        registerSubCommentHandler(blogCommentId) {
            if (!this.subCommentTextValue) {
                this.checkSubCommentValidation();
                this.$refs.commentInput.focus();
                return;
            }
            this.registerSubComment({ blogCommentId });
            this.toggleRegisterSubComment();
        },

        // 댓글 수정
        updateCommentHandler(updateCommentText, blogCommentId) {
            if (!this.updateCommentText) {
                this.checkCommentValidation();
                this.$refs.updateCommentInput.focus();
                return;
            }
            this.updateComment({ updateCommentText, blogCommentId });
            this.toggleUpdateComment();
        },

        //답글 수정
        updateSubCommentHandler(updateCommentText, blogCommentId) {
            if (!this.updateCommentText) {
                this.checkCommentValidation();
                this.$refs.updateCommentInput.focus();
                return;
            }
            this.updateSubComment({ updateCommentText, blogCommentId });
            this.toggleUpdateSubComment();
        },
    },
};
</script>
<style scoped>
@import "./CommentCreate.css";
</style>

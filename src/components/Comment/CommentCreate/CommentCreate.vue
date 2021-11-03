<template>
    <div>
        <div v-if="isRegister">
            <div class="CommentCreate-comment__input--container">
                <input
                    class="CommentCreate-comment__input"
                    type="text"
                    :placeholder="isSubComment ? '답글을 달아주세요.' : '댓글을 남겨보세요.'"
                    :value="isSubComment ? subCommentTextValue : commentTextValue"
                    @input="(e) => (isSubComment ? (subCommentTextValue = e.target.value) : (commentTextValue = e.target.value))"
                />
                <button
                    class="CommentCreate-comment__button CommentCreate-button"
                    @click="isSubComment ? registerSubComment({ blogContentId, blogCommentId }) : registerComment(blogContentId)"
                >
                    댓글 작성
                </button>
            </div>
            <button v-if="isSubComment" @click="toggleRegisterSubComment(blogCommentId)">취소</button>
        </div>
        <div v-else class="CommentCreate-comment__input--container">
            <input class="CommentCreate-comment__input" type="text" v-model="updateCommentTextValue" />
            <button
                class="CommentCreate-subcomment__button CommentCreate-button"
                @click="isSubComment ? updateSubComment({ blogContentId, blogCommentId }) : updateComment({ blogContentId, blogCommentId })"
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
        blogContentId: String,
    },
    data() {
        return {
            updateCommentText_: this.blogCommentText,
        };
    },
    computed: {
        ...commentHelper.mapState({
            commentText: (state) => state.commentText,
            subCommentText: (state) => state.subCommentText,
            updateCommentText: (state) => state.updateCommentText,
        }),

        commentTextValue: {
            get() {
                return this.commentText;
            },
            set(value) {
                this.modifyCommentText(value);
            },
        },

        subCommentTextValue: {
            get() {
                return this.subCommentText;
            },
            set(value) {
                this.modifyUpdateSubCommentText(value);
            },
        },

        updateCommentTextValue: {
            get() {
                return this.updateCommentText_;
            },
            set(value) {
                this.modifyUpdateCommentText(value);
            },
        },
    },
    methods: {
        ...postHelper.mapActions(["getBlogDetail"]),
        ...commentHelper.mapMutations([
            "modifyCommentText",
            "modifyUpdateCommentText",
            "modifyUpdateSubCommentText",
            "toggleUpdateComment",
            "toggleUpdateSubComment",
            "toggleRegisterSubComment",
        ]),
        ...commentHelper.mapActions(["getBlogComment", "registerComment", "registerSubComment", "updateComment", "updateSubComment"]),
    },
};
</script>
<style scoped>
@import "./CommentCreate.css";
</style>

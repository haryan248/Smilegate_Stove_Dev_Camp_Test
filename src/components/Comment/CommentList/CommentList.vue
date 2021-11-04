<template>
    <div>
        <CommentCreate :isRegister="true" />
        <div class="CommentList-container">
            <div class="CommentList-post-empty--container" v-if="blogCommentList.length === 0">
                <div class="CommentList-post-empty-text">
                    <p>아직 작성된 댓글이 없습니다.</p>
                    <p>댓글을 <span class="focus-text">작성</span>해 보세요</p>
                </div>
            </div>
            <div v-else class="CommentList-comment__list" v-for="blogComment in blogCommentList" :key="blogComment.comment_id">
                <CommentListItem :blogComment="blogComment" />
            </div>
        </div>
    </div>
</template>
<script>
import CommentListItem from "../CommentListItem/CommentListItem.vue";
import CommentCreate from "../CommentCreate/CommentCreate.vue";

import { createNamespacedHelpers } from "vuex";
const commentHelper = createNamespacedHelpers("commentStore");

export default {
    name: "CommentList",
    components: {
        CommentListItem,
        CommentCreate,
    },
    data() {
        return {};
    },
    computed: {
        ...commentHelper.mapState({
            blogCommentList: (state) => state.blogCommentList,
        }),
    },
};
</script>
<style scoped>
@import "./CommentList.css";
</style>

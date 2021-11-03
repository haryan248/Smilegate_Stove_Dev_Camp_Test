<template>
    <div>
        <CommentCreate :isRegister="true" :blogContentId="blogContentId" />
        <div class="comment-container" v-for="blogComment in blogCommentList" :key="blogComment.comment_id">
            <CommentListItem :blogComment="blogComment" />
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
    props: {
        blogContentId: String,
    },
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

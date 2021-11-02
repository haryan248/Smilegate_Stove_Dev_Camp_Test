<template>
    <div>
        <CommentCreate :isRegister="true" :blogContentId="blogContentId" :getBlogDetail="getBlogDetail" :getBlogComment="getBlogComment" />
        <div class="comment-container" v-for="blogComment in blogCommentList" :key="blogComment.comment_id">
            <CommentListItem
                :blogComment="blogComment"
                :blogSubCommentList="blogSubCommentList"
                :getBlogComment="getBlogComment"
                :getBlogDetail="getBlogDetail"
            />
        </div>
    </div>
</template>
<script>
import CommentListItem from "../CommentListItem/CommentListItem.vue";
import CommentCreate from "../CommentCreate/CommentCreate.vue";
export default {
    name: "CommentList",
    props: {
        blogCommentList: [Array, Object],
        blogSubCommentList: [Array, Object],
        getBlogComment: Function,
        getBlogDetail: Function,
        blogContentId: String,
    },
    data() {
        return {};
    },
    components: {
        CommentListItem,
        CommentCreate,
    },
};
</script>

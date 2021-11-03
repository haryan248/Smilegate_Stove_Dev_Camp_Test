<template>
    <div>
        <div class="sub-comment-container" v-for="blogSubCommentItem in filteredBlogSubCommentList" :key="blogSubCommentItem.sub_comment_id">
            <SubCommentListItem :blogComment="blogComment" :blogSubCommentItem="blogSubCommentItem" />
        </div>
    </div>
</template>
<script>
import SubCommentListItem from "../SubCommentListItem/SubCommentListItem.vue";

export default {
    name: "SubCommentList",
    props: {
        blogComment: Object,
        filteredBlogSubCommentList: Array,
    },
    data() {
        return {};
    },
    components: {
        SubCommentListItem,
    },
};
</script>
<style scoped></style>

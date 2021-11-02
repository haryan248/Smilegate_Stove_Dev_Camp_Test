<template>
    <div>
        <div class="sub-comment-container" v-for="blogSubCommentItem in filteredBlogSubCommentList" :key="blogSubCommentItem.sub_comment_id">
            <SubCommentListItem
                :blogComment="blogComment"
                :blogSubCommentItem="blogSubCommentItem"
                :toggleRegisterSubComment="toggleRegisterSubComment"
                :toggleUpdateComment="toggleUpdateComment"
                :getBlogComment="getBlogComment"
                :getBlogDetail="getBlogDetail"
            />
        </div>
    </div>
</template>
<script>
import SubCommentListItem from "../SubCommentListItem/SubCommentListItem.vue";

export default {
    name: "SubCommentList",
    props: {
        blogComment: [Array, Object],
        blogSubCommentList: [Array, Object],
        filteredBlogSubCommentList: Array,
        toggleRegisterSubComment: Function,
        toggleUpdateComment: Function,
        getBlogComment: Function,
        getBlogDetail: Function,
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

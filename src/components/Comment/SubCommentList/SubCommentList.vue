<template>
    <div>
        <div class="SubComment-container" v-for="blogSubCommentItem in filteredBlogSubCommentList" :key="blogSubCommentItem.sub_comment_id">
            <div class="SubComment-right__arrow">↳</div>
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
<style scoped>
@import "./SubCommentList.css";
</style>

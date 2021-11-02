<template>
    <div>
        <div>
            제목
            <input type="text" v-model="blogTitleValue" />
        </div>
        <div>
            본문
            <input type="text" v-model="blogDescriptionValue" />
        </div>

        <button @click="isUpdate ? updateBlogData(blogContentId) : postBlogData()">{{ isUpdate ? "글 수정하기" : "글 등록하기" }}</button>
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const postHelper = createNamespacedHelpers("postStore");
export default {
    name: "WritePage",
    data() {
        return {
            isUpdate: this.$route.params.blogContentId > 0 ? true : false,
            blogContentId: this.$route.params.blogContentId,
        };
    },
    created() {
        if (this.blogContentId > 0) {
            this.getBlogWriteData(this.blogContentId);
        }
    },
    computed: {
        ...postHelper.mapState({
            blogTitle: (state) => state.blogTitle,
            blogDescription: (state) => state.blogDescription,
        }),

        blogTitleValue: {
            get() {
                return this.blogTitle;
            },
            set(value) {
                this.updateBlogTitle(value);
            },
        },

        blogDescriptionValue: {
            get() {
                return this.blogDescription;
            },
            set(value) {
                this.updateBlogDescription(value);
            },
        },
    },
    methods: {
        ...postHelper.mapMutations(["updateBlogTitle", "updateBlogDescription"]),
        ...postHelper.mapActions(["getBlogWriteData", "updateBlogData", "postBlogData"]),
    },
};
</script>
<style scoped>
@import "./WritePage.css";
</style>

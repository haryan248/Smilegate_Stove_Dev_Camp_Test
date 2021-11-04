<template>
    <div>
        <div class="WritePage-container">
            <div>
                <p class="WritePage-title">제목</p>
                <input class="WritePage-title--input" placeholder="제목을 입력해주세요." type="text" v-model="blogTitleValue" />
            </div>
            <div class="WritePage-main__section">
                <p class="WritePage-main__text">본문</p>
                <textarea class="WritePage-main__text--textarea" placeholder="내용을 입력해주세요." v-model="blogDescriptionValue" />
            </div>
        </div>
        <button class="WritePage-register__button" @click="isUpdate ? updateBlogData(blogContentId) : postBlogData()">
            {{ isUpdate ? "글 수정하기" : "글 등록하기" }}
        </button>
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
        this.resetInput();
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
                this.UPDATE_BLOG_TITLE(value);
            },
        },

        blogDescriptionValue: {
            get() {
                return this.blogDescription;
            },
            set(value) {
                this.UPDATE_BLOG_DESCRIPTION(value);
            },
        },
    },
    methods: {
        ...postHelper.mapMutations(["UPDATE_BLOG_TITLE", "UPDATE_BLOG_DESCRIPTION", "RESET_INPUT"]),
        ...postHelper.mapActions(["getBlogWriteData", "updateBlogData", "postBlogData"]),
    },
};
</script>
<style scoped>
@import "./WritePage.css";
</style>

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
        <button class="WritePage-register__button" @click="isUpdate ? updateBlogData() : postBlogData()">
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
        };
    },
    created() {
        this.SET_BLOG_CONTENT_ID(this.$route.params.blogContentId);
    },
    mounted() {
        if (this.blogContentId > 0) {
            this.getBlogWriteData();
        }
        this.RESET_INPUT();
    },
    computed: {
        ...postHelper.mapState({
            blogTitle: (state) => state.blogTitle,
            blogDescription: (state) => state.blogDescription,
            blogContentId: (state) => state.blogContentId,
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
        ...postHelper.mapMutations(["UPDATE_BLOG_TITLE", "UPDATE_BLOG_DESCRIPTION", "RESET_INPUT", "SET_BLOG_CONTENT_ID"]),
        ...postHelper.mapActions(["getBlogWriteData", "updateBlogData", "postBlogData"]),
    },
};
</script>
<style scoped>
@import "./WritePage.css";
</style>

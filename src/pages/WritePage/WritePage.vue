<template>
    <div>
        <div class="WritePage-container">
            <div>
                <p class="WritePage-title">제목</p>
                <input
                    ref="blogTitleInput"
                    class="WritePage-title--input"
                    placeholder="제목을 입력해주세요. (최소 1자 ~ 최대 100자)"
                    type="text"
                    v-model="blogTitleValue"
                    @blur="checkTitleValidation"
                    maxlength="100"
                />
                <div v-if="titleValidationStatus" class="WritePage-error-text">제목을 입력해 주세요.</div>
            </div>
            <div class="WritePage-main__section">
                <p class="WritePage-main__text">본문</p>
                <textarea
                    ref="blogTextInput"
                    class="WritePage-main__text--textarea"
                    placeholder="내용을 입력해주세요. (최소 1자)"
                    v-model="blogDescriptionValue"
                    @blur="checkTextValidation"
                />
                <div v-if="textValidationStatus" class="WritePage-error-text">내용을 입력해 주세요.</div>
            </div>
        </div>
        <button class="WritePage-register__button" @click="blogDataRegisterHandler()">
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
            titleValidationStatus: false,
            textValidationStatus: false,
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

        checkTitleValidation() {
            this.titleValidationStatus = this.blogTitleValue ? false : true;
        },

        checkTextValidation() {
            this.textValidationStatus = this.blogDescriptionValue ? false : true;
        },

        validateBlogText() {
            if (!this.blogTitleValue) {
                this.checkTitleValidation();
                this.$refs.blogTitleInput.focus();
                return true;
            }
            if (!this.blogDescriptionValue) {
                this.checkTextValidation();
                this.$refs.blogTextInput.focus();
                return true;
            }
            return false;
        },

        blogDataRegisterHandler() {
            if (this.validateBlogText()) return;
            if (this.isUpdate) {
                this.updateBlogData();
            } else {
                this.postBlogData();
            }
        },
    },
};
</script>
<style scoped>
@import "./WritePage.css";
</style>

<template>
    <div>
        <div>
            제목
            <input type="text" v-model="blogTitle" />
        </div>
        <div>
            본문
            <textarea v-model="blogDescription"></textarea>
        </div>

        <button @click="isUpdate ? updateBlogData() : postBlogData()">{{ isUpdate ? "글 수정하기" : "글 등록하기" }}</button>
    </div>
</template>
<script>
export default {
    name: "WritePage",
    data() {
        return {
            blogTitle: "",
            blogDescription: "",
            isUpdate: this.$route.params.blogContentId > 0 ? true : false,
            blogContentId: Number(this.$route.params.blogContentId),
        };
    },
    created() {
        if (this.$route.params.blogContentId > 0) {
            this.$axios
                .get(`http://localhost:3000/blog/${this.blogContentId}`)
                .then((res) => {
                    const { title, description } = res.data;
                    console.log(res.data);
                    this.blogTitle = title;
                    this.blogDescription = description;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    },
    methods: {
        async postBlogData() {
            let replaceId = 0;
            await this.$axios
                .post(
                    "http://localhost:3000/blog",
                    {},
                    {
                        params: {
                            user_id: 1,
                            title: this.blogTitle,
                            description: this.blogDescription,
                        },
                    }
                )
                .then((res) => {
                    replaceId = res.data.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
            this.$router.replace(`/blog/detail/${replaceId}`);
        },
        updateBlogData() {
            this.$axios
                .post(
                    "http://localhost:3000/update-blog",
                    {},
                    {
                        params: {
                            blogContentId: this.blogContentId,
                            title: this.blogTitle,
                            description: this.blogDescription,
                        },
                    }
                )
                .catch((error) => {
                    console.log(error.response);
                });
            this.$router.replace(`/blog/detail/${this.blogContentId}`);
        },
    },
};
</script>
<style scoped>
@import "./WritePage.css";
</style>

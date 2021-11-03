import axios from "axios";
import router from "../../router";
const API_SERVER_URL = "http://localhost:3000";

const postStore = {
    namespaced: true,
    state: {
        blogPosts: [],
        blogTitle: "",
        blogDescription: "",
        blogContent: {},
    },
    getters: {},
    mutations: {
        // v-model data 관리
        updateBlogTitle(state, payload) {
            state.blogTitle = payload;
        },

        updateBlogDescription(state, payload) {
            state.blogDescription = payload;
        },

        // 글 수정하기
        updateBlogPost(_, blogContentId) {
            router.push({
                path: `/blog/write/${blogContentId}`,
            });
        },
    },
    actions: {
        // 전체 게시글 데이터 가져오기
        async getBlogPostData({ state }) {
            await axios
                .get(`${API_SERVER_URL}/blog`)
                .then((res) => {
                    state.blogPosts = res.data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 수정할 게시글 데이터 가져오기
        async getBlogWriteData({ state }, blogContentId) {
            await axios
                .get(`${API_SERVER_URL}/blog/${blogContentId}`)
                .then((res) => {
                    const { title, description } = res.data;
                    state.blogTitle = title;
                    state.blogDescription = description;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 블로그 게시물 수정
        async updateBlogData({ state }, blogContentId) {
            await axios
                .post(
                    `${API_SERVER_URL}/update-blog`,
                    {},
                    {
                        params: {
                            blogContentId: blogContentId,
                            title: state.blogTitle,
                            description: state.blogDescription,
                        },
                    }
                )
                .then(() => router.replace(`/blog/detail/${blogContentId}`))
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 블로그 게시물 등록
        async postBlogData({ state }) {
            let replaceId = "";
            await axios
                .post(
                    `${API_SERVER_URL}/blog`,
                    {},
                    {
                        params: {
                            user_id: 1,
                            title: state.blogTitle,
                            description: state.blogDescription,
                        },
                    }
                )
                .then((res) => {
                    replaceId = res.data.data;
                    state.blogTitle = "";
                    state.blogDescription = "";
                })
                .then(() => router.replace(`/blog/detail/${replaceId}`))
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 상세 페이지 불러오기
        async getBlogDetail({ state }, blogContentId) {
            await axios
                .get(`${API_SERVER_URL}/blog/${blogContentId}`)
                .then(({ data }) => {
                    state.blogContent = data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 글 삭제하기
        deleteBlogPost(_, blogContentId) {
            axios
                .delete(`${API_SERVER_URL}/blog/${blogContentId}`)
                .then(() => router.push("/"))
                .catch((error) => {
                    console.log(error.response);
                });
        },
    },
};

export default postStore;

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
        blogContentId: "",
    },
    getters: {},
    mutations: {
        // v-model data 관리
        UPDATE_BLOG_TITLE(state, payload) {
            state.blogTitle = payload;
        },

        UPDATE_BLOG_DESCRIPTION(state, payload) {
            state.blogDescription = payload;
        },

        // 글 수정하기
        UPDATE_BLOG_POST(state) {
            router.push({
                path: `/blog/write/${state.blogContentId}`,
            });
        },

        // 상세 페이지 이동하기
        GO_TO_DETAIL_PAGE(_, blogContentId) {
            router.push({
                path: `/blog/detail/${blogContentId}`,
                params: { blogContentId },
            });
        },

        SET_BLOG_CONTENT_ID(state, payload) {
            state.blogContentId = payload;
        },

        // 데이터 초기화하기
        RESET_INPUT(state) {
            state.blogTitle = "";
            state.blogDescription = "";
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
        async getBlogWriteData({ state }) {
            await axios
                .get(`${API_SERVER_URL}/blog/${state.blogContentId}`)
                .then((res) => {
                    const { title, description } = res.data;
                    state.blogTitle = title;
                    state.blogDescription = description;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 상세 페이지 불러오기
        async getBlogDetail({ state }) {
            await axios
                .get(`${API_SERVER_URL}/blog/${state.blogContentId}`)
                .then(({ data }) => {
                    state.blogContent = data;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 블로그 게시물 등록
        async postBlogData({ state, commit }) {
            await axios
                .post(
                    `${API_SERVER_URL}/blog`,
                    {},
                    {
                        params: {
                            userId: 1,
                            title: state.blogTitle,
                            description: state.blogDescription,
                        },
                    }
                )
                .then((res) => {
                    let replaceId = res.data.data;
                    commit("RESET_INPUT");
                    router.replace(`/blog/detail/${replaceId}`);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 블로그 게시물 수정
        async updateBlogData({ state, commit }) {
            await axios
                .post(
                    `${API_SERVER_URL}/update-blog`,
                    {},
                    {
                        params: {
                            blogContentId: state.blogContentId,
                            title: state.blogTitle,
                            description: state.blogDescription,
                        },
                    }
                )
                .then(() => router.replace(`/blog/detail/${state.blogContentId}`))
                .then(() => commit("RESET_INPUT"))
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 글 삭제하기
        async deleteBlogPost(state) {
            await axios
                .delete(`${API_SERVER_URL}/blog/${state.blogContentId}`)
                .then(() => router.push("/"))
                .catch((error) => {
                    console.log(error.response);
                });
        },
    },
};

export default postStore;

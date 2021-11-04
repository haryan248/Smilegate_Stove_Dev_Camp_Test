import axios from "axios";
const API_SERVER_URL = "http://localhost:3000";

const commentStore = {
    namespaced: true,
    state: {
        blogCommentList: {},
        blogSubCommentList: {},
        commentText: "",
        subCommentText: "",
    },
    getters: {
        getCommentCount: (state) => {
            const totalComment = state.blogSubCommentList.length + state.blogCommentList.length;
            return totalComment;
        },
    },
    mutations: {
        // v-model data 관리
        MODIFY_COMMENT_TEXT(state, payload) {
            state.commentText = payload;
        },

        MODIFY_UPDATED_SUB_COMMENT_TEXT(state, payload) {
            state.subCommentText = payload;
        },

        SET_BLOG_COMMENT_LIST(state, payload) {
            state.blogCommentList = payload;
        },

        SET_BLOG_SUB_COMMENT_LIST(state, payload) {
            state.blogSubCommentList = payload;
        },
    },
    actions: {
        // 게시물 댓글 불러오기
        async getBlogComment({ state, rootState }) {
            const blogContentId = rootState.postStore.blogContentId;
            await axios
                .get(`${API_SERVER_URL}/blog/${blogContentId}/comment`)
                .then(({ data }) => {
                    state.blogCommentList = data.data.comment_result;
                    state.blogSubCommentList = data.data.sub_comment_result;
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 댓글 등록
        async registerComment({ state, commit, rootState }) {
            const blogContentId = rootState.postStore.blogContentId;
            await axios
                .post(
                    `${API_SERVER_URL}/blog/${blogContentId}/comment`,
                    {},
                    {
                        params: {
                            userId: 1,
                            commentText: state.commentText,
                        },
                    }
                )
                .then(({ data }) => {
                    commit("SET_BLOG_COMMENT_LIST", data.data.comment_result);
                })
                .catch((error) => {
                    console.log(error.response);
                });

            state.commentText = "";
        },

        // 댓글 수정
        async updateComment({ commit, rootState }, { updateCommentText, blogCommentId }) {
            const blogContentId = rootState.postStore.blogContentId;

            await axios
                .post(
                    `${API_SERVER_URL}/blog/${blogContentId}/update-comment/${blogCommentId}`,
                    {},
                    {
                        params: {
                            commentText: updateCommentText,
                        },
                    }
                )
                .then(({ data }) => {
                    commit("SET_BLOG_COMMENT_LIST", data.data.comment_result);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 댓글 삭제
        async deleteComment({ commit, rootState }, { deleteCommentId }) {
            const blogContentId = rootState.postStore.blogContentId;

            await axios
                .delete(`${API_SERVER_URL}/blog/${blogContentId}/comment`, {
                    params: {
                        deleteCommentId: deleteCommentId,
                    },
                })
                .then(({ data }) => {
                    commit("SET_BLOG_SUB_COMMENT_LIST", data.data.sub_comment_result);
                    commit("SET_BLOG_COMMENT_LIST", data.data.comment_result);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 답글 등록
        async registerSubComment({ state, commit, rootState }, { blogCommentId }) {
            const blogContentId = rootState.postStore.blogContentId;

            await axios
                .post(
                    `${API_SERVER_URL}/blog/${blogContentId}/comment/${blogCommentId}`,
                    {},
                    {
                        params: {
                            userId: 1,
                            commentText: state.subCommentText,
                        },
                    }
                )
                .then(({ data }) => {
                    commit("SET_BLOG_COMMENT_LIST", data.data.comment_result);
                    commit("SET_BLOG_SUB_COMMENT_LIST", data.data.sub_comment_result);
                    state.subCommentText = "";
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 답글 수정
        async updateSubComment({ commit, rootState }, { updateCommentText, blogCommentId }) {
            const blogContentId = rootState.postStore.blogContentId;

            await axios
                .post(
                    `${API_SERVER_URL}/blog/${blogContentId}/update-comment/${blogCommentId}`,
                    {},
                    {
                        params: {
                            commentText: updateCommentText,
                            subCommentId: blogCommentId,
                        },
                    }
                )
                .then(({ data }) => {
                    commit("SET_BLOG_COMMENT_LIST", data.data.comment_result);
                    commit("SET_BLOG_SUB_COMMENT_LIST", data.data.sub_comment_result);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },

        // 답글 삭제하기
        async deleteSubComment({ commit, rootState }, { deleteSubCommentId }) {
            const blogContentId = rootState.postStore.blogContentId;

            await axios
                .delete(`${API_SERVER_URL}/blog/${blogContentId}/comment`, {
                    params: {
                        deleteSubCommentId: deleteSubCommentId,
                    },
                })
                .then(({ data }) => {
                    commit("SET_BLOG_COMMENT_LIST", data.data.comment_result);
                    commit("SET_BLOG_SUB_COMMENT_LIST", data.data.sub_comment_result);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
    },
};

export default commentStore;

import Vue from "vue";
import Vuex from "vuex";
import postStore from "./modules/postStore.js";
import commentStore from "./modules/commentStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        postStore,
        commentStore,
    },
});

import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../pages/HomePage/HomePage.vue";
import WritePage from "../pages/WritePage/WritePage.vue";
import DetailPage from "../pages/DetailPage/DetailPage.vue";

Vue.use(VueRouter); // 라우트 정보

const route = [
    { path: "/", name: "Main", component: HomePage }, // 루트(/)로 접속했을때, Home 컴포넌트를 보여준다.
    { path: "/blog/write/:blogContentId?", name: "WritePage", component: WritePage },
    { path: "/blog/detail/:blogContentId", name: "DetailPage", component: DetailPage },
]; // Vue 라우터 인스턴스 생성

const router = new VueRouter({ mode: "history", routes: route });
export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../pages/HomePage/HomePage.vue";
import WritePage from "../pages/WritePage/WritePage.vue";
import DetailPage from "../pages/DetailPage/DetailPage.vue";

Vue.use(VueRouter); // 라우트 정보

// 라우팅을 해주면서 #을 제거해주면서, path에 입력한 경로에 매핑된 컴포넌트를 보여준다.
const route = [
    { path: "/", name: "Main", component: HomePage }, // 루트(/)로 접속했을때, Home 컴포넌트를 보여준다.
    { path: "/blog/write/:blogContentId?", name: "WritePage", component: WritePage },
    { path: "/blog/detail/:blogContentId", name: "DetailPage", component: DetailPage },
    // { path: "/about", component: AboutComponent }, // /about으로 접속 했을때, About 컴포넌트를 보여준다.
]; // Vue 라우터 인스턴스 생성

const router = new VueRouter({ mode: "history", routes: route });
export default router;

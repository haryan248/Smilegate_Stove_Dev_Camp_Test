<template>
    <div id="app">
        <Header />
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
import Header from "./components/Layout/Header/Header.vue";
import Footer from "./components/Layout/Footer/Footer.vue";

export default {
    name: "App",
    components: {
        Header,
        Footer,
    },
};
</script>

<style>
@import "./index.css";
</style>

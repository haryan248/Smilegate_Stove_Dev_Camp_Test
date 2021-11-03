<template>
    <div id="app">
        <Header />
        <router-view></router-view>
    </div>
</template>

<script>
import Header from "./components/Layout/Header/Header.vue";

export default {
    name: "App",
    components: {
        Header,
    },
};
</script>

<style>
@import "./index.css";
</style>

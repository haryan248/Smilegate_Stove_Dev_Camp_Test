<template>
    <header>
        <div class="Header-header-container">
            <router-link to="/">
                <h2 class="Header-header-title">STOVE DEV CAMP</h2>
            </router-link>

            <router-link to="/blog/write">
                <div v-if="!$route.path.includes('/blog/write')" class="Header-header-write__button">글 쓰기</div>
            </router-link>
        </div>
    </header>
</template>
<script>
export default {
    name: "Header",
};
</script>
<style scoped>
@import "./Header.css";
</style>

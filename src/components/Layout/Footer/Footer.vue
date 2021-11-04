<template>
    <div>
        <footer class="Footer-footer">
            <div class="Footer-wrapper">
                <div class="Footer-icons">
                    <div class="Footer-footer-description">
                        <p class="Footer-footer-main__desc">2021 Smilegate x STOVE DEV CAMP</p>
                        <p class="Footer-footer-sub__desc">스토브 데브 캠프 블로그 개발 과제</p>
                        <p class="Footer-footer-sub__desc">개발 기간 : 21.11.01 ~ 21.11.05</p>
                    </div>
                    <div class="Footer-footer-icon__wrapper">
                        <a class="Footer-items" v-for="(footerItem, index) in footerData" :href="footerItem.link" :key="index" target="_blank">
                            <div class="Footer-icon">
                                <img :src="footerItem.url" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
        <div @click="scrollToTop" class="Footer-scrollTo_top">
            <img class="Footer-scrollTo_icon" :src="scrollUpUrl" />
        </div>
    </div>
</template>
<script>
export default {
    name: "Footer",
    data() {
        return {
            scrollUpUrl: require("@/assets/images/footer/up-arrow.png"),
            footerData: [
                {
                    link: "https://github.com/haryan248",
                    title: "Github",
                    url: require("@/assets/images/footer/github.png"),
                },
                {
                    link: "https://www.instagram.com/h__.__joon/",
                    title: "Instagram",
                    url: require("@/assets/images/footer/instagram.png"),
                },
                {
                    link: "mailto:haryan96@gmail.com",
                    title: "Mail",
                    url: require("@/assets/images/footer/email.png"),
                },
            ],
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        scrollToTop() {
            console.log(1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
    },
};
</script>
<style scoped>
@import "./Footer.css";
</style>

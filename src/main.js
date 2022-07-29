import { createApp, h } from 'vue';
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

const app = createApp(App);

app.component('anchored-heading', {
    render() {
        return h("h" + this.level, this.$slots.default())

},
props: {
    level: {
        type: Number,
        required: true,
    }}
    }
)

app.use(router);
app.use(store);
app.mount("#app");

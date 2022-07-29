import MainPageView from "@/views/MainPageView.vue";
import EditNoteView from "@/views/EditNoteView.vue";
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: MainPageView },
    { path: '/note/:noteId', component: EditNoteView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;